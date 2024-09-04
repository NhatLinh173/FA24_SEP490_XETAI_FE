import React, { useState } from "react";
import ProfileUser from "./ProfileUser";
import useInstanceData from "../../../config/useInstanceData";
import Tab from "./Tab";
import ChangePassWord from "./ChangePassWord";
import Wallet from "./Wallet";
const DashboardProfile = () => {
  const [tab, setTab] = useState("profile");
  const userId = localStorage.getItem("userId");
  const { data, loading, error, refetch } = useInstanceData(
    `/auth/user/${userId}`
  );
  console.log(data);

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
            {tab === "wallet" && <Wallet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
