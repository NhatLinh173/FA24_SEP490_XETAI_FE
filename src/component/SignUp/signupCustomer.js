import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../Common/FormInput";
import { toast } from "react-toastify";
import axios from "axios";

const SignUpCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFulltName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleRegister = async () => {
    if (!isChecked) {
      toast.warn("Vui lòng đồng ý với điều khoản và điều kiện!!!");
      return;
    }

    if (!email || !password || !phone || !fullName) {
      toast.warn("Thông tin chưa đầy đủ vui lòng nhập đầy đủ thông tin!!!");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Mật Khẩu Không Khớp!!!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3005/auth/register", {
        email,
        password,
        fullName,
        phone,
        role: "customer",
      });

      if (response.status === 201) {
        toast.success("Đăng Ký Thành Công");
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      } else {
        toast.error("Đăng Ký Thất Bại");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Đăng Ký Thất Bại: ${error.response.data.message}`);
      } else {
        console.error("Register error: ", error);
        toast.error("Có lỗi xảy ra trong quá trình đăng ký.");
      }
    }
  };
  const handleGoogleLogin = () => {
    const role = "customer";
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
              <div className="user_area_form">
                <h2>Đăng Ký</h2>
                <form
                  // action="#!"
                  id="form_signIn"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                  }}
                >
                  <div className="row">
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

                    <div className="col-lg-12">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Tôi đồng ý với Điều khoản & Điều kiện
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_button">
                        <FormInput
                          tag={"button"}
                          type="submit"
                          val={"Đăng Ký"}
                          style={{ height: "50px", width: "100%" }}
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
                          width: "100%",
                          backgroundColor: "#3b5898",
                          fontWeight: "600",
                          color: "#fff",
                          marginBottom: "10px",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        onClick={handleGoogleLogin}
                      >
                        Đăng Nhập Với Google
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button
                        style={{
                          height: "50px",
                          width: "100%",
                          backgroundColor: "#4285f4",
                          fontWeight: "600",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        onClick={handleFacebookLogin}
                      >
                        Đăng Nhập Với Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <div className="not_remember_area">
                        <p>
                          Bạn đã có tài khoản?{" "}
                          <Link to="/signIn"> Đăng Nhập</Link>
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

export default SignUpCustomer;
