"use client"
import { useSession } from "next-auth/react"
export default function page() {
    const { data: session, status } = useSession()
    console.log(session, status)
    return (
        
        <div>
            <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }} role="progressbar">70%</div>
            test
        </div>
    )
}