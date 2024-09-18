import { useState } from "react"
import ReactPaginate from "react-paginate"

const dummyData = [
  {
    id: 251,
    name: "Đà Nẵng - Hải Phòng",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Nellie Thompson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/ben-howo-3-chan-ban-full-nhap-khau.jpg?v=1629107651767",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 261,
    name: "Hà Nội - Huế",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Douglas Murray",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-tai-thung-howo-5-chan-howotruck-vn.jpg?v=1463814767190",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 241,
    name: "Sài Gòn - Cần Thơ",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Mae Marshall",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 8,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 7,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 6,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 5,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 4,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 3,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 2,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
  {
    id: 1,
    name: "Bình Dương - Phú Yên",
    start_time: "08:30 - Chủ nhật, 30/06/2024",
    end_time: "20:00 - Chủ nhật, 30/06/2024",
    renter: "Ida Benson",
    total_money: 755700,
    image:
      "https://bizweb.dktcdn.net/100/084/618/products/xe-dogn-lanh-t5g-howo-8x4-howotruck-vn.jpg?v=1464575409727",
    status: "Khách thuê đã huỷ",
    status_time: "07:35, 30/06/2024",
  },
]

export const TripHistory = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const itemPerPage = 5

  const offset = currentPage * itemPerPage
  const currentPageItems = dummyData.slice(offset, offset + itemPerPage)

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  return (
    <div className="delivery-history-list">
      <h2 className="mb-4">Lịch sử chuyến</h2>

      {currentPageItems.map((item) => (
        <div key={item.id} className="my-4 border rounded-12">
          <div className="p-3 d-flex">
            <a href={`/trip/detail/${item.id}`} rel="noreferrer">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-12 cursor-pointer"
                style={{ width: "360px", height: "195px", objectFit: "cover" }}
              />
            </a>

            <div className="ml-3">
              <div className="mb-4 fs-18 font-weight-bold">{item.name}</div>
              <div className="mb-2 text-secondary">
                Bắt đầu: {item.start_time}
              </div>

              <div className="mb-2 text-secondary">
                Kết thúc: {item.end_time}
              </div>

              <div className="mb-4 text-secondary">
                Nhân viên giao hàng: {item.renter}
              </div>

              <div className="fs-18 font-weight-bold">
                Tổng tiền: {item.total_money.toLocaleString()} vnd
              </div>
            </div>
          </div>
        </div>
      ))}

      <ReactPaginate
        pageCount={Math.ceil(dummyData.length / itemPerPage)}
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
