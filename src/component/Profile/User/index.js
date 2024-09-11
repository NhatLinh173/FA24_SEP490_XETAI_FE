import React, { useState, useEffect } from "react";
import ProfileUser from "./ProfileUser";
import useInstanceData from "../../../config/useInstanceData";
import Tab from "./Tab";
import ChangePassWord from "./ChangePassWord";
import Wallet from "./Wallet";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DashboardProfile = () => {
  const [tab, setTab] = useState("profile");
  const userId = localStorage.getItem("userId");
  const { data, loading, error, refetch } = useInstanceData(
    `/auth/user/${userId}`
  );

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Tab tab1={tab} setTab1={setTab} />
          </div>
          <div className="col-9">
            {tab === "profile" && <ProfileUser data={data} />}
            {tab === "changePassword" && <ChangePassWord />}
            {tab === "wallet" && <Wallet data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
