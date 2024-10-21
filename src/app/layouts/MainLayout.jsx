"use client"; // ทำให้คอมโพเนนต์นี้ทำงานใน Client Side
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก react
import localFont from "next/font/local";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import Headerbar from './Headerbar';
import SideNavigation from './SideNavigation';

import ProtectedPage from '../components/protectedPage';

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({ children }) {


    const [sidebarOpen, setSidebarOpen] = useState(false); // ตัวแปรเพื่อจัดการการเปิด/ปิดของ Sidebar
    const [mobile, setMobile] = useState(false); // ตัวแปรเพื่อเช็คว่ากำลังอยู่ในโหมดมือถือหรือไม่

    const checkScreenSize = () => {
        // ฟังก์ชันเช็คขนาดหน้าจอ
        if (window.innerWidth >= 640) {
            setMobile(false); // ถ้าหน้าจอใหญ่กว่า 640px ให้ปิดโหมดมือถือ
            setSidebarOpen(true); // เปิด Sidebar
        } else {
            setMobile(true); // ถ้าหน้าจอเล็กกว่า 640px ให้เปิดโหมดมือถือ
            setSidebarOpen(false); // ซ่อน Sidebar
        }
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        console.log('Component mounted');

        // ทำความสะอาดเมื่อคอมโพเนนต์ถูกลบ
        return () => {
            window.removeEventListener("resize", checkScreenSize); // ลบ event listener
            console.log('Component unmounted');
        };
    }, []); // Array ว่างหมายความว่า useEffect จะทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์ถูกติดตั้ง
    return (

        <ProtectedPage>
            <Headerbar sidebarOpen={sidebarOpen} mobile={mobile} />
            <SideNavigation sidebarOpen={sidebarOpen} mobile={mobile} />

            <div className={`transition-all duration-300 ${sidebarOpen && !mobile ? 'ml-64' : ''}`}   >
                <div className=" h-dvh bg-zinc-200 m-5 text-neutral-950 rounded-box items-center flex-col flex py-10">
                    {children}
                </div>

            </div>
            <footer className="row-start-3 fixed flex gap-6 flex-wrap items-center justify-center">
                {/* Footer content goes here */}
            </footer>
        </ProtectedPage>


    );
}
