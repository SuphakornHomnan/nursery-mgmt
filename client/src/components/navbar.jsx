import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import "../scss/font.scss";
import "../scss/responsive-navbar.scss"
import api from "../api";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";


const Navbar = ({ history }) => {
  const widthCheck = window.screen.width
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const handleActive = () => {
    setActive(!active)
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "RESET_POSITION" });
  };
 
  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("token")) {
        const data = await api.get("/user/my");
        dispatch({ type: "SET_POSITION", payload: data.data.position });
      }
    }
    fetchData();
  }, [dispatch]);

  const TeacherPage = () => {
    return (
      <div className="textHover">
        <div onClick={() => history.push("/profilePage")} className="navbar-item textHover">
          ประวัติ
        </div>
        <div
          onClick={() => history.push("/attendancePage")}
          className="navbar-item"
        >
          เช็คชื่อ
        </div>
        <div onClick={() => history.push("/healthPage")} className="navbar-item">
          ตรวจสุขภาพ
        </div>
        <div onClick={() => history.push("/gadgetPage")} className="navbar-item">
          ตรวจอุปกรณ์
        </div>
        <hr className="navbar-divider" />
        <div
          onClick={() => history.push("/quitChildPage")}
          className="navbar-item"
        >
          ประวัติเด็กที่ลาออก
        </div>
      </div>
    );
  };

  const AccountantPage = () => {
    return (
      <div className="textHover">
        <div onClick={() => history.push("/profilePage")} className="navbar-item textHover">
          ประวัติ
        </div>
        <div onClick={() => history.push("/stockPage")} className="navbar-item">
          คลังสินค้า
        </div>
        <div onClick={() => history.push("/paymentPage")} className="navbar-item">
          บัญชี
        </div>
        <hr className="navbar-divider" />
        <div
          onClick={() => history.push("/registerPage")}
          className="navbar-item"
        >
          ลงทะเบียน
        </div>
        <div
          onClick={() => history.push("/quitChildPage")}
          className="navbar-item"
        >
          ประวัติเด็กที่ลาออก
        </div>
        
      </div>
    );
  };

  const AdminMenu = () => {
    return (
      <div className="textHover">
        <div onClick={() => history.push("/profilePage")} className="navbar-item textHover">
          ประวัติ
        </div>
        <div
          onClick={() => history.push("/attendancePage")}
          className="navbar-item"
        >
          เช็คชื่อ
        </div>
        <div onClick={() => history.push("/healthPage")} className="navbar-item">
          ตรวจสุขภาพ
        </div>
        <div onClick={() => history.push("/gadgetPage")} className="navbar-item">
          ตรวจอุปกรณ์
        </div>
        <div onClick={() => history.push("/paymentPage")} className="navbar-item">
          บัญชี
        </div>
        <div onClick={() => history.push("/stockPage")} className="navbar-item">
          คลังสินค้า
        </div>

        <hr className="navbar-divider" />
        <div
          onClick={() => history.push("/registerPage")}
          className="navbar-item"
        >
          ลงทะเบียน
        </div>
        <div
          onClick={() => history.push("/quitChildPage")}
          className="navbar-item"
        >
          ประวัติเด็กที่ลาออก
        </div>
        <div
          onClick={() => history.push("/createUserPage")}
          className="navbar-item"
        >
          สร้าง User Id
        </div>
       
      </div>
    );
  }
  return (
    <>
      <div className="navbarTop">
        <nav
          className="navbar is-transparent navbarColor"
          role="navigation" aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div onClick={handleActive}>
              {active ? <div className="menuIcon">
                <i className="fas fa-times"></i>
              </div>
                : <div className="menuIcon">
                  <i className="fas fa-bars"></i>
                </div>}
            </div>
            <div className="navbar-start">
              <div className="btnBackMobile" onClick={() => history.goBack()}>
                <i className="fas fa-arrow-left"></i>
              </div>
            </div>
          </div>
          <div className="navbar-start">
            <div style={{ cursor: "pointer" }} className={active ? "btnBack navbar-item " : "btnBack navbar-item has-text-white"} onClick={() => history.goBack()}>
              <i className="fas fa-arrow-left"></i>
            </div>
          </div>
          <div id="navMenu" className={active ? "navbar-menu is-active menuDropdown" : "navbar-menu"}>
            <div className="navbar-start" >
              <div className="navbar-item has-dropdown is-hoverable">
                <div className={active ? "navbar-link navMenuSize" : "navbar-link has-text-white navMenuSize"}>เมนู</div>
                <div className="navbar-dropdown navMenuSize">
                  {localStorage.getItem("role") === "teacher" ? (
                    <TeacherPage />
                  ) : null}
                  {localStorage.getItem("role") === "accountant" ? (
                    <AccountantPage />
                  ) : null}
                  {
                    localStorage.getItem('role') === 'admin' ?
                      (<AdminMenu />) : null
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-end End">
            <div className="navbar-item">
              <div style={{ color: "white", display: "flex" }}>
                {localStorage.getItem("role") === "admin" ? (
                  <i
                    className="fas fa-crown roleAdmin"
                  ></i>
                ) : localStorage.getItem("role") === "accountant" ? (
                  <i
                    className="fas fa-file-invoice-dollar roleAaccountant"
                  ></i>
                ) : localStorage.getItem("role") === "teacher" ? (
                  <i
                    className="fas fa-user-graduate roleTeacher"
                  ></i>
                ) : null}
                {localStorage.getItem("owner")}
                {widthCheck <= 1024 ? <div onClick={handleLogout}>
                  <div onClick={() => history.push("/")}>
                    <i className="fas fa-sign-out-alt mobileLogout"></i>
                  </div>
                </div> : null}
              </div>
            </div>

            <div className="navbar-item">
              {widthCheck > 1024 ?
                <div className="buttons" onClick={handleLogout}>
                  <div
                    className="logoutBtn has-tooltip-bottom"
                    onClick={() => history.push("/")}
                    data-tooltip="คลิกเพื่อออกจากระบบ"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </div> : null
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default withRouter(Navbar);
