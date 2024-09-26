import { useState } from "react"

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

  const onFileChange = (event, field) => {
    const imageUrl = URL.createObjectURL(event.target.files[0])

    setState((prev) => ({ ...prev, [field]: imageUrl }))
  }

  const handleSubmit = () => {
    console.log(state)
    setEditable(true)
  }

  return (
    <div className="wrapper container pb-5">
      <div className="col">
        <h2 className="mb-3">Chi tiết xe: Mazda</h2>

        <div className="border rounded-12 p-3">
          <div className="pb-4 row">
            <div className="col">
              <div className="mb-2 font-weight-bold">Hình ảnh xe</div>

              <img
                className="rounded-12"
                src={state.car_img}
                alt={state.name}
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
              />

              {editable && (
                <input
                  class="mt-3 form-control"
                  type="file"
                  style={{ minHeight: "45px" }}
                  onChange={(event) => onFileChange(event, "car_img")}
                />
              )}
            </div>

            <div className="col">
              <div className="mb-2 font-weight-bold">Giấy tờ đăng kiểm</div>

              <img
                className="rounded-12"
                src={state.register_img}
                alt={state.name}
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
              />

              {editable && (
                <input
                  class="mt-3 form-control"
                  type="file"
                  style={{ minHeight: "45px" }}
                  onChange={(event) => onFileChange(event, "register_img")}
                />
              )}
            </div>
          </div>

          <div className="row pt-3 border-top">
            <div className="col">
              <label htmlFor="name">Tên xe</label>

              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Tên xe"
                disabled={!editable}
                value={state.name}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col">
              <label htmlFor="deliver_address">Loại xe</label>

              <div>
                <select
                  id="car"
                  className="form-select rounded w-full form-control"
                  disabled={!editable}
                  value={state.car_type}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      car_type: e.target.value,
                    }))
                  }
                >
                  <option value="0">Xe tải</option>
                  <option value="1">Xe khách</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <label htmlFor="licensePlateNumber">Biển số</label>

              <input
                id="licensePlateNumber"
                type="text"
                className="form-control"
                placeholder="Biển số"
                disabled={!editable}
                value={state.license_plate_number}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    license_plate_number: e.target.value,
                  }))
                }
              />
            </div>

            <div className="col">
              <label htmlFor="weightCapacity">Trọng tải</label>

              <input
                id="weightCapacity"
                type="text"
                className="form-control"
                placeholder="Trọng tải"
                disabled={!editable}
                value={state.weight_capacity}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    weight_capacity: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="mt-5 d-flex justify-content-center gap-3">
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
  )
}

export default VehicalDetail
