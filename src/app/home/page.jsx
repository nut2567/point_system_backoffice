"use client"
import { useSession } from "next-auth/react"
export default function Page() {
    const { data: session, status } = useSession()
    console.log(session, status)
    return (

        <div>
            <div><div className="text-primary radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }}
                role="progressbar">70%</div></div>
            <div className="flex justify-center"><div
                className="radial-progress bg-primary text-primary-content border-primary border-4"
                style={{ "--value": 70 }}
                role="progressbar">
                70%
            </div></div>


        </div>
    )
}