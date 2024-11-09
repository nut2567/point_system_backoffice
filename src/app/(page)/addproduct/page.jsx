"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
  const [idProduct, setIdProduct] = useState(searchParams.product);
  const router = useRouter();
  const { data: session } = useSession();

  const [showToast, setShowToast] = useState(false);

  const getProductByID = () => {
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    if (searchParams.product) getProductByID();
  }, []);

  const checkImageValidity = async (url) => {
    try {
      if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
        const response = await fetch(url, { method: "HEAD" });
        return (
          response.ok && response.headers.get("Content-Type").includes("image")
        );
      }
    } catch (error) {
      console.error("Invalid image URL:", error);
    }
    return false;
  };

  const formSubmitAddProduct = async (e) => {
    e.preventDefault();
    const { name, image, points, expiryDate, description } = formData;

    if (!name || !description || !points || !expiryDate || !image) {
      setValid(false);
      return;
    }

    if (!(await checkImageValidity(image))) {
      setValid(false);
      return;
    }

    axios
      .post(`/api/addproduct/${idProduct || ""}`, formData)
      .then(() => document.getElementById("afterSaveSuccess").showModal())
      .catch((error) => console.error("Error submitting data:", error));
  };

  const afterSaveSuccess = () => {
    router.refresh();
    router.push("/product");
  };

  return (
    <div className="w-full px-10">
      <dialog id="afterSaveSuccess" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">แจ้งเตือน</h3>
          {formData.image ? (
            <div>
              <p className="py-4">บันทึกเรียบร้อย</p>
              <div className="modal-action">
                <button onClick={afterSaveSuccess} className="btn">
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="py-4">Error checking image URL</p>
              <div className="modal-action">
                <button className="btn" method="dialog">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>

      <Link href="/product">
        <button className="btn btn-primary">
          <div className="flex items-center justify-center p-2 rounded">
            <i className="material-icons mr-2">arrow_back</i>
            <span className="ml-2">Back to product</span>
          </div>
        </button>
      </Link>

      <p className="my-6 text-left text-5xl">
        {!idProduct ? "Create Product" : "Edit Product"}
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
                  message="Please fill all fields correctly!"
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
