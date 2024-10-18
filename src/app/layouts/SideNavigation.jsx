"use client"; // ทำให้คอมโพเนนต์นี้ทำงานใน Client Side
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก react
import Link from "next/link";

import Image from "next/image";
export default function Layout({ }) {

  const [sidebarOpen, setSidebarOpen] = useState(false); // ตัวแปรเพื่อจัดการการเปิด/ปิดของ Sidebar
  const [mobile, setMobile] = useState(false); // ตัวแปรเพื่อเช็คว่ากำลังอยู่ในโหมดมือถือหรือไม่

  const checkScreenSize = () => {
    console.log('Component resize',window.innerWidth);
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

  const toggleSidebar = () => {
    // ฟังก์ชันสำหรับเปิด/ปิด Sidebar
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div >
      <div className={`fixed inset-0 w-64 bg-slate-800 text-white flex flex-col transform  
      duration-300 transition-all duration-300 ${!sidebarOpen && mobile ? '-translate-x-full' : ''}
  ${sidebarOpen || !mobile ? 'translate-x-0' : ''}`}
      >
        <div className="p-4 text-lg font-bold text-center">My App</div>
        <nav className="flex flex-col space-y-2 mt-4">
          <button><Link href="/home"><div
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <div className="flex">
              <i className="material-icons items-center flex mr-2">home</i>
              <span className="ml-2">Home</span>

            </div>
          </div></Link></button>

          <button><Link href="/addproduct"><div
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          ><div className="flex">
              <i className="material-icons items-center flex mr-2">stars</i>
              <span className="ml-2">addproduct</span>

            </div>
          </div></Link></button>


          <button><Link href="/profile"><div className="flex items-center p-2 hover:bg-gray-700 rounded"
          ><div className="flex">
              <i className="material-icons items-center flex mr-2">person</i>
              <span className="ml-2">Profile</span>

            </div>
          </div></Link></button>

          <button><Link href="/dashboard">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded"
            ><div className="flex">
                <i className="material-icons items-center flex mr-2">dashboard</i>
                <span className="ml-2">Dashboard</span>

              </div></div></Link></button>

          <button><Link href="/">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded "
            >
              <div className="flex">
                <i className="material-icons items-center flex mr-2">logout</i>
                <span className="ml-2">Logout</span>

              </div>
            </div> </Link></button>

        </nav>
        <div className="fixed bottom-0 flex justify-center w-full"> powered by
          <div className=" ml-2">
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/next.svg"
              alt="Next.js logo"
              width={90}
              height={18}
              priority
            /></div></div>

      </div>
      {/*  Hamburger Icon for Mobile  */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 text-white p-2 rounded-md focus:outline-none sm:hidden 
        ${!sidebarOpen ? 'bg-gray-800' : ""}
      ${sidebarOpen ? 'bg-gray-200' : ""}`}
      ><i className="material-icons items-center flex">menu</i>
      </button>
    </div>
  )

}