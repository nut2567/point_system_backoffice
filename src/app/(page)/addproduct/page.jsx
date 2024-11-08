"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function MyComponent({ searchParams }) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState("");
  const [valid, setValid] = useState(true); // แก้ไขชื่อฟังก์ชัน state ให้ถูกต้อง

  const [idProduct, setIdProduct] = useState(searchParams.product);
  const router = useRouter();

  const { data: session } = useSession();

  const getProductByID = () => {
    axios
      .get(`/api/addproduct/${idProduct}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data.product;
        setDescription(data.description || "");
        setName(data.name || "");
        setPoints(data.points || "");
        setExpiryDate(data.expiryDate || "");
        setImage(data.image || "");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };

  useEffect(() => {
    console.log("searchParams", searchParams.product);
    if (searchParams.product) {
      getProductByID();
    }
  }, []);

  const formSubmitAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !description || !points) {
      console.log("Please fill all fields");
      setValid(false);
      return;
    }

    axios
      .post(`/api/addproduct/${idProduct || ""}`, {
        name,
        image,
        points,
        expiryDate,
        description,
      })
      .then((response) => {
        console.log(response.data);
        document.getElementById("my_modal_2").showModal();
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };

  const afterSaveSuccess = () => {
    router.refresh();
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <button className="btn btn-primary">
        <Link href="/product">
          <div className="flex items-center justify-center p-2 rounded">
            <i className="material-icons mr-2">arrow_back</i>
            <span className="ml-2">Back to product</span>
          </div>
        </Link>
      </button>

      <p className="my-6 text-left text-5xl">
        {!idProduct ? "Create Product" : "Edit Product"}
      </p>

      {session ? (
        <div>
          <div className="card bg-base-100 w-96 shadow-xl ">
            <form onSubmit={formSubmitAddProduct} action="">
              <div className="card-body gap-4 flex flex-nowrap">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="name"
                />
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  type="text"
                  placeholder="url Image"
                />
                <input
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  type="text"
                  placeholder="points"
                />
                <input
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  type="date"
                  placeholder="expiry date"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description"
                ></textarea>
                {!valid && <p className="text-red-600">input invalid</p>}
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
