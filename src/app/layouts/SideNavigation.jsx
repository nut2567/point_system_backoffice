"use client"; // ทำให้คอมโพเนนต์นี้ทำงานใน Client Side
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก react
import Link from "next/link";
import Swal from 'sweetalert2';

import Image from "next/image";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Layout({ mobile, sidebarOpen }) {

  const [sidebarOpen2, setSidebarOpen2] = useState(sidebarOpen); // ตัวแปรเพื่อจัดการการเปิด/ปิดของ Sidebar

  const router = useRouter();
  const toggleSidebar = () => {
    // ฟังก์ชันสำหรับเปิด/ปิด Sidebar
    setSidebarOpen2(!sidebarOpen);
  };


  // ฟังก์ชัน Logout
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      text: "ออกจากบบ",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        signOut()

        // เปลี่ยนเส้นทางกลับไปยังหน้าล็อกอิน
        router.replace("/");
      }
    });
  }

  return (
    <div >
      <div className={`fixed inset-0 w-64 bg-slate-800 text-white flex flex-col transform  
      duration-300 transition-all ${!sidebarOpen2 && mobile ? '-translate-x-full' : ''}
  ${sidebarOpen2 || !mobile ? 'translate-x-0' : ''}`}   >
        <div className="p-4 text-lg font-bold text-center">
          <div className="border shadow-xl border-indigo-500/50"><p>Back Office</p><p>Points System</p> </div></div>

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

          <button onClick={logout}>
            <div className="flex items-center p-2 hover:bg-gray-700 rounded "
            >
              <div className="flex">
                <i className="material-icons items-center flex mr-2">logout</i>
                <span className="ml-2">Logout</span>

              </div>
            </div> </button>

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
        ${!sidebarOpen2 ? 'bg-gray-800' : ""}
      ${sidebarOpen2 ? 'bg-gray-200' : ""}`}
      ><i className="material-icons items-center flex">menu</i>
      </button>
    </div>
  )

}