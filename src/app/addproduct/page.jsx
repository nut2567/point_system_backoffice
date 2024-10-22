"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';

import Image from "next/image";
export default function MyComponent() {
    const [user, setUser] = useState(null); // ใช้ useState เพื่อจัดเก็บข้อมูล user

    async function getusers() {
        try {
            // ใช้ await รอให้ axios.get() ดึงข้อมูลเสร็จสิ้น
            const resp = await axios.get(`/api/addproduct`);

            // ตรวจสอบ response ใน console
            console.log(resp);

            // ตั้งค่า state ด้วยข้อมูลที่ได้จาก API
            setUser(resp.data);
        } catch (error) {
            // ถ้ามีข้อผิดพลาดให้แสดง error ใน console
            console.error("Error fetching data: ", error);
        }
    }

    // ใช้ useEffect เพื่อเรียก getusers() เมื่อ component ถูก mount
    useEffect(() => {
        getusers();
    }, []); // [] เพื่อให้ฟังก์ชันทำงานแค่ครั้งเดียวเมื่อ component mount

    return (
        <div>
            {/* แสดงข้อมูล user หรือข้อความถ้าไม่มีข้อมูล */}
            {user ? (
                <div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <div className="">
                                <Image
                                    className=""
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes"
                                    width={90}
                                    height={18}
                                    priority
                                /></div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
                </div>
            ) : (

                <div className="flex-col text-center flex items-center  justify-center h-dvh"><p>กำลังโหลดข้อมูล...</p>
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
            )}
        </div>
    );
}
