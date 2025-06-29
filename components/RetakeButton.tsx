'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

const RetakeButton = ({interviewId, version}: RetakeButtonProps) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/interview/${interviewId}?version=${version + 1}`)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="btn-primary flex-1">
                    <div className="flex w-full justify-center">
                        <p className="text-sm font-semibold text-dark-200">
                            Retake Interview
                        </p>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark">
                <AlertDialogHeader>
                    <AlertDialogTitle>Ready to check your growth?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Take the interview again to sharpen your skills, build confidence, and see how far you&apos;ve come. Every retake is a step toward mastery.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-dark-200 text-primary-200">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick} className="!bg-primary-200 !text-dark-200">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RetakeButton
