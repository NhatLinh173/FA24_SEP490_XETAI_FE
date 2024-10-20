import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/Common/Navbar";
import Footer from "./component/Common/Footer";
import CopyRight from "./component/Common/CopyRight";

import Home_One from "./page/indexPage";
import About from "./page/About";
import Service from "./page/Service";
import ServiceDetail from "./component/Common/Service/ServiceDetail";
import ServiceDetails from "./page/ServiceDetails";
import BlogGrid from "./page/BlogGrid";
import BlogWithSidebar from "./page/BlogWithSidebar";
import BlogDetails from "./page/BlogDetails";
import BlogDetail from "./component/BlogDetails/BlogDetail";
import OurTeamArea from "./page/OurTeam";
import Testimonials from "./page/Testimonial";
import Gallery from "./page/Gallery";
import Faqs from "./page/Faqs";
import TrackYourShip from "./page/TrackYourShip";
import SignUp from "./page/SignUp";
import SignIn from "./page/SignIn";
import PrivacyPolicy from "./page/PrivacyPolicy";
import TermsCondition from "./page/TermsCondition";
import Error from "./page/Error";
import Contact from "./page/Contact";
import PricingContent from "./page/Pricing";
import RequestQuote from "./page/RequestQuote";
import AccountTypes from "./page/AccountTypes";
import Profile from "./page/Profile";
import CustomModal from "./component/modal-popup/CustomModal";
import ScrollToTop from "./component/ScrollToTop";
import useModal from "./hooks/useModal";
import SignUpCustomerPage from "./page/SignUpCustomerPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import { setLogoutCallback } from "../src/config/axiosConfig";
import FavoriteDrivers from "./page/FavoriteDrivers";
import DriverDetail from "./component/Profile/User/DriverDetail";
import TripDetail from "./component/Profile/User/TripDetail";
import HistoryPostDetail from "./component/Profile/User/HistoryPostDetail";
import PaymentSuccess from "./component/PaymentStatus/PaymentSuccess";
import PaymentFailed from "./component/PaymentStatus/PaymentFailed";
import Chat from "./component/Chat/chat";
import VehicalDetail from "./component/Profile/User/VehicalDetail";
import { WebSocketProvider } from "./hooks/WebSocketContext";
import VehicalAdd from "./component/Profile/User/VehicalAdd";
import ProtectedRoute from "./config/checkRole";
import AdminDashboard from "../src/component/Admin/adminDashboard";

const App = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { handleLogout } = useAuth();

  return (
    <WebSocketProvider>
      <Router>
        <ScrollToTop>
          <Navbar openModal={openModal} />
          <Switch>
            <Route path="/" exact component={Home_One} />
            <Route path="/about" exact component={About} />
            <Route path="/service" exact component={Service} />
            <Route path="/service/:id" extract component={ServiceDetail} />
            <Route
              path="/history-post/:id"
              extract
              component={HistoryPostDetail}
            />
            <Route path="/service_details" exact component={ServiceDetails} />
            <Route path="/blog_grid" exact component={BlogGrid} />
            <Route
              path="/blog_with_sidebar"
              exact
              component={BlogWithSidebar}
            />
            <Route path="/blog_details" exact component={BlogDetails} />
            <Route path="/blog/:id" extract component={BlogDetail} />
            <Route path="/our_team" exact component={OurTeamArea} />
            <Route path="/testimonials" exact component={Testimonials} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/faqs" exact component={Faqs} />
            <Route path="/track_ship" exact component={TrackYourShip} />
            <Route path="/pricing" exact component={PricingContent} />
            <ProtectedRoute
              path="/request_quote"
              exact
              component={RequestQuote}
              allowedRoles={["customer"]}
            />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/privacyPolicy" exact component={PrivacyPolicy} />
            <Route path="/terms" exact component={TermsCondition} />
            <Route path="/contact" exact component={Contact} />
            <ProtectedRoute
              path="/profile"
              exact
              component={Profile}
              allowedRoles={["customer", "personal", "business  "]}
            />
            <Route path="/accountType" exact component={AccountTypes} />
            <Route
              path="/signUp-customer"
              exact
              component={SignUpCustomerPage}
            />
            <Route path="/error" exact component={Error} />
            <Route path="/favorite-drivers" exact component={FavoriteDrivers} />
            <Route path="/driver/:id" exact component={DriverDetail} />
            <Route path="/trip/detail/:id" exact component={TripDetail} />
            <Route path="/payment/success" exact component={PaymentSuccess} />
            <Route path="/payment/failed" exact component={PaymentFailed} />
            <Route path="/chat" exact component={Chat} />
       
            <Route path="/vehical/detail/:id" exact component={VehicalDetail} />
            <Route path="/vehical/add" exact component={VehicalAdd} />
            <Route path="/dashboard-admin" exact component={AdminDashboard} />
          </Switch>
          <Footer />
          <CopyRight />
          <CustomModal isOpen={isOpen} closeModal={closeModal} />
        </ScrollToTop>
      </Router>
      <ToastContainer />
    </WebSocketProvider>
  );
};

export default App;
