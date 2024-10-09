import { useState } from "react"
import VehicalForm from "./VehicalForm"
import { toast } from "react-toastify"

const DUMMY_DATA = {
  car_img: "",
  register_img: "",
  name: "",
  register_date: "",
  license_plate_number: "",
  weight_capacity: "",
}

const VehicalAdd = () => {
  const [state, setState] = useState(DUMMY_DATA)

  const validateData = (data) => {
    let isValid = true
    let messages = ""

    // Check each field individually
    if (!data.car_img) {
      isValid = false
      messages = "Vui lòng chọn ảnh của xe."
    }
    if (!data.register_img) {
      isValid = false
      messages = "Vui lòng chọn ảnh giấy tờ đăng kiểm."
    }
    if (!data.name) {
      isValid = false
      messages = "Vui lòng nhập tên xe"
    }
    if (!data.register_date) {
      isValid = false
      messages = "Vui lòng chọn ngày đăng kiểm."
    }
    if (!data.license_plate_number) {
      isValid = false
      messages = "Vui lòng nhập biển số xe."
    }
    if (!data.weight_capacity) {
      isValid = false
      messages = "Vui lòng nhập trọng tải."
    }

    return { isValid, messages }
  }

  const handleSubmit = () => {
    const { isValid, messages } = validateData(state)
    if (!isValid) return toast.error(messages)

    toast.success("Thêm thành công xe mới")
  }

  return (
    <div className="wrapper container pb-5">
      <div className="col">
        <h2 className="mb-3">Tạo mới xe</h2>

        <div className="border rounded-12 p-3">
          <div className="d-flex justify-content-center gap-3 flex-column">
            <VehicalForm editable data={state} setData={setState} />

            <div className="mt-4 d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn btn-theme"
                onClick={handleSubmit}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicalAdd
