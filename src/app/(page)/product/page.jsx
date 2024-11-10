"use client";
import DelBtn from "./deleteBtn";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

import MongoDBConnect from "@/components/MongoDBConnect";
import Image from "next/image";
export default function MyComponent() {
  const [product, setProduct] = useState(null); // ใช้ useState เพื่อจัดเก็บข้อมูล user
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors if they occur

  async function getProduct() {
    try {
      // ใช้ await รอให้ axios.get() ดึงข้อมูลเสร็จสิ้น
      const resp = await axios.get(`/api/getproduct`);
      // await axios.get(
      //   `https://pointsystemexpress-production.up.railway.app/Product`
      // );

      // ตรวจสอบ response ใน console
      console.log(resp);
      // Check if there is product data in the response
      // ตั้งค่า state ด้วยข้อมูลที่ได้จาก API
      if (resp.data && resp.data.product) {
        setProduct(resp.data.product); // Set product data
      } else {
        setProduct(null); // No product data found
      }
      console.log(product);
    } catch (err) {
      // ถ้ามีข้อผิดพลาดให้แสดง error ใน console
      console.error(err);
      setError("Failed to load product data"); // Set error message
    } finally {
      setIsLoading(false); // Loading complete
    }
  }

  // ใช้ useEffect เพื่อเรียก getusers() เมื่อ component ถูก mount
  useEffect(() => {
    getProduct();
  }, []); // [] เพื่อให้ฟังก์ชันทำงานแค่ครั้งเดียวเมื่อ component mount

  const formattedTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    return { hours, minutes, seconds };
  };

  // Conditional rendering based on loading, error, and product states
  if (isLoading) {
    return (
      <div className="flex-col text-center flex items-center  justify-center h-dvh">
        <p>กำลังโหลดข้อมูล...</p>
        <span className="loading loading-spinner loading-lg  text-info"></span>

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
    ); // Display while loading
  }

  if (error) {
    return <p>{error}</p>; // Display if an error occurred
  }

  if (!product) {
    return <p>No product data available</p>; // Display if no product data
  }

  return (
    <div className="w-full p-10">
      {/* แสดงข้อมูล user หรือข้อความถ้าไม่มีข้อมูล */}

      <div>
        <div className="flex items-center justify-center  bg-white">
          <div className="w-[75%]">
            <MongoDBConnect />
          </div>

          <div className="w-[25%] card-body justify-end items-center">
            <Link href="/addproduct">
              <div className="btn btn-warning flex items-center justify-center rounded">
                <i className="material-icons mr-2">stars</i>
                <span className="ml-2">Add product</span>
              </div>
            </Link>

            <button className="btn btn-info" onClick={getProduct}>
              <div className="flex items-center justify-center rounded">
                <i className="material-icons mr-2">restart_alt</i>
                <span className="ml-2">Reload</span>
              </div>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {product.map((item, index) => (
            <div className="card bg-base-100 w-96 shadow-xl" key={item._id}>
              <figure>
                <div className="relative h-[300px] w-[100%]">
                  {/* กำหนดความสูงที่แน่นอน */}
                  <Image
                    src={item.image}
                    alt="Shoes"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }} // ใช้ 'cover' หรือ 'contain' เพื่อรักษาอัตราส่วน
                  />
                </div>
              </figure>

              <div
                className="card-body text-slate-50"
                style={{ boxShadow: "#0097ff10 0px -10px 60px inset" }}
              >
                <h2 className="card-title">name : {item.name}</h2>
                <p>
                  createdAt :{" "}
                  {new Date(item.createdAt).toLocaleDateString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p>description : {item.description}</p>
                <p>points : {item.points}</p>
              </div>
              <Link href={`/addproduct?product=${item._id}`}>
                <div className="btn btn-warning flex items-center justify-center rounded">
                  <i className="material-icons mr-2">edit</i>
                  <span className="ml-2">Edit</span>
                </div>
              </Link>
              <DelBtn id={item._id} afterDel={getProduct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
