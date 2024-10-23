import { useEffect, useMemo, useState } from "react"
import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { toast } from "react-toastify"
import axiosInstance from "../../../config/axiosConfig"
import { Rating } from "react-simple-star-rating"
import { jwtDecode } from "jwt-decode"

const TripDetail = () => {
  const [tripDetail, setTripDetail] = useState(null)
  const [rating, setRating] = useState(0) // Lưu trạng thái số sao được chọn
  const [hover, setHover] = useState(null) // Trạng thái sao khi người dùng hover
  const [feedback, setfeedback] = useState("")
  const [isShowModal, setIsShowModal] = useState(false)
  const [isEditRating, setIsEditRating] = useState(true)

  const role = localStorage.getItem("accessToken")
    ? jwtDecode(localStorage.getItem("accessToken")).role
    : ""

  const isDriverRole = useMemo(
    () => role === "personal" || role === "business",
    [role]
  )

  const { id } = useParams()
  const driverId = localStorage.getItem("driverId")
  const userId = localStorage.getItem("userId")

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

  const handleOpenModal = () => {
    setIsShowModal(true)
  }

  const handleCloseModal = () => {
    setIsShowModal(false)
  }

  const handleFeedback = (e) => {
    setfeedback(e.target.value)
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axiosInstance.post("/rating", {
  //       userId: 12312321,
  //       rating: rating,
  //       reviewerId: reviewerId,
  //       comment: feedback,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRatingClick = (value) => {
    setRating(value)
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
      setTripDetail(response.data)
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

                <div className="mt-2">
                  <button
                    type="button"
                    class="btn btn-theme "
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={handleOpenModal}
                  >
                    Đánh giá
                  </button>
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

        {isShowModal && (
          <div
            class="modal fade show"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content ">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Đánh giá chuyến hàng
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body flex-column">
                  <div className="">
                    <div className="d-flex justify-content-center mb-3">
                      {[...Array(5)].map((star, index) => {
                        const value = index + 1
                        return (
                          <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => handleRatingClick(value)}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(null)}
                          >
                            {value <= (hover || rating) ? (
                              <FaStar size={30} color="yellow" /> // Ngôi sao màu trắng trên nền vàng
                            ) : (
                              <CiStar size={30} color="#000" /> // Ngôi sao rỗng màu đen
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <textarea
                    className="form-control"
                    placeholder="Đánh giá"
                    rows="4"
                    value={feedback}
                    onChange={handleFeedback}
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    Đóng
                  </button>
                  <button type="button" class="btn btn-primary">
                    Gủi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-4 pl-2">
          <div className="border rounded-12 p-3">
            <div className="d-flex justify-content-between border-bottom pb-3">
              <h5 className="font-weight-bold">Đánh giá</h5>
              <Rating
                onClick={handleRatingClick}
                initialValue={rating}
                size={26}
                readonly={isDriverRole || !isEditRating}
              />
            </div>

            <div className="mt-3">
              {isDriverRole ? (
                <div>
                  <i>
                    Dịch vụ chất lượng tuyệt vời, thời gian giao rất nhanh, hơn
                    cả những gì tôi mong đợi
                  </i>
                </div>
              ) : (
                <div>
                  <textarea
                    className="form-control"
                    disabled={!isEditRating}
                    rows={7}
                    placeholder="Vui lòng điền đánh giá của bạn"
                  ></textarea>

                  <div className="mt-3 d-flex justify-content-center">
                    <button
                      className="btn btn-theme"
                      onClick={() => setIsEditRating(!isEditRating)}
                    >
                      {isEditRating ? "Gửi đánh giá" : "Chỉnh sửa"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetail
