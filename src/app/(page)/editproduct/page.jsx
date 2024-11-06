"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";
export default function MyComponent() {
  const [user, setUser] = useState(null); // ใช้ useState เพื่อจัดเก็บข้อมูล user

  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const [points, setPoints] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [image, setImage] = useState(null);
  const [valid, setValaid] = useState(true);
  const router = useRouter();

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

  const formSubmitAddProduct = async function (e) {
    e.preventDefault();
    if (!name || !description || !points) {
      console.log("Please fill all fields");
      setValaid(false);
      return;
    }
    // ส่งข้อมูล user ไปที่ API
    axios
      .post("/api/addproduct", {
        name,
        image,
        points,
        expiryDate,
        description,
      })
      .then((response) => {
        // ตรวจสอบ response ใน console
        console.log(response.data);
        // คืนค่าลับไปที่หน้าแรก
        document.getElementById("my_modal_2").showModal();
      })
      .catch((error) => {
        // ถ้ามีข้อดพลาให้แสดง error ใน console
        console.error("Error submitting data: ", error);
      });
  };

  const afterSaveSuccess = (e) => {
    router.push("/product");
  };

  return (
    <div className="w-full px-10">
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">แจ้งเตือน</h3>
          <p className="py-4">บันทึกเรียบร้อย</p>
          <div className="modal-action">
            <form onSubmit={afterSaveSuccess} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form
          method="dialog"
          onSubmit={afterSaveSuccess}
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
      <button className="btn btn-primary">
        <Link href="/product">
          <div className="flex items-center justify-center p-2 rounded">
            <i className="material-icons mr-2">arrow_back</i>
            <span className="ml-2">Back to product</span>
          </div>
        </Link>
      </button>
      {/* แสดงข้อมูล user หรือข้อความถ้าไม่มีข้อมูล */}
      <p className="my-6 text-left text-5xl">Create Product</p>
      {user ? (
        <div>
          <div className="card bg-base-100 w-96 shadow-xl ">
            <form onSubmit={formSubmitAddProduct} action="">
              <div className="card-body gap-4 flex flex-nowrap">
                {/* <h2 className="card-title text-slate-50">Steb</h2> */}
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="name"
                />
                <input
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                  type="text"
                  placeholder="url Image"
                />
                <input
                  onChange={(e) => {
                    setPoints(e.target.value);
                  }}
                  type="text"
                  placeholder="points"
                />
                <input
                  onChange={(e) => {
                    setExpiryDate(e.target.value);
                  }}
                  type="date"
                  placeholder="points"
                />
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  name=""
                  id=""
                  cols="30"
                  placeholder="description"
                ></textarea>
                {!valid && <p className="text-red-600">input invalid</p>}
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      ) : (
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
      )}
    </div>
  );
}
