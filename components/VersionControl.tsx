import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

const VersionControl = ({count, currentVersion, interviewId}: VersionControlProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="btn-secondary">Version {currentVersion}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="start">
                <DropdownMenuLabel>Your Attempts</DropdownMenuLabel>
                {Array.from({length: count}).map((_, index) => (
                    <div key={index + 1}>
                    <DropdownMenuItem asChild disabled={(index + 1) === currentVersion}>
                        <Link href={`/interview/${interviewId}/feedback?version=${index + 1}`}>
                            {index + 1}
                        </Link>
                    </DropdownMenuItem>
                <DropdownMenuSeparator />
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default VersionControl
