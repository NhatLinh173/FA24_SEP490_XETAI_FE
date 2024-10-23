import { useEffect, useMemo, useState } from "react"
import ReactPaginate from "react-paginate"
import axiosInstance from "../../../config/axiosConfig"

export const TripHistory = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [tripHistories, setTripHistories] = useState([])

  const userId = localStorage.getItem("userId")

  const itemPerPage = 5

  const offset = currentPage * itemPerPage

  const currentPageItems = tripHistories.slice(offset, offset + itemPerPage)

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  const getTripHistory = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${userId}/users/history`)
      setTripHistories(response.data.salePosts)
    } catch (error) {}
  }

  useEffect(() => {
    getTripHistory()
  }, [])

  if (!tripHistories.length)
    return (
      <div className="mt-5 text-center font-weight-bold">Không có data</div>
    )

  return (
    <div className="delivery-history-list">
      <h2 className="mb-4">Lịch sử chuyến</h2>

      {currentPageItems.map((item) => (
        <div key={item._id} className="my-4 border rounded-12 item-card">
          <a
            href={`/trip/detail/${item._id}`}
            rel="noreferrer"
            className="link-wrapper"
          >
            <div className="p-3 d-flex">
              <img
                src={
                  item.images.length
                    ? item.images[0]
                    : "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                }
                alt={item.title}
                className="rounded-12 cursor-pointer"
                style={{ width: "360px", height: "195px", objectFit: "cover" }}
              />

              <div className="ml-3">
                <div className="mb-1 fs-18 font-weight-bold">
                  Điểm đi: {item.startPointCity}
                </div>
                <div className="mb-2 fs-18 font-weight-bold">
                  Điểm đến: {item.destinationCity}
                </div>

                <div className="mb-2 text-secondary">
                  Bắt đầu: {item.start_time}
                </div>

                <div className="mb-2 text-secondary">
                  Kết thúc: {item.end_time}
                </div>

                <div className="mb-3 text-secondary">
                  Nhân viên giao hàng: {item.fullname}
                </div>

                <div className="fs-18 font-weight-bold total-amount">
                  Tổng tiền: {Number(item.price).toLocaleString()} VND
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}

      <ReactPaginate
        pageCount={Math.ceil(tripHistories.length / itemPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        previousLabel={"<<"}
        nextLabel={">>"}
      />
    </div>
  )
}
