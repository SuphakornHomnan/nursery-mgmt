import React, { useState } from "react";
import "bulma/css/bulma.css";
import api from "../api";
import { useDispatch } from "react-redux";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await api.post("/auth", { email, password });
    if (res.status === 200) {
      alert("เข้าสู่ระบบสำเร็จ");
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("role", res.data.data.USER.position);
      localStorage.setItem("owner", res.data.data.USER.owner);
      const data = await api.get("/user/my");
      dispatch({ type: "SET_POSITION", payload: data.data.data.position });
      if (localStorage.getItem("token")) {
        let base_case = data.data.data.position;
        switch (base_case) {
          case "admin":
            return props.history.push("/profilePage");
          case "teacher":
            return props.history.push("/profilePage");
          case "accountant":
            return props.history.push("/paymentPage");
          default:
            return;
        }
      }
    } 
    } catch (error) {
      alert("เข้าสู่ระบบล้มเหลว");
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
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control has-icons-left ">
                        <input
                          type="password"
                          placeholder="Password..."
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
                      onClick={handleLogin}
                    >
                      เข้าสู่ระบบ
                  </button>
                  
                  </div>
                  <a href='/reset' style={{fontSize: '150%',color: '#FFF' }}>Forgot your password?</a>
                 </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};
export default LoginPage;
