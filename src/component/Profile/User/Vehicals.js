import { useMemo, useState } from "react"
import { MdDelete } from "react-icons/md"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { toast } from "react-toastify"

const DUMMY_DATA = [
  {
    id: 15,
    name: "Derrick",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 70,
    name: "Austin",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 80,
    name: "Leon",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 82,
    name: "Ian",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 37,
    name: "Luke",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 70,
    name: "Edward",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 4,
    name: "Blanche",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 88,
    name: "Ethel",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 43,
    name: "Lola",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 18,
    name: "James",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
  {
    id: 23,
    name: "Lina",
    image:
      "https://cdn.tuoitre.vn/zoom/700_390/2022/12/2/renazzo-lamborghini-urus-performante-unveiled-thailand-motor-expo-2022-7-16699859694741013805461-crop-16699861242161368888932.jpg",
    license_plate_number: "59-V1 793.79",
    weight_capacity: "2",
    registration_date: "10/09/2023",
  },
]

const Vehicals = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const itemPerPage = 5
  const offset = currentPage * itemPerPage
  const currentPageItems = DUMMY_DATA.slice(offset, offset + itemPerPage)

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  const selectedName = useMemo(() => {
    const findedItem = DUMMY_DATA.find((item) => item.id === selectedId)
    if (!findedItem) return ""

    return findedItem.name
  }, [selectedId])

  const onConfirmDelete = (event, selectedId) => {
    event.preventDefault()
    setSelectedId(selectedId)
    setIsVisible(true)
  }

  const onCloseModal = () => {
    setIsVisible(false)
  }

  const onDelete = () => {
    setIsVisible(false)

    toast.success(`Xóa thành công ${selectedName}`)
  }

  return (
    <div>
      <div className="mb-4 d-flex justify-content-between">
        <h2>Xe của tôi</h2>

        <Link to="/vehical/add" className="btn btn-theme">
          Thêm xe mới
        </Link>
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
                style={{ width: "310px", height: "160px", objectFit: "cover" }}
              />

              <div className="ml-3">
                <div className="mb-4">{item.name}</div>

                <div className="mb-2">Biển số: {item.license_plate_number}</div>

                <div className="mb-2">
                  Trọng tải: {item.weight_capacity} Tấn
                </div>

                <div className="">Ngày đăng kiểm: {item.registration_date}</div>
              </div>

              <div
                style={{
                  alignSelf: "center",
                  flex: 1,
                  justifySelf: "right",
                  textAlign: "end",
                }}
              >
                <button
                  className="btn-danger btn-sm align-self-start border-0"
                  onClick={(event) => onConfirmDelete(event, item.id)}
                >
                  <MdDelete />
                </button>
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

      {isVisible && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Xác nhận xóa
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onCloseModal}
                ></button>
              </div>

              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa xe {selectedName} không?</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onCloseModal}
                >
                  Đóng
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onDelete}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vehicals
