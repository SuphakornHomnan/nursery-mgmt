import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bulma/css/bulma.css";
import "../../scss/font.scss";
import "../../scss/responsive-health.scss";
import moment from "moment";
import { showChild } from "../../redux/actions/health";
import { modalChild } from "../../redux/actions/attendance";

const SelectRoom = () => {
  const dispatch = useDispatch();
  const amount_day = useSelector((state) => state.dateReducer.list_date);
  const room = useSelector((state) => state.roomReducer.room);
  const [date, SetDate] = useState(moment().format("YYYY-MM-DD"));
  const handleDate = (target) => {
    dispatch({ type: "SET_LOADING_SPINNER_HEALTH", payload: false });
    dispatch(modalChild(room, target.value));
    SetDate(target.value);
    dispatch(showChild(room, target.value, amount_day));
  };
  function hadleChangeRoom(target, date, amount_day) {
    dispatch({ type: "SET_LOADING_SPINNER_HEALTH", payload: false });
    dispatch(showChild(target, date, amount_day));
  }

  return (
    <>
      <div className="selectMonthHealth">
        <div className="field">
          <div className="control" data-tooltip="เลือกวันที่จะเช็คข้อมูล">
            <input
              className="form-control"
              type="date"
              value={date}
              onChange={({ target }) => handleDate(target)}
            />
          </div>
        </div>
      </div>

      <div className="selectRoomHealth">
        <div className="field">
          <div
            className="control"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className="select is-info" data-tooltip="เลือกห้องเรียนเด็ก">
              <select
                className="FontAll"
                onChange={({ target }) =>
                  hadleChangeRoom(target, date, amount_day)
                }
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
    </>
  );
};
export default SelectRoom;
