import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const TripDetail = () => {
  const { id } = useParams()
  console.log(id)

  const DUMMY_DATA = {
    trip_name: "Đà Nẵng - Hải Phòng",
    status: 0,
    address: "Quận Thanh Khuê - Đà Nẵng",
    estimate_start_time: "08:30 - 30/06/2024",
    estimate_end_time: "08:30 - 30/06/2024",
    category: "Hàng cồng kềnh",
    amount: 400000,
    receive_address: "Đà Nẵng",
    delivery_address: "Hải Phòng",
    total_weight: 300,
    description: "Đây là mô tả",
    customer_name: "Nguyen Van A",
    email: "vana@gmail.com",
    phone_number: "098765432",
  }

  const STATUS = {
    0: "Chưa bắt đầu",
    1: "Đang giao",
  }

  const STATUS_BADGE_CLASS = {
    0: "badge-warning",
    1: "badge-info",
  }

  return (
    <div className="wrapper container pb-5">
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
                  <span className="font-weight-bold">
                    {DUMMY_DATA.trip_name}
                  </span>
                </div>

                <div
                  className={`mb-3 fs-12 ${
                    STATUS_BADGE_CLASS[DUMMY_DATA.status]
                  }`}
                >
                  {STATUS[DUMMY_DATA.status]}
                </div>

                <div className="fs-12 text-secondary">
                  Địa chỉ nhận hàng: {DUMMY_DATA.address}
                </div>
              </div>
            </div>

            <div className="pt-3">
              <div className="mb-3 font-weight-bold">Thời gian giao hàng</div>

              <div className="d-flex">
                <div>
                  <div className="fw-600">Dự kiến khởi hành</div>
                  <div className="fs-20">{DUMMY_DATA.estimate_start_time}</div>
                </div>

                <div className="ml-5">
                  <div className="fw-600">Dự kiến kết thúc</div>
                  <div className="fs-20">{DUMMY_DATA.estimate_end_time}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 mb-3">
              <div className="mb-3 font-weight-bold">Đơn hàng</div>

              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="category">Loại hàng</label>
                    <input
                      id="category"
                      defaultValue={DUMMY_DATA.category}
                      type="text"
                      className="form-control"
                      placeholder="Loại hàng"
                      readOnly
                    />
                  </div>

                  <div className="col">
                    {/* <label htmlFor="car">Loại xe</label>

                    <div>
                      <select id="car" className="form-select rounded w-full">
                        <option value="1">Mazda</option>
                        <option value="1">Wave</option>
                      </select>
                    </div> */}
                    <label htmlFor="deliver_address">Giá tiền</label>
                    <input
                      id="deliver_address"
                      defaultValue={`${DUMMY_DATA.amount.toLocaleString()} vnd`}
                      type="text"
                      className="form-control"
                      placeholder="Giá tiền"
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="address">Địa chỉ nhận hàng</label>
                    <input
                      id="address"
                      defaultValue={DUMMY_DATA.receive_address}
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ nhận hàng"
                      readOnly
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="deliver_address">Địa chỉ giao hàng</label>
                    <input
                      id="deliver_address"
                      defaultValue={DUMMY_DATA.delivery_address}
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ giao hàng"
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="address">Tổng trọng lượng (KG)</label>
                    <input
                      id="address"
                      defaultValue={DUMMY_DATA.total_weight}
                      type="number"
                      className="form-control"
                      placeholder="Tổng trọng lượng (KG)"
                      readOnly
                    />
                  </div>

                  <div className="col"></div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="description">Mô tả đơn hàng</label>
                    <div style={{ height: "300px" }}>
                      <textarea
                        id="description"
                        defaultValue={DUMMY_DATA.description}
                        className="w-full form-control"
                        placeholder="Mô tả đơn hàng"
                        readOnly
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
                      defaultValue={DUMMY_DATA.customer_name}
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      readOnly
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="email">Email</label>

                    <input
                      id="email"
                      defaultValue={DUMMY_DATA.email}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label htmlFor="phone-number">Số điện thoại</label>
                    <input
                      id="phone-number"
                      defaultValue={DUMMY_DATA.phone_number}
                      type="tel"
                      className="form-control"
                      placeholder="Số điện thoại"
                      readOnly
                    />
                  </div>

                  <div className="col"></div>
                </div>
              </form>
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