import axios from "axios"
import React, { useEffect, useState } from "react"
import { TbTransfer } from "react-icons/tb"
import Select from "react-select"
import { toast } from "react-toastify"
import axiosInstance from "../../../config/axiosConfig"

const GetSchedule = () => {
  const [provinces, setProvinces] = useState(null)
  const [startPoint, setStartPoint] = useState("")
  const [destination, setDestination] = useState("")

  const getProvinces = async () => {
    try {
      const result = await axios.get(
        "https://provinces.open-api.vn/api/?depth=1"
      )

      const transformedData = result.data.map((item) => ({
        value: item.code,
        label: item.name,
      }))

      setProvinces(transformedData)
    } catch (error) {
      console.log(error)
    }
  }

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: "250px",
      boxShadow: "none",
      border: "1px solid hsl(0, 0%, 80%)",
      ":hover": {
        borderColor: "#EC0101",
      },
    }),
  }

  const onSearch = async (event) => {
    event.preventDefault()

    if (!startPoint.length || !destination.length) {
      toast.info("Vui lòng chọn điểm xuất phát và điểm đến!")
      return
    }

    try {
      await axiosInstance(
        `/search?startPoint=${startPoint}&destination=${destination}`
      )
    } catch (error) {}
  }

  useEffect(() => {
    getProvinces()
  }, [])

  if (!provinces) {
    return <div>Loading...</div>
  }

  return (
    <>
      <section id="schedule_one">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mt-5 d-flex justify-content-center">
                <div className="search-overlay-form">
                  <form id="home-search-input">
                    <div>
                      <Select
                        options={provinces}
                        styles={colourStyles}
                        placeholder="Chọn tỉnh/thành phố"
                        onChange={(data) => {
                          setStartPoint(data.label)
                        }}
                      />
                    </div>

                    <TbTransfer size={25} />

                    <Select
                      options={provinces}
                      styles={colourStyles}
                      placeholder="Chọn tỉnh/thành phố"
                      onChange={(data) => {
                        setDestination(data.label)
                      }}
                    />

                    <div>
                      <button type="submit" onClick={onSearch}>
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GetSchedule
