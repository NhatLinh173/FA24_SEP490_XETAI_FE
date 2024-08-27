import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../Common/FormInput";
import CustomModal from "../modal-popup/CustomModal";
import axios from "axios";
import { auth, provider, signInWithPopup } from "../../config/firebaseConfig";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
});

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const saveAccessToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

// const refreshAccessToken = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const token = await result.user.getIdToken();
//     const response = await axiosInstance.post("auth/google", { token });
//     if (response === 200) {
//       const newAccessToken = response.data.accessToken;
//       saveAccessToken(response.data.accessToken);
//       sessionStorage.setItem(" refreshToken", response.data.refreshToken);
//       return newAccessToken;
//     } else {
//       console.error("Google Login Failed");
//     }
//   } catch (error) {
//     console.error("Failed to refresh token", error);
//   }
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const newAccessToken = await refreshAccessToken();
//         if (newAccessToken) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosInstance(originalRequest);
//         }
//       } catch (err) {
//         console.error("Error during token refresh: ", err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// const handleLoginWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const token = await result.user.getIdToken();

//     axiosInstance
//       .post("auth/google", { token })
//       .then((response) => {
//         if (response.status === 200) {
//           saveAccessToken(response.data.accessToken);
//           sessionStorage.setItem("refreshToken", response.data.refreshToken);
//         } else {
//           console.error("Google Login Failed");
//         }
//       })
//       .catch((error) => {
//         console.error("Google login error:", error);
//       });
//   } catch (error) {
//     console.error("Google login failed", error);
//   }
// };

const SignInForm = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };
    try {
      const response = await axiosInstance.post("auth/login", payload);
      if (response.status === 200) {
        toast.success("Đăng Nhập Thành Công");
        console.log(response.data);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("role", response.data.role);
        history.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Sai Tài Khoản Hoặc Mật Khẩu");
      } else {
        toast.error("Đăng Nhập Thất Bại");
      }
      console.error("Login error:", error);
    }
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
                  <form id="form_signIn" onSubmit={handleLogin}>
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
                          // onClick={handleLoginWithGoogle}
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
