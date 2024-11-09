"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function ProtectedPage({ children }) {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    if (session) {
      const currentTime = Date.now();
      const sessionExpiryTime = new Date(session.expires).getTime();
      const timeLeft = sessionExpiryTime - currentTime;
      const warningTime = timeLeft - 3000;

      const warningTimer = setTimeout(() => {
        setShowModal(true);
      }, warningTime);

      return () => clearTimeout(warningTimer);
    } else if (status === "unauthenticated" && !showModal) {
      setShowModal(true);
    }
  }, [status, session, showModal]);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.showModal();

      // Start countdown only if the modal is shown
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [showModal]);

  // Separate useEffect to handle the redirect after countdown
  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    }
  }, [countdown, router]);

  if (status === "loading") {
    return (
      <div className="flex-col text-center flex items-center justify-center h-dvh">
        Loading...
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
    );
  }

  return (
    <>
      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">แจ้งเตือน</h3>
          <p className="py-4">
            Session หมดอายุแล้ว คุณจะถูกนำไปที่หน้าเข้าสู่ระบบใน {countdown}{" "}
            วินาที
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => modalRef.current.close()}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {!showModal && children}
    </>
  );
}
