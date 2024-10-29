import React from "react";
import BlogCard from "./BlogCard";
import OwlCarousel from "react-owl-carousel";
import { BlogData } from "./BlogData";
import { Link } from "react-router-dom";

const BlogHome = () => {
    return (
        <>
            <section id="news_blog_area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="blog_wrappers">
                                <h2 className="section-title text-center mb-5">Tin tức</h2>
                                <div className="blog_slider">
                                    <OwlCarousel
                                        className="owl-theme"
                                        autoplay={true}
                                        autoplayHoverPause={true}
                                        autoplayTimeout={2500}
                                        loop={true}
                                        margin={20}
                                        nav={false}
                                        dots={true}
                                    >
                                        {BlogData.slice(0, 6).map((data, index) => (
                                            <BlogCard
                                                key={index}
                                                img={data.img}
                                                date={data.date}
                                                heading={data.heading}
                                                month={data.month}
                                                day={data.day}
                                            />
                                        ))}
                                    </OwlCarousel>
                                </div>
                                <div className="view_more_button" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Link to="/blog_grid" className="btn btn-theme mb-2">
                                        Xem thêm
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogHome;
