// src/app/layout.js
'use client';
import MainLayout from './layouts/MainLayout';
import Header from './layouts/header';

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import SessionWrapper  from './components/session';

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

  const [layout, setLayout] = useState(null
  );
  // ไม่ใช้ Layout สำหรับหน้าแรก (หรือหน้าล็อกอิน)
  console.log("pathname", pathname);
  useEffect(() => {
    // ตรวจสอบการเรียก API ว่าเส้นทางนั้นเป็น 404 หรือไม่
    fetch(pathname)
      .then(response => {
        if (response.status === 404) {
          setLayout(<>{children}</>);
        }
      });
  }, [pathname]);

  // ถ้าเป็น 404 จะไม่ใช้ Layout และแสดงข้อความว่าไม่พบหน้า


  // อัพเดท layout ตาม pathname
  useEffect(() => {
    if (pathname === '/') {
      setLayout(
        <>
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
                />
              </div>
            </div>
          </footer>
        </>
      );
    } else {
      setLayout(<MainLayout>{children}</MainLayout>);
    }
  }, [pathname, children]); // ทำงานเมื่อ pathname หรือ children เปลี่ยน

  // ใช้ Layout สำหรับหน้าที่เหลือ
  return (
    <html data-theme="dracula" lang="en">
      <Header />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <SessionWrapper >{layout}
        </SessionWrapper >
      </body>
    </html>
  );
}
