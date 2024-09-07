import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom"
// Import Page Layout
import Navbar from "./component/Common/Navbar"
import Footer from "./component/Common/Footer"
import CopyRight from "./component/Common/CopyRight"
// Import All Components
import Home_One from "./page/indexPage"
import About from "./page/About"
import Service from "./page/Service"
import ServiceDetails from "./page/ServiceDetails"
import BlogGrid from "./page/BlogGrid"
import BlogWithSidebar from "./page/BlogWithSidebar"
import BlogDetails from "./page/BlogDetails"
import OurTeamArea from "./page/OurTeam"
import Testimonials from "./page/Testimonial"
import Gallery from "./page/Gallery"
import Faqs from "./page/Faqs"
import TrackYourShip from "./page/TrackYourShip"
import SignUp from "./page/SignUp"
import SignIn from "./page/SignIn"
import PrivacyPolicy from "./page/PrivacyPolicy"
import TermsCondition from "./page/TermsCondition"
import Error from "./page/Error"
import Contact from "./page/Contact"
import PricingContent from "./page/Pricing"
import RequestQuote from "./page/RequestQuote"
import AccountTypes from "./page/AccountTypes"
import Profile from "./page/Profile"
import CustomModal from "./component/modal-popup/CustomModal"
import ScrollToTop from "./component/ScrollToTop"
import useModal from "./hooks/useModal"
import SignUpCustomerPage from "./page/SignUpCustomerPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { TripDetail } from "./component/Profile/User/TripDetail"
const App = () => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <>
      <BrowserRouter>
        <Router>
          <ScrollToTop>
            <Navbar openModal={openModal} />
            <ToastContainer />
            <Switch>
              <Route path="/" exact component={Home_One} />
              <Route path="/about" exact component={About} />
              <Route path="/service" exact component={Service} />
              <Route path="/service_details" exact component={ServiceDetails} />
              <Route path="/blog_grid" exact component={BlogGrid} />
              <Route
                path="/blog_with_sidebar"
                exact
                component={BlogWithSidebar}
              />
              <Route path="/blog_details" exact component={BlogDetails} />
              <Route path="/our_team" exact component={OurTeamArea} />
              <Route path="/testimonials" exact component={Testimonials} />
              <Route path="/gallery" exact component={Gallery} />
              <Route path="/faqs" exact component={Faqs} />
              <Route path="/track_ship" exact component={TrackYourShip} />
              <Route path="/pricing" exact component={PricingContent} />
              <Route path="/request_quote" exact component={RequestQuote} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/signIn" exact component={SignIn} />
              <Route path="/privacyPolicy" exact component={PrivacyPolicy} />
              <Route path="/terms" exact component={TermsCondition} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/accountType" exact component={AccountTypes} />
              <Route path="/trip/detail/:id" exact component={TripDetail} />
              <Route
                path="/signUp-customer"
                exact
                component={SignUpCustomerPage}
              />
              <Route path="/error" exact component={Error} />
            </Switch>
            <Footer />
            <CopyRight />
            <CustomModal isOpen={isOpen} closeModal={closeModal} />
          </ScrollToTop>
        </Router>
      </BrowserRouter>
    </>
  )
}

export default App
