// pages/index.js
import React, { useEffect, useState } from "react";
import { useEthersSigner } from "../../utils/ethers";
import { createGame, getGame, uploadToIPFS } from "../../utils/functions";
import ChainXP from "../../abi/ChainXP.json";
import QuestModal from "./QuestModal";

const AddQuestForm = () => {
  const signer = useEthersSigner();
  const [game, setGame] = useState({
    name: null,
    contractAddress: null,
    description: null,
    install: null,
    logo: null,
  });
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (signer) {
      (async () => {
        const res = await getGame(await signer.getAddress());
        if (res) {
          setGame({
            logo: "https://ipfs.particle.network/" + res.logo,
            name: res.name,
            contractAddress: res.contract,
            description: res.description,
            install: res.install,
          });
          setEdit(false);
        }
      })();
    }
  }, [signer]);

  const loadImage = function (event) {
    setGame({
      ...game,
      logo: URL.createObjectURL(event.target.files[0]),
    });
  };

  const save = async () => {
    const file = document.getElementById("gameInput").files[0];
    const cid = await uploadToIPFS(file);
    await createGame(
      ChainXP.abi,
      game.name,
      game.contractAddress,
      game.description,
      game.install,
      cid,
      signer,
    );
    setEdit(false);
  };

  return (
    <div className="tab-pane fade show active profile-edit" id="profile-edit">
      <div className="text-center">
        <h3 style={{ color: "gold" }}>{edit && "Add "}Your Game</h3>
      </div>
      <form>
        <div className="row mb-3">
          <label for="gameLogo" className="col-md-4 col-lg-3 col-form-label">
            Game Logo
          </label>
          <div className="col-md-8 col-lg-9">
            <img src={game.logo} id="game" alt="Game" />
            {edit && (
              <div className="pt-2">
                <input
                  type="file"
                  name="gameInput"
                  id="gameInput"
                  style={{ display: "none" }}
                  required
                  onChange={loadImage}
                />
                <label
                  for="gameInput"
                  className="btn btn-primary btn-sm"
                  title="Upload new game logo"
                >
                  <i className="bi bi-upload"></i>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label for="name" className="col-md-4 col-lg-3 col-form-label">
            Game's Name
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              disabled={!edit}
              name="name"
              type="text"
              className="form-control"
              id="name"
              value={game.name}
              onChange={(e) => {
                setGame({
                  ...game,
                  name: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="description" className="col-md-4 col-lg-3 col-form-label">
            Description
          </label>
          <div className="col-md-8 col-lg-9">
            <textarea
              disabled={!edit}
              name="description"
              className="form-control"
              id="description"
              style={{ height: "100px" }}
              onChange={(e) => {
                setGame({
                  ...game,
                  description: e.target.value,
                });
              }}
              value={game.description}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label for="contract" className="col-md-4 col-lg-3 col-form-label">
            Contract Address
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              disabled={!edit}
              name="contract"
              type="text"
              className="form-control"
              id="contract"
              value={game.contractAddress}
              onChange={(e) => {
                setGame({
                  ...game,
                  contractAddress: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="guide" className="col-md-4 col-lg-3 col-form-label">
            How to play?
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              disabled={!edit}
              name="guide"
              type="text"
              className="form-control"
              id="guide"
              value={game.install}
              onChange={(e) => {
                setGame({
                  ...game,
                  install: e.target.value,
                });
              }}
            />
          </div>
        </div>
        {edit && (
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={async (e) => {
                e.preventDefault();
                await save();
              }}
            >
              Save
            </button>
          </div>
        )}
      </form>
      <QuestModal />
    </div>
  );
};

export default AddQuestForm;
