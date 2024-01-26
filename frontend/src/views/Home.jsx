import React from "react";

const Home = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Game</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Games</li>
          </ol>
        </nav>
      </div>
      {/* End Page Title */}

      <div className="col-lg-8">
        <div className="row">
          {/* Reports */}
          {/* <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Games <span>/Today</span>
                  </h5>

                  <div id="reportsChart">Games list</div>

                </div>
              </div>
            </div> */}
          {/* End Reports */}
        </div>
      </div>
    </>
  );
};

export default Home;
