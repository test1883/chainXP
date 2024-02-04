import React, { useState } from "react";

const Modal = ({ onClose, onSubmit, quest }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    // Close the modal
    onClose();
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span style={{ cursor: "pointer" }} className="close" onClick={onClose}>
          &times;
        </span>
        <h2 style={header}>QUEST DETAILS</h2>
        <div className="maincard">
          <div className="card info-card revenue-card">
            <div className="card-body">
              <h6 style={{ color: "gold" }}>{quest.title}</h6>
              <div className="d-flex align-items-center">
                <div className="">
                  <img
                    src={quest.logo}
                    style={{
                      height: "100%",
                      width: "100px",
                      borderRadius: "10px",
                    }}
                    alt=""
                  />
                </div>
                <div className="ps-3">
                  <h5 className="c" style={{ color: "whitesmoke" }}>
                    <b> Reward: </b> {quest.rewards}XP
                  </h5>
                  <h5 className="c" style={{ color: "whitesmoke" }}>
                    <b> Minimum Level: </b> {quest.requiredLevel+1}
                  </h5>
                  <h5 className="c" style={{ color: "whitesmoke" }}>
                    <b> Duration: </b>{" "}
                    <span style={{ color: "gray" }}>{(quest.endTime)>(Date.now()/1000) ? parseInt((quest.endTime)-(Date.now()/1000)) : 0} secs left
</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <p>
              <b style={{ color: "goldenrod", fontSize: "20px" }}>
                Description:{" "}
              </b>
              <span style={{ color: "white" }}>
                {quest.description}
              </span>
            </p>
            <p>
              <b style={{ color: "goldenrod", fontSize: "20px" }}>
                No. of Tries:{" "}
              </b>
              <span style={{ color: "white" }}>
                {quest.nTries}
              </span>
            </p>
          </div>

          <br />
          <button style={submitbut} onClick={handleSubmit} type="submit" className="button-style">
            Join Quest - {quest.enterFees}XP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// Inline CSS styles for the modal
const header = {
  textAlign: "center",
  color: "whitesmoke",
};
const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  background: "linear-gradient(to left, #c33764, #1d2671)",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const cancelbut = {
  /* Your button style here */
  padding: "8px 12px",
  backgroundColor: "rgb(129, 128, 125)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "10px",
  marginRight: "8px",
};

const submitbut = {
  /* Your button style here */
  padding: "8px 12px",
  backgroundColor: "goldenrod",
  color: "black",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "10px",
  marginRight: "8px",
};
