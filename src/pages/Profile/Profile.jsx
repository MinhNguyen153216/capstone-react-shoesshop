import React from "react";

export default function Profile() {
  return (
    <div className="profile py-4">
      <section className="profile-upper">
        <div className="container">
          <div className="profile-upper-form">
            <h3>Proifile</h3>
            <form>
              <div className="row profile-content">
                <div className="col-2  profile-avatar">
                  <img
                    src="https://i.pravatar.cc"
                    alt="avatar"
                    className="w-100"
                  />
                </div>
                <div className="col-10 profile-form">
                  <div className="row">
                    <div className="col-6">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                    <div className="col-6">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                    <div className="col-6">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                    </div>
                    <div className="col-6 form-gender">
                      <div id="gender-content">
                        <div className="gender-option">
                          <p
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              paddingRight: "20px",
                              display: "inline-block",
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            Gender
                          </p>
                        </div>
                        <div className="gender-option">
                          <div className="gender-click">
                            <input
                              defaultChecked={true}
                              type="radio"
                              name="gender"
                              value={true}

                            />
                            <br />
                            <label className="label-title">Male</label>
                          </div>
                          <div className="gender-click">
                            <input
                              type="radio"
                              name="gender"
                              value={false}

                            />
                            <br />
                            <label className="label-title">Female</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button">
                    <div id="btnSubmit">
                      <button type="submit" className="btn-2 btn btn-primary">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="profile-under"></section>
    </div>
  );
}
