"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Toast from "./Toast";

export default function MyComponent({ searchParams }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    points: "",
    expiryDate: "",
    description: "",
  });
  const [valid, setValid] = useState(true);
  const [erMessage, setErMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const idProduct = searchParams.product;

  useEffect(() => {
    if (idProduct) {
      setIsLoading(true);
      axios
        .get(`/api/addproduct/${idProduct}`)
        .then((response) => {
          const data = response.data.product;
          setFormData({
            name: data.name || "",
            image: data.image || "",
            points: data.points || "",
            expiryDate: data.expiryDate || "",
            description: data.description || "",
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setErrorState(error);
        });
    }
  }, [idProduct]);

  // ฟังก์ชันใหม่สำหรับตั้งค่าข้อความผิดพลาดและสถานะ
  const setErrorState = (message) => {
    setErMessage(message);
    setValid(false);
    setIsLoading(false);
  };

  const checkImageValidity = (url) => {
    // Regular expression to check if URL ends with common image file extensions
    const imageRegex = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
    return (
      imageRegex.test(url) &&
      (url.startsWith("http://") || url.startsWith("https://"))
    );
  };

  // ใช้ฟังก์ชันใหม่ใน formSubmitAddProduct
  const formSubmitAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, image, points, expiryDate, description } = formData;

    // ตรวจสอบข้อมูลฟอร์ม
    if (!name || !description || !points || !expiryDate || !image) {
      setErrorState("Please fill all fields correctly!");
      return;
    }

    // ตรวจสอบ URL ของรูปภาพ
    if (await checkImageValidity(image)) {
      setErrorState("Invalid image URL");
      return;
    }

    // ส่งคำขอไปยังเซิร์ฟเวอร์
    axios
      .post(`/api/addproduct/${idProduct || ""}`, formData)
      .then((response) => {
        if (
          response.data.message === "สินค้าชื่อนี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น"
        ) {
          setErrorState(response.data.message);
          return;
        }
        setErrorState("");
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setIsLoading(false);
      });
  };

  const afterSaveSuccess = () => {
    router.refresh();
    router.push("/product");
  };

  return (
    <div className="w-full px-10">
      {isLoading && (
        <dialog id="loading_modal" className="modal modal-open">
          <div className="modal-box text-center">
            <h3 className="font-bold text-[30px] text-white mb-10 items-end flex">
              กำลังโหลดข้อมูล
              <span className="loading loading-dots loading-md"></span>
            </h3>
            <span className="loading loading-spinner w-24 text-info"></span>
          </div>
        </dialog>
      )}
      {isModalOpen && (
        <dialog open className="modal text-white">
          <div className="modal-box">
            <h3 className="font-bold text-lg">แจ้งเตือน</h3>
            <p className="py-4">{erMessage || "บันทึกเรียบร้อย"}</p>
            <div className="modal-action">
              <button onClick={afterSaveSuccess} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <Link href="/product">
        <button className="btn btn-primary">
          <div className="flex items-center justify-center p-2 rounded">
            <i className="material-icons mr-2">arrow_back</i>
            <span className="ml-2">Back to product</span>
          </div>
        </button>
      </Link>

      <p className="my-6 text-left text-5xl">
        {idProduct ? "Edit Product" : "Create Product"}
      </p>

      {session ? (
        <div>
          <div className="card bg-base-100 w-3/5 shadow-xl">
            <form onSubmit={formSubmitAddProduct}>
              <div className="card-body gap-4 flex flex-nowrap">
                {["name", "image", "points", "expiryDate", "description"].map(
                  (field) => (
                    <input
                      key={field}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      type={field === "expiryDate" ? "date" : "text"}
                      placeholder={field}
                      className={`border-2 p-2 w-full rounded ${!valid && !formData[field] ? "border-red-500" : "border-gray-300"}`}
                    />
                  )
                )}
                <Toast
                  message={erMessage}
                  show={!valid}
                  onClose={() => setValid(true)}
                />
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-col text-center flex items-center justify-center h-dvh">
          <p>Not signed in</p>
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      )}
    </div>
  );
}
