import React, { useState } from "react";
import Sidebar from "../components/Navbar/Sidebar";
import GameInfo from "../components/Main/GameInfo/Quest/GameInfo";
import Quest from "../components/Main/GameInfo/Quest/Quest";
import logo from "../assets/address.jpg";
import Modal from "../components/Main/Games/Modal";

const Home = () => {
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
          <Quest user={true}/>

          {/* End games */}
        </div>
      </div>

      <Sidebar />
      {/* Render the Gamemodal if isGamemodalOpen is true */}
      {isGamemodalOpen && (
        <Modal onClose={handleCloseGamemodal} onSubmit={handleSubmit}/>
      )}
    </>
  );
};

export default Home;
