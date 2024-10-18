"use client"; // ทำให้คอมโพเนนต์นี้ทำงานใน Client Side
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก react
export default function Layout({ }) {
  
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
  <div  className={`flex flex-col items-center transition-all duration-300 ${sidebarOpen && !mobile ? 'ml-64' : ''}`}>
    <header
      className="bg-blue-800 w-full text-white p-4 text-center text-2xl"
    >
      Back Office Points System
    </header>

    <div className="flex flex-col items-center w-full mt-4">
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl">
        <h2 className="text-gray-600 text-xl font-bold mb-2">
          Hello, !
        </h2>
        <p className="text-gray-600">
          Your points:
          <span className="font-semibold"></span>
        </p>
      </div>
    </div>

  </div>)
  
}