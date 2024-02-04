import React, { useEffect, useState } from "react";
import AddQuestForm from "../components/AddQuestForm/AddQuestForm";
import { useEthersSigner } from "../utils/ethers";
import { createProfile, getProfile, uploadToIPFS } from "../utils/functions";
import ChainXP from "../abi/ChainXP.json";

function Settings() {
  const signer = useEthersSigner();
  const [profile, setProfile] = useState({
    image: null,
    name: null,
    bio: null,
    country: null,
  });
  const [edit, setEdit] = useState(true);
  const [loaded,setLoaded] = useState(false)
  useEffect(() => {
    if (signer && !loaded) {
      (async () => {
        const prof = await getProfile(await signer.getAddress());
        if (prof) {
          setProfile({
            image: "https://ipfs.particle.network/" + prof.profile,
            name: prof.name,
            bio: prof.bio,
            country: prof.country,
          });
          setEdit(false);
        }
        setLoaded(true)
      })();
    }
  }, [signer, loaded]);

  const loadImage = function (event) {
    setProfile({
      ...profile,
      image: URL.createObjectURL(event.target.files[0]),
    });
  };

  const save = async () => {
    const file = document.getElementById("profileInput").files[0];
    const cid = await uploadToIPFS(file);
    await createProfile(
      ChainXP.abi,
      cid,
      profile.name,
      profile.bio,
      profile.country,
      signer,
    );
    setEdit(false);
  };

  return (
    <>
      <div className="col-lg-12">
        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        style={{
                          color: "whitesmoke",
                          background: "transparent",
                        }}
                        data-toggle="tab"
                        data-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        style={{
                          color: "whitesmoke",
                          background: "transparent",
                        }}
                        data-toggle="tab"
                        data-target="#game-settings"
                      >
                        Dev Mode
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-edit"
                      id="profile-edit"
                    >
                      <form>
                        <div className="row mb-3">
                          <label
                            for="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            {profile.image && (
                              <img
                                src={profile.image}
                                id="profile"
                                alt="Profile"
                              />
                            )}
                            {edit && (
                              <div className="pt-2">
                                <input
                                  type="file"
                                  name="profileInput"
                                  id="profileInput"
                                  style={{ display: "none" }}
                                  required
                                  onChange={loadImage}
                                />
                                <label
                                  for="profileInput"
                                  className="btn btn-primary btn-sm"
                                  title="Upload new profile image"
                                >
                                  <i className="bi bi-upload"></i>
                                </label>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              disabled={!edit}
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="fullName"
                              value={profile.name}
                              onChange={(e) => {
                                setProfile({
                                  ...profile,
                                  name: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="about"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Bio
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              disabled={!edit}
                              name="about"
                              className="form-control"
                              id="about"
                              style={{ height: "100px" }}
                              onChange={(e) => {
                                setProfile({
                                  ...profile,
                                  bio: e.target.value,
                                });
                              }}
                              value={profile.bio}
                            ></textarea>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Country"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Country
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              disabled={!edit}
                              name="country"
                              type="text"
                              className="form-control"
                              id="Country"
                              value={profile.country}
                              onChange={(e) => {
                                setProfile({
                                  ...profile,
                                  country: e.target.value,
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
                    </div>

                    <div className="tab-pane fade pt-3" id="game-settings">
                      <AddQuestForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Settings;
