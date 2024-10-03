import { useState } from "react"
import VehicalForm from "./VehicalForm"

const DUMMY_DATA = {
  car_img:
    "https://bizweb.dktcdn.net/100/084/618/products/ben-howo-3-chan-ban-full-nhap-khau.jpg?v=1629107651767",
  register_img: "https://winlegal.vn/wp-content/uploads/2023/10/image1-8.jpg",
  name: "abc",
  car_type: 1,
  license_plate_number: "29H2-33344",
  weight_capacity: "100",
}

const VehicalDetail = () => {
  const [editable, setEditable] = useState(false)
  const [state, setState] = useState(DUMMY_DATA)

  const handleSubmit = () => {
    console.log(state)
    setEditable(true)
  }

  return (
    <div className="wrapper container pb-5">
      <div className="col">
        <h2 className="mb-3">Chi tiết xe: Mazda</h2>

        <div className="border rounded-12 p-3">
          <div className="mt-5 d-flex justify-content-center gap-3 flex-column">
            <VehicalForm editable={editable} data={state} setData={setState} />

            <div className="mt-4 d-flex justify-content-center gap-3">
              <button
                type="button"
                class={`btn ${editable ? "" : "btn-theme"}`}
                onClick={() => {
                  setEditable((prev) => !prev)
                  setState(DUMMY_DATA)
                }}
              >
                {editable ? "Quay lại" : "Chỉnh sửa"}
              </button>

              {editable && (
                <button
                  type="button"
                  class="btn btn-theme"
                  onClick={handleSubmit}
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicalDetail
