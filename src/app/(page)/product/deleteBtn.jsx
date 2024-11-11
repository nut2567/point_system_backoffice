"use client";
export default function DelBtn({ id, afterDel }) {
  const modalId = `delete-modal-${id}`;

  // ฟังก์ชันสำหรับลบสินค้าผ่าน API Route
  const deleteProduct = () => {
    console.log(`Attempting to delete product with ID: ${id}`);
    fetch(`/api/deleteproduct?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product deleted successfully", data);
        afterDel(); // อัปเดต UI หลังจากลบเสร็จ
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  // ฟังก์ชันเมื่อกดปุ่มยืนยันการลบ
  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteProduct();
  };

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box text-white">
          <h3 className="font-bold text-lg">แจ้งเตือน</h3>
          <p className="py-4">ยืนยันการลบสินค้านี้หรือไม่?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={handleDeleteClick} method="dialog">
              <button className="btn">ตกลง</button>
            </form>
            <form method="dialog">
              <button className="btn">ยกเลิก</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
      <button
        className="btn btn-error"
        onClick={() => {
          document.getElementById(modalId).showModal();
        }}
      >
        <div className="flex items-center justify-center rounded">
          <i className="material-icons mr-2">delete_forever</i>
          <span className="ml-2">Delete</span>
        </div>
      </button>
    </>
  );
}
