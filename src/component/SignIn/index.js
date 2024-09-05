import React, { useEffect, useState } from "react";
import {useHistory } from "react-router-dom";
import FormInput from "../Common/FormInput";
import CustomModal from "../modal-popup/CustomModal";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

const SignInForm = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { handleLogin } = useAuth();
  const history = useHistory();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(email, password);
      if (response) {
        const token = response.data.accessToken;

        if (rememberMe) {
          Cookies.set("token", token, { expires: 7 });
        } else {
          localStorage.setItem("token", token);
        }

        toast.success("Đăng Nhập Thành Công");
        history.push("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Đăng Nhập Thất Bại");
    }
  };

  const handleGoogleLogin = () => {
    const role = "customer";
    const url = `http://localhost:3005/auth/google?state=${role}`;
    console.log("Redirecting to:", url);
    window.open(url, "_self");
  };

  const handleFacebookLogin = () => {
    window.open("http://localhost:3005/auth/facebook", "_self");
  };
  return (
    <>
      <section id="signIn_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
              <div className="user_area_wrapper">
                <h2>{props.heading}</h2>
                <div className="user_area_form ">
                  <form id="form_signIn" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <FormInput
                          tag={"input"}
                          type={"text"}
                          name={"email"}
                          classes={"form-control"}
                          placeholder={"Số điện thoại hoặc Email"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <FormInput
                          tag={"input"}
                          type={"password"}
                          name={"password"}
                          classes={"form-control"}
                          placeholder={"Mật khẩu"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            Ghi nhớ đăng nhập
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="submit_button">
                          <FormInput
                            tag={"button"}
                            val={"Đăng Nhập"}
                            style={{ height: "50px", width: "450px" }}
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-12"
                        style={{ marginBottom: "15px" }}
                      >
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
                            cursor: "pointer",
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
                            cursor: "pointer",
                          }}
                          onClick={handleFacebookLogin}
                        >
                          Đăng nhập với Facebook
                        </button>
                      </div>
                      <div className="col-lg-12">
                        <div className="not_remember_area">
                          <p>
                            Chưa là thành viên?{" "}
                            <span
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={openModal}
                            >
                              Đăng Ký
                            </span>
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

      <CustomModal isOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default SignInForm;
