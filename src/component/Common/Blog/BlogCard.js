import React from 'react'
import { Link } from 'react-router-dom'

// Blog Card 
const BlogCard = props => {
    return (
        <>
            <div className="blog_wrapper zoom">
                <div className="news-img">
                    <Link to="/blog_details">
                        <img src={props.img} alt="img " />
                    </Link>
                    <div className="date">
                        <small>{props.month}</small><span>{props.day}</span>
                    </div>
                </div>
                <div className="blog_text">
                    <h6><i className="far fa-clock"></i>{props.date}</h6>
                    <h5><Link to="/blog_details">{props.heading}</Link></h5>
                </div>
            </div>
        </>
    )
}

export default BlogCard
