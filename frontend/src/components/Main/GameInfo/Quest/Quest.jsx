import React, { useEffect, useState } from "react";
import Modal from "../../Games/Modal";
import { gameQuests, getGames, ongoingQuests } from "../../../../utils/functions";
import ChainXP from "../../../../abi/ChainXP.json"
import { useEthersSigner } from "../../../../utils/ethers";

const Quest = ({user, game}) => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);
  const [data, setData] = useState([])
  const [games, setGames] = useState()
  const signer = useEthersSigner()

  useEffect(() => {
    if (signer) {
      (async () => {
        const res = await getGames()
        const formattedGames = res.reduce((g, el) => {
          return {
            ...g,
            [el.game_id]: "https://ipfs.particle.network/" + el.logo,
          }
        }, {})
        setGames(formattedGames)
        if (game) {
          const quests = await gameQuests(ChainXP.abi, game.gameId, signer)
          const temp = []
          for (let i = 0; i < quests.quests.length; i++) {
            for (let j = 0; j < quests.questDetails.length; j++) {
              if (quests.questDetails[j][0] === quests.quests[i].quest_id && quests.questDetails[j][1] === quests.quests[i].game_id) {
                temp.push(
                  {
                    questId: Number(quests.questDetails[j][0]),
                    gameId: Number(quests.questDetails[j][1]),
                    endTime: Number(quests.questDetails[j][2]),
                    requiredLevel: Number(quests.questDetails[j][3]),
                    enterFees: Number(quests.questDetails[j][4]),
                    rewards: Number(quests.questDetails[j][5]),
                    nTries: Number(quests.questDetails[j][6]),
                    title: quests.quests[i].title,
                    description: quests.quests[i].description
                  }
                )
              }
            }  
          }
          setData(temp)
        } else if (user) {
          const quests = await ongoingQuests(ChainXP.abi, signer)
          const temp = []
          for (let i = 0; i < quests.quests.length; i++) {
            for (let j = 0; j < quests.questDetails[0].length; j++) {
              if (quests.questDetails[0][j][0] === quests.quests[i].quest_id && quests.questDetails[0][j][1] === quests.quests[i].game_id) {
                temp.push(
                  {
                    questId: Number(quests.questDetails[0][j][0]),
                    gameId: Number(quests.questDetails[0][j][1]),
                    endTime: Number(quests.questDetails[0][j][2]),
                    requiredLevel: Number(quests.questDetails[0][j][3]),
                    enterFees: Number(quests.questDetails[0][j][4]),
                    rewards: Number(quests.questDetails[0][j][5]),
                    nTries: Number(quests.questDetails[0][j][6]),
                    title: quests.quests[i].title,
                    description: quests.quests[i].description,
                    userId: Number(quests.questDetails[1][j][0]),
                    triesTaken: Number(quests.questDetails[1][j][3]),
                    status: Number(quests.questDetails[1][j][4])
                  }
                )
              }
            }  
          }
          setData(temp)
        }
      })()
    }
  }, [signer, game, user])

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
      <div className="col-lg-12">
        <h5 className="card-title">Quests</h5>

        <div className="row">
          {data.map((quest, key) => (
            <div key={key} className="col-lg-6">
              <div
                className=""
                style={{
                  borderRadius: "20px",
                  border: "1px solid white",
                  marginBottom: "10px",
                }}
              >
                <div className="card-body pb-0">
                  <div className="news">
                    <div className="post-item clearfix">
                      <img src={games[quest.gameId]} alt="" />
                      <h4>
                        {quest.title}
                      </h4>
                      <p>
                        <b
                          style={{
                            color: "gold",
                          }}
                        >
                          00 : 00 : 00
                        </b>
                        <span style={{ color: "whitesmoke" }}>
                          {" "}
                          Level Required {quest.requiredLevel}
                        </span>
                      </p>
                      <div className="d-flex justify-content-between align-items-center p-2">
                        <span
                          style={{
                            color: "gold",
                            fontFamily: "fantasy",
                            fontSize: "medium",
                          }}
                        >
                          +{quest.reward} xp
                        </span>
                        <button
                          onClick={handleGamemodalClick}
                          className="btn btn-warning followbtn"
                        >
                          Enter -{quest.enterFees} xp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default Quest;
