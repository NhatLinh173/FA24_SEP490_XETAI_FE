import React from "react"

const GetSchedule = () => {
  return (
    <>
      <section id="schedule_one">
        <div className="container">

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
