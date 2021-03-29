import React, { useRef } from "react";
import { useHistory } from 'react-router'
import "bulma/css/bulma.css";
import "../scss/font.scss";
import "../scss/responsive-attandance.scss";
import { useSelector } from "react-redux";
import { AttendanceRow, AttendanceTable } from "../page/attendancePage";

const PrintFormAttendance = () => {
  const day_list = useSelector((state) => state.dateReducer.day_list);
  const list_child = useSelector((state) => state.attendanceReducer.list_child);
  let componentRef = useRef();
  const history = useHistory()

  return (
    <>
      <div
        className="input-head"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="back-btn">
          <button onClick={() => history.goBack()}>
          <i className="fas fa-chevron-left"></i>
          </button>
        </div>
        <div className="selectMonthAtt">
          <div className="field">
            <div className="control">
              <input
                className="form-control"
                type="month"
              />
            </div>
          </div>
        </div>

        <div className="selectRoomAtt">
          <div className="field">
            <div
              className="control"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div className="select is-info">
                <select
                  className="FontAll"
                  // onChange={({ target }) =>
                  //   hadleChangeRoom(target, date, amount_day)
                  // }
                >
                  <option value={"ห้อง ก1"}>ห้องเรียน ก1</option>
                  <option value={"ห้อง ก2"}>ห้องเรียน ก2</option>
                  <option value={"ห้อง ก3"}>ห้องเรียน ก3</option>
                  <option value={"ห้อง ก4"}>ห้องเรียน ก4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="print-btn">
          <button>Print</button>
        </div>
      </div>
      <div className="header">Hi</div>
      <div className="content">
        <AttendanceTable day_list={day_list} ref={componentRef}>
          {list_child.map((attendance) => (
            <AttendanceRow key={attendance._id} {...attendance} />
          ))}
        </AttendanceTable>
      </div>
    </>
  );
};

export default PrintFormAttendance;
