"use client";
export default function DelBtn({ id, afterDel }) {
  const deleteProduct = (id) => {
    console.log(id);
    fetch(`/api/addproduct?id=${id}`, {
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
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
    // Refresh the page to see the updated list
    // window.location.reload();
    afterDel();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault(); // ป้องกันการส่งฟอร์ม
    deleteProduct(id);
  };
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">แจ้งเตือน</h3>
          <p className="py-4">ยืนยันการลบ</p>
          <div className="modal-action">
            <form onSubmit={handleDeleteClick} method="dialog">
              <button className="btn">ตกลง</button>
            </form>
          </div>
        </div>
      </dialog>
      <button
        className="btn btn-error"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <div className="flex items-center justify-center rounded">
          <i className="material-icons mr-2">delete_forever</i>
          <span className="ml-2">Delete</span>
        </div>
      </button>
    </>
  );
}
