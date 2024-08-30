import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const TripDetail = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <div className="wrapper container">
      <div className="mb-4 quote-error">
        <div>Khách thuê đã huỷ.</div>
        <div className="fs-12">Lý do: Thời gian chờ đợi lâu</div>
      </div>

      <div className="row">
        <div className="col-8 pr-2">
          <div className="border rounded-12 p-3">
            <div className="d-flex border-bottom pb-3">
              <img
                src="https://noticias.coches.com/wp-content/uploads/2024/05/Rolls-Royce-Cullinan-Black-Badge-UK-2025-3.jpeg"
                alt="car"
                className="rounded-12 cursor-pointer"
                style={{ width: "260px", height: "195px", objectFit: "cover" }}
              />

              <div className="ml-4 d-flex flex-column justify-content-center">
                <div className="mb-2">
                  <span className="font-weight-bold">Mazda 2023</span> - xe tự
                  lái
                </div>

                <div className="mb-3 fs-12 badge-info">Số tự động</div>

                <div className="fs-12 text-secondary">
                  Địa chỉ: Quận Thanh Khuê, Đà Nẵng
                </div>
              </div>
            </div>

            <div className="pt-3">
              <div className="mb-3 font-weight-bold">Thời gian thuê xe</div>

              <div className="d-flex">
                <div>
                  <div className="fw-600">Bắt đầu thuê xe</div>
                  <div className="fs-20">08:30 - 30/06/2024</div>
                </div>

                <div className="ml-5">
                  <div className="fw-600">Kết thúc thuê xe</div>
                  <div className="fs-20">08:30 - 30/06/2024</div>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <div className="mb-3 font-weight-bold">Đơn hàng</div>

              <form>
                <div className="mb-3">
                  <input
                    id="file-upload"
                    className="mr-3 border p-2 rounded"
                    type="file"
                  />

                  <button className="btn btn-theme fs-16 p-2 lh-1">
                    Tải ảnh
                  </button>
                </div>

                <div className="row">
                  <div className="col">
                    <label htmlFor="category">Loại hàng</label>
                    <input
                      id="category"
                      type="text"
                      className="form-control"
                      placeholder="Loại hàng"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="car">Loại xe</label>

                    <div>
                      <select id="car" className="form-select rounded w-full">
                        <option value="1">Mazda</option>
                        <option value="1">Wave</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="address">Địa chỉ nhận hàng</label>
                    <input
                      id="address"
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ nhận hàng"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="deliver_address">Địa chỉ giao hàng</label>
                    <input
                      id="deliver_address"
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ giao hàng"
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="address">Tổng trọng lượng (KG)</label>
                    <input
                      id="address"
                      type="number"
                      className="form-control"
                      placeholder="Tổng trọng lượng (KG)"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="deliver_address">Giá tiền</label>
                    <input
                      id="deliver_address"
                      type="text"
                      className="form-control"
                      placeholder="Giá tiền"
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="description">Mô tả đơn hàng</label>
                    <div style={{ height: "300px" }}>
                      <textarea
                        className="w-full form-control"
                        name=""
                        id="description"
                        placeholder="Mô tả đơn hàng"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="pt-4">
              <div className="mb-3 font-weight-bold">Thông tin người đặt</div>

              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="customer-name">Họ và tên</label>
                    <input
                      id="customer-name"
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="email">Email</label>

                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="phone-number">Số điện thoại</label>
                    <input
                      id="phone-number"
                      type="tel"
                      className="form-control"
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div className="col"></div>
                </div>
              </form>
            </div>

            <div className="mt-5 d-flex justify-content-center">
              <button className="btn btn-theme">Send messages</button>
            </div>
          </div>
        </div>

        <div className="col-4 pl-2">
          <div className="border rounded-12 p-3">123</div>
        </div>
      </div>
    </div>
  )
}
