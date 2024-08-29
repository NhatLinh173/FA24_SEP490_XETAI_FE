import React, { useState } from "react"
import ProfileUser from "./ProfileUser"
import Tab from "./Tab"
import ChangePassWord from "./ChangePassWord"
import { TripHistory } from "./TripHistory"

const DashboardProfile = () => {
  const [tab, setTab] = useState("profile")
  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Tab tab1={tab} setTab1={setTab} />
          </div>
          <div className="col-9">
            {tab === "profile" && <ProfileUser />}
            {tab === "changePassword" && <ChangePassWord />}
            {tab === "tripHistory" && <TripHistory />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfile
