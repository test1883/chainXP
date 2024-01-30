import React from "react";
import profile from "../assets/address.jpg";
import AddQuestForm from "../components/AddQuestForm/AddQuestForm";
import Gamelist from "../components/AddQuestForm/Gamelist";

function Settings() {
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
                        Games
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
                        data-target="#game-list"
                      >
                        Games List
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
                            <img src={profile} alt="Profile" />
                            <div className="pt-2">
                              <a
                                href="#"
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                              >
                                <i className="bi bi-upload"></i>
                              </a>
                              <a
                                href="#"
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                              >
                                <i className="bi bi-trash"></i>
                              </a>
                            </div>
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
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="fullName"
                              value="Chain XP"
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
                              name="about"
                              className="form-control"
                              id="about"
                              style={{ height: "100px" }}
                            >
                              Sunt est soluta temporibus accusantium neque nam
                              maiores cumque temporibus. Tempora libero non est
                              unde veniam est qui dolor. Ut sunt iure rerum quae
                              quisquam autem eveniet perspiciatis odit. Fuga
                              sequi sed ea saepe at unde.
                            </textarea>
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
                              name="country"
                              type="text"
                              className="form-control"
                              id="Country"
                              value="USA"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Twitter"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Twitter Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="twitter"
                              type="text"
                              className="form-control"
                              id="Twitter"
                              value="https://twitter.com/#"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Facebook"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Facebook Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="facebook"
                              type="text"
                              className="form-control"
                              id="Facebook"
                              value="https://facebook.com/#"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Instagram"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Instagram Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="instagram"
                              type="text"
                              className="form-control"
                              id="Instagram"
                              value="https://instagram.com/#"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Linkedin"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Linkedin Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="linkedin"
                              type="text"
                              className="form-control"
                              id="Linkedin"
                              value="https://linkedin.com/#"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="tab-pane fade pt-3" id="game-settings">
                      <AddQuestForm />
                    </div>

                    <div className="tab-pane fade pt-3" id="game-list">
                      <Gamelist />
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
