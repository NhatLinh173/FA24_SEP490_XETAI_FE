import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
// ScrollToTop Area
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (
      location.pathname !== "/profile" &&
      !location.pathname.includes("/history-post") &&
      !location.pathname.includes("/trip/detail") &&
      !location.pathname.includes("/vehical/detail") &&
      !location.pathname.includes("/history-post-driver/detail") &&
      !location.pathname.includes("/vehical/add")
    ) {
      localStorage.removeItem("tabHistory");
    }
  }, [location]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (!location.pathname.includes("/dashboard-admin")) {
      localStorage.removeItem("tabAdmin");
    }
  }, [location]);

  return props.children;
};

export default withRouter(ScrollToTop);
