import React, { useState, useEffect } from "react"
import ProfileUser from "./ProfileUser"
import useInstanceData from "../../../config/useInstanceData"
import Tab from "./Tab"
import ChangePassWord from "./ChangePassWord"
import FavoriteDriver from "./FavoriteDriver"
import Wallet from "./Wallet"
import Vehicals from "./Vehicals"
import { useLocation } from "react-router-dom"
import { TripHistory } from "./TripHistory"
import HistoryPost from "./HistoryPost"


const DashboardProfile = () => {
  const location = useLocation()
  const [tab, setTab] = useState("profile")
  const userId = localStorage.getItem("userId")
  const { data, loading, error, refetch } = useInstanceData(
    `/auth/user/${userId}`
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tabParam = params.get("tab")
    console.log("Tab Param:", tabParam)
    if (tabParam) {
      setTab(tabParam)
    } else {
      setTab("profile")
    }
  }, [location])

  useEffect(() => {
    if (data && data.avatar) {
      console.log("Avatar Data:", data.avatar)
      localStorage.setItem("avatar", data.avatar)
    }
  }, [data])

  if (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading data</div>
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Tab tab1={tab} setTab1={setTab} />
          </div>
          <div className="col-9">
            {tab === "profile" && <ProfileUser data={data} refetch={refetch} />}
            {tab === "changePassword" && <ChangePassWord />}
            {tab === "wallet" && <Wallet data={data} />}
            {tab === "tripHistory" && <TripHistory />}
            {tab === "historyPost" && <HistoryPost />}
            {tab === "favoriteDriver" && <FavoriteDriver />}
            {tab === "vehicals" && <Vehicals />}

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfile