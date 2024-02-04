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

const Sidebar = () => {

  const [balance, setBalance] = useState(0)
  const [xpBalance, setXpBalance] = useState(0)

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
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
