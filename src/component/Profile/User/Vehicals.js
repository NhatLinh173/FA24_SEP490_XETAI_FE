import { useState } from "react"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const DUMMY_DATA = [
  {
    id: 15,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 70,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 80,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 82,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 37,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 70,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 4,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 88,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 43,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 18,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 23,
    name: "Toyota",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
]

const Vehicals = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const itemPerPage = 5
  const offset = currentPage * itemPerPage
  const currentPageItems = DUMMY_DATA.slice(offset, offset + itemPerPage)

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }
  return (
    <div>
      <div className="mb-4 d-flex justify-content-between">
        <h2>Xe của tôi</h2>

        <button className="btn btn-theme">Thêm xe mới</button>
      </div>

      {currentPageItems.map((item) => (
        <div key={item.id} className="my-4 border rounded-12">
          <Link
            to={`vehical/detail/${item.id}`}
            relative="path"
            className="link-wrapper"
          >
            <div className="p-3 d-flex">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-12 cursor-pointer"
                style={{ width: "360px", height: "195px", objectFit: "cover" }}
              />

              <div className="ml-3">
                <div className="mb-4 fs-18 font-weight-bold">{item.name}</div>
                <div className="mb-2 text-secondary">
                  Biển số: {item.license_plate_number}
                </div>

                <div className="mb-2 text-secondary">
                  Trọng tải: {item.weight_capacity} Tấn
                </div>

                <div className="font-weight-bold">
                  Ngày đăng kiểm: {item.registration_date}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <ReactPaginate
        pageCount={Math.ceil(DUMMY_DATA.length / itemPerPage)}
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

export default Vehicals
