import { useState } from "react"
import VehicalForm from "./VehicalForm"
import { toast } from "react-toastify"

const DUMMY_DATA = {
  car_img: "",
  register_img: "",
  name: "",
  car_type: 0,
  license_plate_number: "",
  weight_capacity: "",
}

const VehicalAdd = () => {
  const [state, setState] = useState(DUMMY_DATA)

  const handleSubmit = () => {
    console.log(state)
    toast.success("Thêm thành công xe mới")
  }

  return (
    <div className="wrapper container pb-5">
      <div className="col">
        <h2 className="mb-3">Tạo mới xe</h2>

        <div className="border rounded-12 p-3">
          <div className="mt-5 d-flex justify-content-center gap-3 flex-column">
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
