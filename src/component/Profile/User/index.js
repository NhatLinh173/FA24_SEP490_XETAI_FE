import React, { useState, useEffect } from "react";
import ProfileUser from "./ProfileUser";
import useInstanceData from "../../../config/useInstanceData";
import Tab from "./Tab";
import ChangePassWord from "./ChangePassWord";
import FavoriteDriver from "./FavoriteDriver";
import Wallet from "./Wallet";
import HistoryPost from "./HistoryPost";
import { TripHistory } from "./TripHistory";

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
            {tab === "profile" && <ProfileUser data={data} refetch={refetch} />}
            {tab === "changePassword" && <ChangePassWord />}

            {tab === "wallet" && <Wallet data={data} />}

            {tab === "tripHistory" && <TripHistory />}
            {tab === "favoriteDriver" && <FavoriteDriver />}
            {tab === "historyPost" && <HistoryPost />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
