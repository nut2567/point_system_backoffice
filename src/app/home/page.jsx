"use client"
import { useSession } from "next-auth/react"
export default function page() {
    const { data: session } = useSession()
    console.log(session)
    return (
        <div className=" h-dvh bg-zinc-200 m-5 text-neutral-950 rounded-box">

            <span className="loading loading-spinner loading-lg  text-info" ></span>

            <div className="flex w-52 flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
            </div>

            <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">70%</div>
            test
        </div>
    )
}