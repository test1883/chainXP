import React, { useEffect, useState } from "react";
import Modal from "../../Games/Modal";
import { gameQuests, getGames, getProfile, joinQuest, ongoingQuests, rejoinQuest } from "../../../../utils/functions";
import ChainXP from "../../../../abi/ChainXP.json"
import { useEthersSigner } from "../../../../utils/ethers";

const Quest = ({user, game}) => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);
  const [data, setData] = useState([])
  const [games, setGames] = useState()
  const [id, setId] = useState()
  const [on, setOn] = useState([])
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
        console.log(formattedGames)
        setGames(formattedGames)
        if (game) {
          const quests = await gameQuests(ChainXP.abi, game.gameId, signer)
          const temp = []
          console.log(quests)
          for (let i = 0; i < quests.quests.length; i++) {
            for (let j = 0; j < quests.questDetails.length; j++) {
              if (Number(quests.questDetails[j][0]) === Number(quests.quests[i].quest_id) && Number(quests.questDetails[j][1]) === Number(quests.quests[i].game_id)) {
                temp.push(
                  {
                    questId: Number(quests.questDetails[j][0]),
                    gameId: Number(quests.questDetails[j][1]),
                    endTime: Number(quests.questDetails[j][2]),
                    requiredLevel: Number(quests.questDetails[j][3]),
                    enterFees: Number(quests.questDetails[j][4]),
                    rewards: Number(quests.questDetails[j][5]),
                    nTries: Number(quests.questDetails[j][6]),
                  }
                )
              }
            }  
          }
          setData(temp)
        } else if (user) {
          console.log("her")
          const quests = await ongoingQuests(ChainXP.abi, signer, (q) => setOn(q))
          const temp = []
          console.log(on)
          console.log(quests)
          for (let i = 0; i < on.length; i++) {
            for (let j = 0; j < quests.questDetails[0].length; j++) {
              console.log("jj")
              if (Number(quests.questDetails[0][j][1]) === Number(on[i].quest_id) && Number(quests.questDetails[0][j][0]) === Number(on[i].game_id)) {
                console.log("ff")
                temp.push(
                  {
                    questId: Number(quests.questDetails[0][j][1]),
                    gameId: Number(quests.questDetails[0][j][0]),
                    endTime: Number(quests.questDetails[1][j][0]),
                    requiredLevel: Number(quests.questDetails[1][j][3]),
                    enterFees: Number(quests.questDetails[1][j][2]),
                    rewards: Number(quests.questDetails[1][j][5]),
                    nTries: Number(quests.questDetails[1][j][6]),
                    userId: Number(quests.questDetails[0][j][2]),
                    triesTaken: Number(quests.questDetails[0][j][3]),
                    status: Number(quests.questDetails[0][j][4]),
                    title: on[i].title,
                    description: on[i].description
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
  const join = async () => {
    const res = await getProfile(await signer.getAddress())
    await joinQuest(ChainXP.abi, res.user_id, data[id].gameId, data[id].questId, signer)
    handleCloseGamemodal();
  };

  return (
    <>
      <div className="col-lg-12">
        <h5 className="card-title">{user&&"Your "}Quests</h5>
        <div className="row">
          {data.map((quest, key) => {
            if ((quest.endTime)>(Date.now()/1000) || user) {
              return (
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
                        <h4 style={{color: "whitesmoke"}}>
                          {quest.title}
                        </h4>
                        <p>
                          <b
                            style={{
                              color: "gold",
                            }}
                          >
                            {(quest.endTime)>(Date.now()/1000) ? parseInt((quest.endTime)-(Date.now()/1000)) : 0} secs left
                          </b>
                          <span style={{ color: "whitesmoke" }}>
                            {" "}
                            Level {quest.requiredLevel+1}
                          </span>
                          {user && (quest.status !== 3) && (
                          <span style={{ color: "whitesmoke" }}>
                            {" "}
                            {quest.nTries - quest.triesTaken + 1} Tries Left
                          </span>

                          )}
                        </p>
                        <div className="d-flex justify-content-between align-items-center p-2">
                          <span
                            style={{
                              color: "gold",
                              fontFamily: "fantasy",
                              fontSize: "medium",
                            }}
                          >
                            +{quest.rewards} xp
                          </span>
                          <button
                            onClick={async ()=> {
                              if (!user) {
                                setId(key)
                                handleGamemodalClick()
                              } else {
                                await rejoinQuest(ChainXP.abi, quest.userId, quest.gameId, quest.questId, signer)
                              }
                            }}
                            className="btn btn-warning followbtn"
                          >
                            {!user && "Enter"}
                            {user && (
                              quest.status === 0 ? "Ongoing" :
                              quest.status === 1 ? "Retry -"+quest.enterFees*(quest.triesTaken) :
                              quest.status === 2 ? "Failed" : "Ended"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }})}
        </div>
      </div>
      <>
        {/* Render the Gamemodal if isGamemodalOpen is true */}
        {isGamemodalOpen && (
          <Modal onClose={handleCloseGamemodal} onSubmit={join} quest={{...data[id], logo: games[data[id].gameId]}}/>
        )}
      </>
    </>
  );
};

export default Quest;
