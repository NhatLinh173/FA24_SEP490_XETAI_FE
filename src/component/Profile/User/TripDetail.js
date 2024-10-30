import { useEffect, useMemo, useState } from "react"
import { CiStar } from "react-icons/ci"
import { FaCheck, FaStar } from "react-icons/fa"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { toast } from "react-toastify"
import axiosInstance from "../../../config/axiosConfig"
import { Rating } from "react-simple-star-rating"
import { jwtDecode } from "jwt-decode"
import TripCarousel from "./TripCarousel"

const TripDetail = () => {
  const [tripDetail, setTripDetail] = useState(null)
  const [rating, setRating] = useState(0) // Lưu trạng thái số sao được chọn
  const [hover, setHover] = useState(null) // Trạng thái sao khi người dùng hover
  const [feedback, setfeedback] = useState("")
  const [isShowModal, setIsShowModal] = useState(false)
  const [driver, setDriver] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post("/rating", {
        value: rating,
        comment: feedback,
        userId: driver,
        reviewerId: userId,
      })
      if (response.status === 200) {
        toast.success("Đánh giá tài xế thành công")
        setIsShowModal(false)
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!!")
    }
  }

  const handleRatingClick = (value) => {
    setRating(value)
  }

  const getTripHistoryDetail = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${id}`)
      setTripDetail(response.data)
      setDriver(response.data.dealId.driverId.userId._id)
      console.log(response)
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
              {/* <img
                src={tripDetail.images[0]}
                alt="car"
                className="rounded-12 cursor-pointer"
                style={{ width: "260px", height: "195px", objectFit: "cover" }}
              /> */}

              <TripCarousel
                images={tripDetail.images}
                imgStyle={{
                  width: "260px",
                  height: "195px",
                  objectFit: "cover",
                }}
              />

              <div className="ml-4 d-flex flex-column justify-content-center">
                <div className="mb-2">
                  <span className="font-weight-bold">
                    {tripDetail.startPointCity} - {tripDetail.destinationCity}
                  </span>
                </div>

                <button
                  className="my-2 btn-sm btn-success border-0 d-flex align-items-center"
                  style={{ width: "fit-content" }}
                >
                  <FaCheck className="mr-2" />
                  Đã giao hàng
                </button>

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
                  <div className="fs-20"></div>
                </div>

                <div className="ml-5">
                  <div className="fw-600">Thời gian kết thúc</div>
                  <div className="fs-20"></div>
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
                      defaultValue={`${tripDetail.startPoint}, ${tripDetail.startPointCity}`}
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
                      defaultValue={`${tripDetail.destination}, ${tripDetail.destinationCity}`}
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
              <div className="mb-3 font-weight-bold">Thông tin người nhận</div>

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

            <div className="pt-4">
              <div className="mb-3 font-weight-bold">Thông tin người đặt</div>

              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="customer-name">Họ và tên</label>
                    <input
                      id="customer-name"
                      defaultValue={tripDetail.fullname}
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
                      defaultValue={tripDetail.email}
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
                      defaultValue={tripDetail.phone}
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
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Gủi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-4 pl-2">
          <div className="border rounded-12 p-3">
            <div className="d-flex align-items-center border-bottom pt-2 pb-3">
              <img
                src={
                  isDriverRole
                    ? tripDetail.creator.avatar
                    : tripDetail.dealId.driverId.userId.avatar
                }
                className="border rounded-circle mr-3"
                style={{
                  width: "118px",
                  height: "118px",
                  objectFit: "cover",
                }}
                alt="avatar"
              />

              <div>
                <div className="fs-14 text-secondaryv">
                  {isDriverRole ? "Người tạo đơn" : "Tài xế"}
                </div>

                <div className="fw-600">
                  {isDriverRole
                    ? tripDetail.creator.fullName
                    : tripDetail.dealId.driverId.userId.fullName}
                </div>
                <tel className="fs-14 text-secondary">
                  {isDriverRole
                    ? tripDetail.creator.phone
                    : tripDetail.dealId.driverId.userId.phone}
                </tel>
                <div className="mb-2 fs-14 text-secondary">
                  {isDriverRole
                    ? tripDetail.creator.email
                    : tripDetail.dealId.driverId.userId.email}
                </div>
                <div>
                  <button onClick={handleFavoriteDriver}>Yêu Thích</button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between border-bottom py-3">
              <h5 className="font-weight-bold">Đánh giá</h5>
              <Rating initialValue={4} size={26} readonly />
            </div>

            <div className="mt-3">
              <div>
                <i>
                  "Dịch vụ chất lượng tuyệt vời, thời gian giao rất nhanh, hơn
                  cả những gì tôi mong đợi"
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetail
