import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import xp from "../../assets/xp.jpg";
import ll from "../../assets/ll.png";
import useimage from "../../assets/address.jpg";
import Modal from "../Main/Games/Modal";
import { getXPBalance } from "../../utils/functions";
import XPToken from "../../abi/XPToken.json"
import { useEthersSigner } from "../../utils/ethers";
import { ethers } from 'ethers'


const Ongoinggm = [
  { id: 1, title: "ongoing quest title", reward: "30", level: "1" },
  { id: 2, title: "ongoing quest title", reward: "15", level: "6" },
  { id: 3, title: "ongoing quest title", reward: "10", level: "3" },
  { id: 4, title: "ongoing quest title", reward: "25", level: "5" },
  { id: 5, title: "ongoing quest title", reward: "20", level: "2" },
];

const Sidebar = () => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);

  const [balance, setBalance] = useState(0)
  const [xpBalance, setXpBalance] = useState(0)

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
  const signer = useEthersSigner()
  useEffect(() => {
    if (signer) {
      (async ()=> {
        const res = await getXPBalance(XPToken.abi, signer)
        setXpBalance(res)
        setBalance(ethers.utils.formatEther(await signer.getBalance()))
      })()
    }
  }, [signer])

  return (
    <>
      <div className="col-lg-4">
        {/* Recent Activity */}
        <div className="card info-card revenue-card">
          <div className="card-body">
            <h5 className="card-title">Balance:</h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                {/* <i className="fas fa-dollar-sign"></i>  */}
                <img id="balance" src={xp} alt="" />
              </div>
              <div className="ps-3">
                <h6>{xpBalance} XP</h6>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                {/* <i className="fas fa-dollar-sign"></i>  */}
                <img id="balance" src={ll} alt="" />
              </div>
              <div className="ps-3">
                <h6>{balance} LL</h6>
              </div>
            </div>
          </div>
        </div>
        {/* End Recent Activity */}

        {/* News & Updates Traffic */}
        <div className="card">
          <div className="card-body pb-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">Your Quests</h5>
              
              <Link to="/">
                <button className="btn btn-warning followbtn">View All</button>
              </Link>
            </div>
            <div className="news">
              {Ongoinggm.map((card) => (
                <div
                  key={card.id}
                  className="post-item clearfix"
                  style={{
                    borderRadius: "20px",
                    border: "1px solid white",
                    marginBottom: "10px",
                    padding: "10px",
                  }}
                >
                  <img src={useimage} alt="" />
                  <h4>
                    <a href="#">{card.title}</a>
                  </h4>
                  <p>
                    <b>00 : 00 : 00</b>
                    <span style={{ color: "whitesmoke" }}>
                      {" "}
                      Level {card.level}
                    </span>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        color: "gold",
                        fontFamily: "fantasy",
                        fontSize: "medium",
                      }}
                    >
                      {card.reward} xp
                    </span>
                    <button
                      onClick={handleGamemodalClick}
                      className="btn btn-warning followbtn"
                    >
                      Enter
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* End sidebar recent posts */}
          </div>
        </div>
        {/* End News & Updates */}
      </div>
      <>
        {/* Render the Gamemodal if isGamemodalOpen is true */}
        {isGamemodalOpen && (
          <Modal onClose={handleCloseGamemodal} onSubmit={handleSubmit} />
        )}
      </>
    </>
  );
};

export default Sidebar;
