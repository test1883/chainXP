import React from "react";
import Sidebar from "../components/Navbar/Sidebar";

const Home = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Games</h1>
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
          {/* Games */}
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Games <span>/Today</span>
                </h5>

                {/* Line Chart */}
                <div id="reportsChart">Game Details</div>

                {/* End Line Chart */}
              </div>
            </div>
          </div>
          {/* End games */}
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Home;
