import React from "react";
import Counter from "./Counter";
import img1 from "../../../assets/img/About/pexels-quintingellar-2199293 (1).jpg";

const HomeAbout = () => {
  return (
    <>
      <section id="home_about_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="about_img">
                <img src={img1} alt="About_Img" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="about_content">
                <div className="heading-left-border">
                  <h2>
                    Dẫn đầu trong dịch vụ vận tải kết nối tài xế và khách hàng
                  </h2>
                </div>
                <h3>
                  Đội ngũ của chúng tôi "Luôn tận tâm, kết nối tài xế và khách
                  hàng trên mọi nẻo đường."
                </h3>
                <p>
                  Chúng tôi luôn nỗ lực và đầu tư để mang đến những giải pháp
                  kết nối vận tải tối ưu. Khách hàng có thể dễ dàng đăng đơn
                  hàng cần vận chuyển, trong khi các tài xế có thể tìm kiếm và
                  nhận đơn hàng phù hợp. Chúng tôi giúp đơn giản hóa quy trình
                  vận chuyển từ đầu đến cuối, đảm bảo sự thuận tiện và hiệu quả
                  cao nhất cho cả khách hàng và tài xế.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAbout;
