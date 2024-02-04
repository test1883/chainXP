import React, { useState } from "react";

const QuestModal = ({ onClose }) => {


  const handleSubmit = (e) => {
    e.preventDefault();
    // Close the modal
    onClose();
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <div className="maincard">
          <div className="card info-card revenue-card">
            <div className="card-body">
              <h6 style={{ color: "gold" }}>Add a new quest</h6>
              <br/>
              <div className="row mb-3">
          <label
            for="title"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Quest Title
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
            //   value={quest.title}
            //   onChange={(e) => {
            //     setTitle({
            //       ...quest,
            //       title: e.target.value
            //     })
            //   }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            for="description"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Description
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="description"
              className="form-control"
              id="description"
            //   onChange={e => {
            //     setQuest({
            //       ...quest,
            //       description: e.target.value
            //     })
            //   }}
            //   value={game.description}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            for="fees"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Entry Fees
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="fees"
              type="number"
              className="form-control"
              id="fees"
            //   value={quest.fees}
            //   onChange={e => {
            //     setQuest({
            //       ...quest,
            //       fees: e.target.value
            //     })
            //   }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            for="level"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Required Level
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="level"
              type="number"
              className="form-control"
              id="level"
            //   value={quest.level}
            //   onChange={e => {
            //     setQuest({
            //       ...quest,
            //       level: e.target.value
            //     })
            //   }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            for="duration"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Quest Duration
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="duration"
              type="number"
              className="form-control"
              id="duration"
            //   value={quest.duration}
            //   onChange={e => {
            //     setQuest({
            //       ...quest,
            //       duration: e.target.value
            //     })
            //   }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label
            for="rewards"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Quest Reward
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="rewards"
              type="number"
              className="form-control"
              id="rewards"
            //   value={quest.rewards}
            //   onChange={e => {
            //     setQuest({
            //       ...quest,
            //       rewards: e.target.value
            //     })
            //   }}
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <label
            for="tries"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Quest Reward
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="tries"
              type="number"
              className="form-control"
              id="tries"
            //   value={quest.nTries}
            //   onChange={e => {
            //     setQuest({
            //       ...quest,
            //       nTries: e.target.value
            //     })
            //   }}
            />
          </div>
        </div>
        
        <button style={submitbut} type="submit" className="button-style" onClick={handleSubmit}>
            Claim Rewards
          </button>
          <button style={cancelbut} type="button" className="button-style" onClick={onClose}>
            Close
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;

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
