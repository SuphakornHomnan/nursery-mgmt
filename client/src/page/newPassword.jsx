import React, { useState } from "react";
import "bulma/css/bulma.css";
import api from "../api";
import { useHistory, useParams } from 'react-router-dom'

const NewPasswordPage = (props) => {
  const history = useHistory()
  const token = useParams()
  console.log(token)
  const [password, setPassword] = useState("");
  const handleNewPassword = async () => {
    const res = await api.post("/auth/new-password", {  token, password });
    console.log("res", res);
    if (res.data.code === 200) {
      alert(res.data.message);
      history.push("/login")
    } else {
      alert('การเปลี่ยนรหัสผ่านล้มเหลว');
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
                      <label className="label">New Password</label>
                      <div className="control has-icons-left ">
                        <input
                          type="password"
                          placeholder="Enter a new password ..."
                          className="input"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className="field">
                    <button
                      className="button is-success FontAll"
                      onClick={handleNewPassword}
                    >
                      ยืนยัน
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
export default NewPasswordPage;
