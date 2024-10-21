import { useState } from "react"
import VehicalForm from "./VehicalForm"
import { toast } from "react-toastify"
import axiosInstance from "../../../config/axiosConfig"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const DEFAULT_DATA = {
  imageCar: "",
  imageRegistration: "",
  nameCar: "",
  registrationDate: "",
  licensePlate: "",
  load: "",
}

const VehicalAdd = () => {
  const [state, setState] = useState(DEFAULT_DATA)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const validateData = (data) => {
    let isValid = true
    let messages = ""

    // Check each field individually
    if (!data.imageCar) {
      isValid = false
      messages = "Vui lòng chọn ảnh của xe."
    }
    if (!data.imageRegistration) {
      isValid = false
      messages = "Vui lòng chọn ảnh giấy tờ đăng kiểm."
    }
    if (!data.nameCar) {
      isValid = false
      messages = "Vui lòng nhập tên xe"
    }
    if (!data.registrationDate) {
      isValid = false
      messages = "Vui lòng chọn ngày đăng kiểm."
    }
    if (!data.licensePlate) {
      isValid = false
      messages = "Vui lòng nhập biển số xe."
    }
    if (!data.load) {
      isValid = false
      messages = "Vui lòng nhập trọng tải."
    }

    return { isValid, messages }
  }

  // TODO: handle error case when call api
  const handleSubmit = async () => {
    const { isValid, messages } = validateData(state)
    if (!isValid) return toast.error(messages)

    const formData = new FormData()
    formData.append("nameCar", state.nameCar)
    formData.append("load", state.load)
    formData.append("licensePlate", state.licensePlate)
    formData.append("registrationDate", state.registrationDate)
    formData.append("imageCar", state.imageCar)
    formData.append("imageRegistration", state.imageRegistration)
    formData.append("driverId", "66e6dbc1a403de7498e7c667")
    formData.append("description", "66e6dbc1a403de7498e7c667")

    setLoading(true)

    const response = await axiosInstance.post("/car", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    setLoading(false)

    toast.success("Thêm thành công xe mới")

    history.push(`/vehical/detail/${response.data._id}`)
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
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Loading" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicalAdd
