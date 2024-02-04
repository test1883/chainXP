import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";
import GameInfo from "../../../components/Main/GameInfo/Quest/GameInfo";
import Quest from "../../../components/Main/GameInfo/Quest/Quest";
import Modal from "../../../components/Main/Games/Modal";
import { redirect, useLocation } from "react-router-dom";
import { getGames, playerEarnings, playerLevel } from "../../../utils/functions";
import ChainXP from "../../../abi/ChainXP.json";
import { useEthersSigner } from "../../../utils/ethers";

const Games = () => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);
  const [game, setGame] = useState({
    contract: null,
    description: null,
    game_id: null,
    install: null,
    logo: null,
    name: null,
    owner: null
  })
  const [pLevel, setLevel] = useState(1)
  const [earnings, setEarnings] = useState(0)
  const signer = useEthersSigner()
  const location = useLocation();
  const { hash, pathname, search: searchQuery } = location;

  useEffect(() => {
    if (signer) {
      (async () => {
        const games = await getGames()
        const gameId = parseInt(searchQuery.split("=")[1])
        const g = games.filter(game => game.game_id === gameId)[0]
        const level = await playerLevel(ChainXP.abi, gameId, signer)
        const pEarnings = await playerEarnings(ChainXP.abi, gameId, signer)
        if (g) {
          setGame(g)
        }
        if (level) {
          setLevel(parseInt(level)+1)
        }
        if (pEarnings) {
          setEarnings(parseInt(pEarnings))
        }
        console.log(g)
      })()
    }
  }, [pathname, searchQuery, signer])

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
                        {game && (game.logo && (
                            <img
                              src={"https://ipfs.particle.network/" + game.logo}
                              style={{
                                height: "100%",
                                width: "100px",
                                borderRadius: "10px",
                              }}
                              alt=""
                            />
                        ))}
                      </div>
                      <div className="ps-3">
                        <h6 style={{ color: "gold" }}>
                          {game.name}
                        </h6>
                        <h5 className="c" style={{ color: "whitesmoke" }}>
                          {game.description}
                        </h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="c" style={{ color: "whitesmoke" }}>
                            <b> Current Level: </b> {pLevel}
                          </h5>
                          <div>
                            <a href={game.install} className="c" target="_blank">How to Play?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <GameInfo level={pLevel} earnings={earnings}/>
                </div>
              </div>
            </div>
          </div>
          <Quest game={{
            gameId:  parseInt(searchQuery.split("=")[1])
          }}/>

          {/* End games */}
        </div>
      </div>

      <Sidebar />
    </>
  );
};

export default Games;
