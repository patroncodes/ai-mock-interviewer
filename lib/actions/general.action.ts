'use server'

import {db} from "@/firebase/admin";
import {generateObject} from "ai";
import {google} from "@ai-sdk/google";
import {feedbackSchema} from "@/lib/validation";
import {feedbackPrompt} from "@/constants";

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db
        .collection("interviews")
        .where("userId", "==", userId)
        .orderBy('createdAt', 'desc')
        .get()

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[]
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const {userId, limit = 10 } = params;

    const interviews = await db
        .collection("interviews")
        .orderBy('createdAt', 'desc')
        .where("finalized", "==", true)
        .where("userId", "!=", userId)
        .limit(limit)
        .get()

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[]
}

export async function getInterviewById(id: string): Promise<Interview | null> {
    const interview = await db
        .collection("interviews")
        .doc(id)
        .get()

    return interview.data() as Interview | null
}

export async function createFeedback(params: CreateFeedbackParams) {
    const {interviewId, userId, transcript, version } = params
    try {
        let previousFeedback: Feedback | null = null

        if(version > 1) {
            previousFeedback = await getFeedbackByInterviewId({interviewId, userId})
        }

        const formattedTranscript = transcript.map((sentence: {role: string; content: string}) => (
            `- ${sentence.role}: ${sentence.content}\n`
        )).join('')

        const {object: {totalScore, categoryScores, strengths, areasForImprovement, finalAssessment}} = await generateObject({
            model: google('gemini-2.0-flash-001', {
                structuredOutputs: false
            }),
            schema: feedbackSchema,
            prompt: feedbackPrompt({
                transcript: formattedTranscript,
                version: version,
                previousFeedback: previousFeedback
                    ? JSON.stringify(previousFeedback, null, 2)
                    : undefined
            }),
            system: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.",
        });


        const feedback = await db.collection('feedbacks').add({
            interviewId,
            userId,
            totalScore,
            categoryScores,
            strengths,
            areasForImprovement,
            finalAssessment,
            version,
            createdAt: new Date().toISOString()
        })

        return {
            success: true,
            feedbackId: feedback.id
        }
    } catch (e) {
        console.log("Error saving feedback", e)

        return {
            success: false,

        }
    }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
    const {interviewId, userId, version } = params;

    let feedbackQuery = db
        .collection("feedbacks")
        .where("interviewId", "==", interviewId)
        .where('userId', '==', userId)

    if(version !== undefined) {
        feedbackQuery = feedbackQuery.where("version", '==', version).limit(1)
    } else {
        feedbackQuery = feedbackQuery.orderBy("version", "desc").limit(1)
    }

    const feedback = await feedbackQuery.get()

    if(feedback.empty) return null

    const feedbackDoc = feedback.docs[0];

    return {
        id: feedbackDoc.id, ...feedbackDoc.data()
    } as Feedback
}

export async function getFeedbacksByInterviewIdCount(params: GetFeedbackByInterviewIdParams): Promise<{count: number}> {
    const {interviewId, userId } = params;

    const feedbacks = await db
        .collection("feedbacks")
        .where("interviewId", "==", interviewId)
        .where('userId', '==', userId)
        .count()
        .get()

    const {count} = feedbacks.data();

    return {count}
}