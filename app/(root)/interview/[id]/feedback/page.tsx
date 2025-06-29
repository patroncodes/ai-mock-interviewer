import {getCurrentUser} from "@/lib/actions/auth.action";
import {getFeedbackByInterviewId, getFeedbacksByInterviewIdCount, getInterviewById} from "@/lib/actions/general.action";
import {redirect} from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import RetakeButton from "@/components/RetakeButton";
import VersionControl from "@/components/VersionControl";

const Page = async ({params, searchParams}: RouteParams) => {
    const {id} = await params;
    const {version} = await searchParams;
    const user = await getCurrentUser()

    const interview = await getInterviewById(id)
    if(!interview) redirect('/')

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id || '',
        version: version !== undefined ? parseInt(version) : undefined
    })

    const {count} = await getFeedbacksByInterviewIdCount({
        interviewId: id,
        userId: user?.id || ''
    })

    console.log(feedback)

    if(!feedback) redirect('/')

    const formattedDate = dayjs(feedback.createdAt).format('MMM D, YYYY - h:mm A');

    return (
        <div className="section-feedback relative lg:px-12">
            <div className="flex flex-col items-center gap-6 pb-6 border-b border-light-800 ">
                <h1 className="text-center text-3xl lg:text-4xl xl:text-5xl font-bold">Feedback on the Interview - <br/>
                    <span className="capitalize">{interview.role}</span> Interview
                </h1>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex gap-2 items-center">
                            <Image src='/star.svg' alt="star" width={22} height={22} />
                            <p>Overall Impression: {feedback.totalScore || '---'}/100</p>
                        </div>
                        <div className="flex gap-2">
                            <Image src='/calendar.svg' alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>

                    {count > 1 && (
                        <VersionControl count={count} currentVersion={feedback.version} interviewId={id} />
                    )}
                </div>
            </div>

            <p>{feedback.finalAssessment}</p>

        <div className="flex flex-col gap-4">
            <h2>Breakdown of Evaluation</h2>

            <ul className="list-none flex flex-col gap-4">
                {feedback.categoryScores.map(({name, score, comment}, index) => (
                    <li key={name} className="flex flex-col gap-1">
                        <h4 className="font-bold">
                            <span>{index + 1}.</span>
                            <span className="ml-3">{name}</span>
                            <span className="ml-2">({score}/100)</span>
                        </h4>

                        <p className="pl-6 tracking-wide">{comment}</p>
                    </li>
                ))}
            </ul>
        </div>

            {feedback.strengths.length > 0 && (
            <div className="flex flex-col gap-4">
                <h2>Strengths</h2>

                <ul className="list-outside px-6 flex flex-col gap-4">
                    {feedback.strengths.map((strength, index) => (
                        <li key={index} className="">
                            {strength}
                        </li>
                    ))}
                </ul>
            </div>
            )}

            <div className="flex flex-col gap-4">
                <h2>Areas for Improvement</h2>

                <ul className="list-outside px-6 flex flex-col gap-4">
                    {feedback.areasForImprovement.map((area, index) => (
                        <li key={index} className="">
                            {area}
                        </li>
                    ))}
                </ul>

            </div>

            <div className="buttons">
                <Button className="btn-secondary flex-1">
                    <Link href="/" className="flex w-full justify-center">
                        <p className="text-sm font-semibold text-primary-200 text-center">
                            Back to dashboard
                        </p>
                    </Link>
                </Button>

                {!version || parseInt(version) === count ? (
                    <RetakeButton interviewId={id} version={feedback.version} />
                ) : (
                    <Button className="btn-primary flex-1">
                        <Link href={`/interview/${id}/feedback`} className="flex w-full justify-center">
                            <p className="text-sm font-semibold text-dark-200 text-center">
                                Go to latest assessment
                            </p>
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Page