import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import FormInput from "../Common/FormInput";
import axios from "axios";
import { toast } from "react-toastify";
import regexPattern from "../../config/regexConfig";
const SignUpForm = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFulltName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameCompany, setNameCompany] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3005/",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type") || "personal";
    setActiveTab(type);
  }, [location]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    history.push(`/signup?type=${tab}`);
  };

  const validateField = (field, value) => {
    if (!regexPattern[field].test(value)) {
      toast.warn(`Trường ${value} không đúng định dạng`);
      return false;
    }
    return true;
  };

  const handleRegisterDriver = async () => {
    const role = activeTab === "personal" ? "personal" : "business";

    // if (!validateField("fullName", fullName)) return;
    // if (!validateField("email", email)) return;
    // if (!validateField("password", password)) return;
    // if (!validateField("phone", phone)) return;
    // if (!validateField("Name Company", nameCompany)) return;

    const payloadPersonnal = {
      email,
      password,
      phone,
      fullName,
      role: role,
    };

    const payloadBusiness = {
      password,
      phone,
      companyName: nameCompany,
      email,
      fullName,
      role: role,
    };

    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện");
      return;
    }

    if (!email || !password) {
      toast.warn("Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    if (role === "personal") {
      try {
        const response = await axiosInstance.post(
          "/auth/register",
          payloadPersonnal
        );
        if (response.status === 201) {
          toast.success("Đăng ký thành công");
          setTimeout(() => {
            history.push("/");
          }, 200);
        } else {
          toast.error("Đăng ký thất bại");
          return;
        }
      } catch (error) {
        console.error("Register error:", error);
      }
    } else if (role === "business") {
      try {
        const response = await axiosInstance.post(
          "/auth/register",
          payloadBusiness
        );
        if (response.status === 201) {
          toast.success("Đăng ký thành công");
          history.push("/");
        } else {
          toast.error("Đăng ký thất bại");
          return;
        }
      } catch (error) {
        console.error("Register error:", error);
      }
    }
  };

  const handleGoogleLogin = () => {
    const role = activeTab === "personal" ? "personal" : "business";
    const url = `http://localhost:3005/auth/google?state=${role}`;
    console.log("Redirecting to:", url);
    window.open(url, "_self");
  };

  const handleFacebookLogin = () => {
    const role = "customer";
    const url = `http://localhost:3005/auth/facebook?state=${role}`;

    window.open(url, "_self");
  };

  return (
    <section id="signIn_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
            <div className="user_area_wrapper">
              <h2>
                {activeTab === "personal"
                  ? "Đăng Ký Cá Nhân"
                  : "Đăng Ký Doanh Nghiệp"}
              </h2>
              <div className="form-tabs">
                <a
                  type="button"
                  className={`btn ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("personal")}
                >
                  Cá Nhân
                </a>
                <a
                  type="button"
                  className={`btn ${activeTab === "business" ? "active" : ""}`}
                  onClick={() => handleTabSwitch("business")}
                >
                  Doanh Nghiệp
                </a>
              </div>
              <div className="user_area_form">
                <form
                  id="form_signIn"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegisterDriver();
                  }}
                >
                  <div className="row">
                    {activeTab === "personal" ? (
                      <>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"firstName"}
                            classes={"form-control"}
                            placeholder={"Họ và Tên"}
                            value={fullName}
                            onChange={(e) => setFulltName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"email"}
                            name={"email"}
                            classes={"form-control"}
                            placeholder={"Địa Chỉ Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"tel"}
                            name={"phone"}
                            classes={"form-control"}
                            placeholder={"Số Điện Thoại"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"password"}
                            name={"password"}
                            classes={"form-control"}
                            placeholder={"Mật Khẩu"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"password"}
                            name={"confirmPassword"}
                            classes={"form-control"}
                            placeholder={"Xác Nhận Mật Khẩu"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"company_name"}
                            classes={"form-control"}
                            placeholder={"Tên Công Ty"}
                            value={nameCompany}
                            onChange={(e) => setNameCompany(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"firstName"}
                            classes={"form-control"}
                            placeholder={"Họ và Tên"}
                            value={fullName}
                            onChange={(e) => setFulltName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"lastName"}
                            classes={"form-control"}
                            placeholder={"Địa Chỉ"}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"text"}
                            name={"work_email"}
                            classes={"form-control"}
                            placeholder={"Email Công Việc"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"tel"}
                            name={"phone"}
                            classes={"form-control"}
                            placeholder={"Số Điện Thoại"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"password"}
                            name={"password"}
                            classes={"form-control"}
                            placeholder={"Mật Khẩu"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-lg-12">
                          <FormInput
                            tag={"input"}
                            type={"password"}
                            name={"confirmPassword"}
                            classes={"form-control"}
                            placeholder={"Xác Nhận Mật Khẩu"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                    <div className="col-lg-12">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Tôi đồng ý với các Điều Khoản & Điều Kiện
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_button">
                        <FormInput
                          tag={"button"}
                          val={"Đăng Ký"}
                          style={{ height: "50px", width: "450px" }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ marginBottom: "15px" }}>
                      <div>HOẶC</div>
                    </div>
                    <div className="col-lg-12">
                      <button
                        style={{
                          height: "50px",
                          width: "450px",
                          backgroundColor: "#3b5898",
                          fontWeight: "600",
                          color: "#fff",
                          marginBottom: "10px",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        onClick={handleGoogleLogin}
                      >
                        Đăng nhập với Google
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button
                        style={{
                          height: "50px",
                          width: "450px",
                          backgroundColor: "#4285f4",
                          fontWeight: "600",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        onClick={handleFacebookLogin}
                      >
                        Đăng nhập với Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <div className="not_remember_area">
                        <p>
                          Đã có tài khoản? <Link to="/signIn"> Đăng Nhập</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
