import React, { useState } from "react";
import "bulma/css/bulma.css";
import api from "../api";
import { useHistory } from "react-router";

const ResetPassPage = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      const res = await api.post("/auth/reset", { email });
    if (res.status === 200) {
      alert(res.data.message);
      history.push("/login")
    }
    } catch (error) {
      alert("ไม่มีเมล์นี้ในฐานข้อมูล");
    }
  };

  return (
    <div >
        <section className="loginColor">
          <div className="hero-body ">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop">
                  <form className="box">
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control has-icons-left">
                        <input
                          type="email"
                          placeholder="Email..."
                          className="input"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                   
                  </form>
                  <div className="field">
                    <button
                      className="button is-success FontAll"
                      onClick={handleResetPassword}
                    >
                      รีเซตรหัสผ่าน
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};
export default ResetPassPage;
