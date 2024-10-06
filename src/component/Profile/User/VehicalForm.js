const VehicalForm = ({ data, editable, setData }) => {
  const onFileChange = (event, field) => {
    const imageUrl = URL.createObjectURL(event.target.files[0])

    setData((prev) => ({ ...prev, [field]: imageUrl }))
  }

  const PLACEHOLDER_IMAGE =
    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"

  return (
    <>
      <div className="pb-4 row">
        <div className="col">
          <div className="mb-2 font-weight-bold">Hình ảnh xe</div>

          <img
            className="rounded-12 border"
            src={
              data.car_img.length
                ? data.car_img
                : "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
            }
            alt={data.name}
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />

          {editable && (
            <input
              className="mt-3 form-control"
              type="file"
              style={{ minHeight: "45px" }}
              onChange={(event) => onFileChange(event, "car_img")}
            />
          )}
        </div>

        <div className="col">
          <div className="mb-2 font-weight-bold">Giấy tờ đăng kiểm</div>

          <img
            className="rounded-12 border"
            src={
              data.register_img.length ? data.register_img : PLACEHOLDER_IMAGE
            }
            alt={data.name}
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />

          {editable && (
            <input
              className="mt-3 form-control"
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
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div className="col">
          <label htmlFor="deliver_address">Ngày đăng kiểm</label>

          <div>
            <input
              className="form-select rounded w-full form-control"
              type="date"
              placeholder="dd-mm-yyyy"
              disabled={!editable}
              value={data.register_date}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  register_date: e.target.value,
                }))
              }
            />
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
            value={data.license_plate_number}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                license_plate_number: e.target.value,
              }))
            }
          />
        </div>

        <div className="col">
          <label htmlFor="weightCapacity">Trọng tải (Tấn)</label>

          <input
            id="weightCapacity"
            type="text"
            className="form-control"
            placeholder="Trọng tải (Tấn)"
            disabled={!editable}
            value={data.weight_capacity}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                weight_capacity: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </>
  )
}

export default VehicalForm
