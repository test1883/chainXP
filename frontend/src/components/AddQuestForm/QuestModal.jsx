import React, { useState } from "react";
import { addQuest } from "../../utils/functions";
import ChainXP from "../../abi/ChainXP.json"
import { useEthersSigner } from "../../utils/ethers";

const QuestModal = ({ gameId, onClose }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(gameId)
    await addQuest(ChainXP.abi, gameId, quest.title, quest.description, quest.enterFees, quest.requiredLevel-1,  quest.duration*60, quest.rewards, quest.nTries, signer)
    setQuest({
        title: null, 
        description: null, 
        enterFees: 0, 
        requiredLevel: 1, 
        duration: 20, 
        rewards: 10, 
        nTries: 1
      })
    // Close the modal
    await onClose();
  };
  const signer = useEthersSigner()
  const [quest, setQuest] = useState({
    title: null, 
    description: null, 
    enterFees: 0, 
    requiredLevel: 1, 
    duration: 20, 
    rewards: 10, 
    nTries: 1
  })

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <div className="maincard">
          <div className="card info-card revenue-card">
            <div className="card-body">
              <h6 style={{ color: "gold" }}>Add a new quest</h6>
              <br />
              <div className="row mb-3">
                <label for="title" className="col-md-4 col-lg-3 col-form-label">
                  Quest Title
                </label>
                <div className="col-md-8 col-lg-9">
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                      value={quest.title}
                      onChange={(e) => {
                        setQuest({
                          ...quest,
                          title: e.target.value
                        })
                      }}
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
                      onChange={e => {
                        setQuest({
                          ...quest,
                          description: e.target.value
                        })
                      }}
                      value={quest.description}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="fees" className="col-md-4 col-lg-3 col-form-label">
                  Entry Fees(in XP)
                </label>
                <div className="col-md-8 col-lg-9">
                  <input
                    min={0}
                    name="fees"
                    type="number"
                    className="form-control"
                    id="fees"
                      value={quest.enterFees}
                      onChange={e => {
                        setQuest({
                          ...quest,
                          enterFees: e.target.value
                        })
                      }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="level" className="col-md-4 col-lg-3 col-form-label">
                  Required Level
                </label>
                <div className="col-md-8 col-lg-9">
                  <input
                    min={1}
                    name="level"
                    type="number"
                    className="form-control"
                    id="level"
                      value={quest.requiredLevel}
                      onChange={e => {
                        setQuest({
                          ...quest,
                          requiredLevel: e.target.value
                        })
                      }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  for="duration"
                  className="col-md-4 col-lg-3 col-form-label"
                >
                  Quest Duration(in mins)
                </label>
                <div className="col-md-8 col-lg-9">
                  <input
                    min={20}
                    name="duration"
                    type="number"
                    className="form-control"
                    id="duration"
                      value={quest.duration}
                      onChange={e => {
                        setQuest({
                          ...quest,
                          duration: e.target.value
                        })
                      }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label
                  for="rewards"
                  className="col-md-4 col-lg-3 col-form-label"
                >
                  Quest Reward(in XP)
                </label>
                <div className="col-md-8 col-lg-9">
                  <input
                    min={10}
                    name="rewards"
                    type="number"
                    className="form-control"
                    id="rewards"
                    value={quest.rewards}
                    onChange={e => {
                    setQuest({
                        ...quest,
                        rewards: e.target.value
                    })
                    }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label for="tries" className="col-md-4 col-lg-3 col-form-label">
                  Max Tries
                </label>
                <div className="col-md-8 col-lg-9">
                  <input
                    min={1}
                    name="tries"
                    type="number"
                    className="form-control"
                    id="tries"
                    value={quest.nTries}
                    onChange={e => {
                    setQuest({
                        ...quest,
                        nTries: e.target.value
                    })
                    }}
                  />
                </div>
              </div>

              <button
                style={submitbut}
                type="submit"
                className="button-style"
                onClick={handleSubmit}
              >
                Add Quest
              </button>
              <button
                style={cancelbut}
                type="button"
                className="button-style"
                onClick={onClose}
              >
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
  width: "60%",
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
