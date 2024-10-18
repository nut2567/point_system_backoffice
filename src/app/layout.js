// src/app/layout.js
'use client';
import MainLayout from './layouts/MainLayout';
import Header from './layouts/header';

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // ใช้ usePathname เพื่อเข้าถึงเส้นทางปัจจุบัน

  // ไม่ใช้ Layout สำหรับหน้าแรก (หรือหน้าล็อกอิน)
  console.log("pathname", pathname);
  const [is404, setIs404] = useState(false);
  useEffect(() => {
    // ตรวจสอบการเรียก API ว่าเส้นทางนั้นเป็น 404 หรือไม่
    fetch(pathname)
      .then(response => {
        if (response.status === 404) {
          setIs404(true);
        } else {
          setIs404(false);
        }
      });
  }, [pathname]);

  // ถ้าเป็น 404 จะไม่ใช้ Layout และแสดงข้อความว่าไม่พบหน้า
  if (is404) {
    return <></>; // ไม่แสดง Layout สำหรับหน้า 404
  }

  if (pathname === '/' || pathname === '/login') {
    return (
      <html data-theme="dracula" lang="en">
        <Header/>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          {children}
          <footer className="row-start-3 fixed bottom-10 w-full flex gap-6 flex-wrap items-center justify-center">

            <div className="flex justify-center "> powered by
              <div className=" ml-2">
              <Image
                className="dark:invert"
                src="https://nextjs.org/icons/next.svg"
                alt="Next.js logo"
                width={90}
                height={18}
                priority
              /></div></div>
          </footer>
        </body>

      </html>
    )
  }

  // ใช้ Layout สำหรับหน้าที่เหลือ
  return <MainLayout>{children}</MainLayout>;
}
