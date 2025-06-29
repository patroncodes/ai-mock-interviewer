import {getInterviewById} from "@/lib/actions/general.action";
import {redirect} from "next/navigation";
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import Agent from "@/components/Agent";
import {getCurrentUser} from "@/lib/actions/auth.action";

const Page = async({params, searchParams}: RouteParams) => {
    const {id} = await params;
    const {version} = await searchParams;
    const interview = await getInterviewById(id)

    const user = await getCurrentUser()

    const numerizedVersion = version !== undefined ? parseInt(version) : 1

    if(!interview) redirect('/')

    return (
        <>
            <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-4 items-center max-sm:flex-col">
                    <div className="flex gap-4 items-center">
                        <Image src={getRandomInterviewCover()} alt="cover-image" width={40} height={40} className="rounded-full object-cover size-[40px]" />
                        <h3 className="capitalize">{interview.role} Interview</h3>
                    </div>

                    <DisplayTechIcons techStack={interview.techStack} />
                </div>

                <p className="bg-dark-200 px-4 py-2 h-fit rounded-lg capitalize">{interview.type}</p>
            </div>

            <Agent
                userName={user?.name || ""}
                userId={user?.id}
                interviewId={id}
                questions={interview.questions}
                type="interview"
                version={numerizedVersion}
            />
        </>
    )
}
export default Page
