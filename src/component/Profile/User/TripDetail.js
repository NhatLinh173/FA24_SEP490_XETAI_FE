import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import axiosInstance from "../../../config/axiosConfig"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const TripDetail = () => {
  const { id } = useParams()
  const driverId = localStorage.getItem("driverId")
  const userId = localStorage.getItem("userId")
  const [tripDetail, setTripDetail] = useState(null)

  const handleFavoriteDriver = async () => {
    try {
      const response = await axiosInstance.post("/favorites/add", {
        driverId,
        userId,
      })
      if (response.status === 200) {
        toast.success("Đã thêm tài xế vào danh sách yêu thích")
      } else {
        toast.error("Thêm tài xế vào danh sách yêu thích thất bại")
      }
    } catch (error) {
      console.error("Error adding favorite driver:", error)
      toast.error("Có lỗi xảy ra khi thêm tài xế vào danh sách yêu thích.")
    }
  }

  const DUMMY_DATA = {
    trip_name: "Đà Nẵng - Hải Phòng",
    status: 1,
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
    wait: "Đang chờ",
    approve: "Đã giao",
    inprogress: "Đang giao",
    finish: "Đã giao",
    cancel: "Đã Huỷ",
    hide: "Ẩn",
  }

  const STATUS_BADGE_CLASS = {
    wait: "status-wait", // "Đang chờ" - waiting
    approve: "status-approve", // "Đã giao" - approved
    inprogress: "status-inprogress", // "Đang giao" - in progress
    finish: "status-finish", // "Đã giao" - finished (may be considered as secondary)
    cancel: "status-cancel", // "Đã Huỷ" - canceled
    hide: "status-hide", // "Ẩn" - hidden
  }

  const getTripHistoryDetail = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${id}`)
      // setCurrentPageItems(
      //   response.data.salePosts.slice(offset, offset + itemPerPage)
      // )
      setTripDetail(response.data)
      console.log(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    getTripHistoryDetail()
  }, [])

  if (!tripDetail) return <div>Không có data</div>

  return (
    <div className="wrapper container pb-5">
      <div className="row">
        <div className="col-8 pr-2">
          <div className="border rounded-12 p-3">
            <div className="d-flex border-bottom pb-3">
              <img
                src="https://bizweb.dktcdn.net/100/084/618/products/ben-howo-3-chan-ban-full-nhap-khau.jpg?v=1629107651767"
                alt="car"
                className="rounded-12 cursor-pointer"
                style={{ width: "260px", height: "195px", objectFit: "cover" }}
              />

              <div className="ml-4 d-flex flex-column justify-content-center">
                <div className="mb-2">
                  <span className="font-weight-bold">
                    {tripDetail.startPointCity} - {tripDetail.destinationCity}
                  </span>
                </div>

                <div
                  className={`mb-3 fs-12 status-badge ${
                    STATUS_BADGE_CLASS[tripDetail.status]
                  }`}
                >
                  {STATUS[tripDetail.status]}
                </div>

                <div className="fs-12 text-secondary">
                  {`Địa chỉ nhận hàng: ${tripDetail.destination} - ${tripDetail.destinationCity}`}
                </div>
              </div>
            </div>

            <div className="pt-3">
              <div className="mb-3 font-weight-bold">Thời gian giao hàng</div>

              <div className="d-flex">
                <div>
                  <div className="fw-600">Thời gian khởi hành</div>
                  <div className="fs-20">{DUMMY_DATA.estimate_start_time}</div>
                </div>

                <div className="ml-5">
                  <div className="fw-600">Thời gian kết thúc</div>
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
                      defaultValue={tripDetail.title}
                      type="text"
                      className="form-control"
                      placeholder="Loại hàng"
                      readOnly
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="deliver_address">Giá tiền</label>
                    <input
                      id="deliver_address"
                      defaultValue={`${tripDetail.price.toLocaleString()} VND`}
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
                      defaultValue={tripDetail.startPointCity}
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
                      defaultValue={tripDetail.destinationCity}
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
                      defaultValue={tripDetail.load}
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
                        defaultValue={tripDetail.detail}
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
                      defaultValue={tripDetail.recipientName}
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
                      defaultValue={tripDetail.recipientEmail}
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
                      defaultValue={tripDetail.recipientPhone}
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
          <div className="border rounded-12 p-3">
            <div>
              <div className="d-flex align-items-center border-bottom pt-2 pb-3">
                <img
                  src="https://bizweb.dktcdn.net/100/084/618/products/ben-howo-3-chan-ban-full-nhap-khau.jpg?v=1629107651767"
                  className="border rounded-circle mr-3"
                  style={{
                    width: "118px",
                    height: "118px",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />

                <div>
                  <div className="fs-14 text-secondaryv">Tài xế</div>
                  <div className="fw-600">Nguyễn Xuân Tùng</div>
                  <tel className="fs-14 text-secondary">0987654321</tel>
                  <div>
                    <button onClick={handleFavoriteDriver}>Yêu Thích</button>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <div className="pb-3 fw-600">Bảng tính giá</div>

                <div className="mb-3 d-flex justify-content-between">
                  <span>Tên người nhận hàng</span>
                  <span className="fw-600">{tripDetail.recipientName}</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span>SĐT người nhận</span>
                  <span className="fw-600">{tripDetail.recipientPhone}</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span>Địa chỉ nhận Hàng</span>
                  <span className="fw-600">Đà Nẵng</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span>Địa chỉ giao hàng</span>
                  <span className="fw-600">Hải Phòng</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span>Loại hàng</span>
                  <span className="fw-600">Điện tử</span>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <span>Đơn giá hàng</span>
                  <span className="fw-600">803,600 VND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetail
