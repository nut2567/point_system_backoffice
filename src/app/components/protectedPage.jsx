// src/app/protectedPage.js
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            // ถ้าไม่มี session ให้ redirect ไปหน้า login
            router.push('/');
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex-col text-center flex items-center  justify-center h-dvh"> Loading...
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
            </div>
        ); // แสดง loading เมื่อกำลังเช็ค session
    }

    return (
        <>
            {children}
        </>
    );
}
