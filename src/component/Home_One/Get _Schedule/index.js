import React from "react"

// import Section Heading
import SectionHeading from "../../Common/SectionHeading"

const GetSchedule = () => {
  return (
    <>
      <section id="schedule_one">
        <div className="container">
          <SectionHeading
            heading="Get a Schedule"
            para="Solving your supply chain needs from end to end, taking the
             complexity out of container shipping. We are at the forefront of developing innovation."
          />
          <div className="row">
            <div className="col-md-12">
              <div className="mt-5 d-flex justify-content-center">
                <div className="search-overlay-form">
                  <form>
                    <input
                      id="home-search-input"
                      type="text"
                      className="input-search"
                      placeholder="Search here..."
                    />
                    <button type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GetSchedule
