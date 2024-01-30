import React, { useState } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";
import GameInfo from "../../../components/Main/GameInfo/Quest/GameInfo";
import Quest from "../../../components/Main/GameInfo/Quest/Quest";
import logo from "../../../assets/address.jpg";
import Modal from "../../../components/Main/Games/Modal";

const Games = () => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);

  const handleGamemodalClick = () => {
    setIsGamemodalOpen(true);
  };

  const handleCloseGamemodal = () => {
    setIsGamemodalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // claim
    handleCloseGamemodal();
  };
  return (
    <>
      <div className="col-lg-8">
        <div className="row">
          {/* Games */}
          <div className="col-12">
            <div className="">
              <div className="card-body">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="">
                        <img
                          src={logo}
                          style={{
                            height: "100%",
                            width: "100px",
                            borderRadius: "10px",
                          }}
                          alt=""
                        />
                      </div>
                      <div className="ps-3">
                        <h6 style={{ color: "gold" }}>
                          The Gamifield quests onboard
                        </h6>
                        <h5 className="c" style={{ color: "whitesmoke" }}>
                          <b> Game Title: </b>Gema current level quest
                        </h5>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="c" style={{ color: "whitesmoke" }}>
                            <b> Current Level: </b> 3
                            </h5>
                            <div className="text-center">
                            <button
                                type="button"
                                onClick={handleGamemodalClick}
                                className="btn btn-warning"
                            >
                                Know More
                            </button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <GameInfo />
                </div>
              </div>
            </div>
          </div>
          <Quest />

          {/* End games */}
        </div>
      </div>

      <Sidebar />
      {/* Render the Gamemodal if isGamemodalOpen is true */}
      {isGamemodalOpen && (
        <Modal onClose={handleCloseGamemodal} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default Games;
