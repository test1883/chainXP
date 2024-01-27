
import React from 'react'
import xp from "../../assets/xp.jpg"
import ll from "../../assets/ll.png"
import useimage from '../../assets/address.jpg'




const Sidebar = () => {
  
  return (
    <div className="col-lg-4">
      {/* Recent Activity */}
      <div className="card info-card revenue-card">
        <div className="card-body">
          <h5 className="card-title">Balance:</h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              {/* <i className="fas fa-dollar-sign"></i>  */}
              <img id='balance' src={xp} alt='' />

            </div>
            <div className="ps-3">
              <h6>0 XP</h6>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              {/* <i className="fas fa-dollar-sign"></i>  */}
              <img id='balance' src={ll} alt='' />
            </div>
            <div className="ps-3">
              <h6>0 LL</h6>
            </div>
          </div>
        </div>
      </div>
      {/* End Recent Activity */}

      {/* News & Updates Traffic */}
      <div className="card">
        <div className="card-body pb-0">
          <h5 className="card-title">Ongoing &amp; Games</h5>
          <div className="news">
            <div className="post-item clearfix">
              <img src={useimage} alt="" />
              <h4><a href="#">Nihil blandi</a></h4>
              <button id="followbtn">Enter</button>
            </div>
            <hr />
            <div className="post-item clearfix">
              <img src={useimage} alt="" />
              <h4><a href="#">Quidem aute ffem</a></h4>
              <button id="followbtn">Enter</button>
            </div>
            <hr />
            <div className="post-item clearfix">
              <img src={useimage} alt="" />
              <h4><a href="#">Id quie efea</a></h4>
              <button id="followbtn">Enter</button>
            </div>
            <hr />
            <div className="post-item clearfix">
              <img src={useimage} alt="" />
              <h4><a href="#">Labor efeum cor</a></h4>
              <button id="followbtn">Enter</button>
            </div>
            <hr />
            <div className="post-item clearfix">
              <img src={useimage} alt="" />
              <h4><a href="#">Et dolores</a></h4>
              <button id="followbtn">Enter</button>
            </div>
          </div>
          {/* End sidebar recent posts */}
        </div>
      </div>
      {/* End News & Updates */}
    </div>
  );
};

export default Sidebar;
