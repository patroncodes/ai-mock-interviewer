import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

const RootLayout = async({children}: {children: ReactNode}) => {
    const isLoggedIn = await isAuthenticated()

    if(!isLoggedIn) redirect('/sign-in')

    return (
        <div className="root-layout">
            <nav className="flex items-center justify-between w-full">
                <Link  href="/" className="flex items-center gap-2">
                    <Image src='/logo.svg' alt='Logo' width={38} height={32}/>
                    <h2 className="text-primary-100">Prepwise</h2>
                </Link>

                <div>
                    <Image src='/user-avatar.png' alt="profile" width={45} height={45} className="rounded-full object-cover" />
                </div>
            </nav>

            {children}
        </div>
    )
}
export default RootLayout
