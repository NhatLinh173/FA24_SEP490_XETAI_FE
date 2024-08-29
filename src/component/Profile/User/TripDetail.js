// import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const TripDetail = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <div className="wrapper container">
      <div>
        <div>Khách thuê đã huỷ.</div>
        <div>Lý do: Thời gian chờ đợi lâu</div>
      </div>

      <div className="row">
        <div className="col-8 pr-2">
          <div className="border rounded-12 p-3">123</div>
        </div>

        <div className="col-4 pl-2">
          <div className="border rounded-12 p-3">123</div>
        </div>
      </div>
    </div>
  )
}
