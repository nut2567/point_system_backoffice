"use client";
import { useSession } from "next-auth/react";
import { getProduct } from "../product/page";
import { useState, useEffect } from "react";
export default function Page() {
  const { data: session, status } = useSession();

  const [product, setProduct] = useState(null); // ใช้ useState เพื่อจัดเก็บข้อมูล user
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors if they occur

  useEffect(() => {
    console.log(session, status);
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(); // รอการดึงข้อมูลจาก getProduct
        setProduct(productData);
      } catch (err) {
        console.error(err);
        setError("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct(); // เรียกใช้ฟังก์ชันดึงข้อมูล
  }, []);

  if (error) {
    return <p>{error}</p>; // Display if an error occurred
  }

  return (
    <div>
      <div>
        <div
          className="text-primary radial-progress"
          style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }}
          role="progressbar"
        >
          70%
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="radial-progress bg-primary text-primary-content border-primary border-4"
          style={{ "--value": 70 }}
          role="progressbar"
        >
          70%
        </div>
      </div>
    </div>
  );
}
