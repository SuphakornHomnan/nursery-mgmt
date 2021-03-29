import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bulma/css/bulma.css";
import "../../scss/font.scss";
import "../../scss/responsive-attandance.scss";
import moment from "moment";
import { showChild } from "../../redux/actions/attendance";
import { handleMonth } from "../../redux/actions/date";

const SelectRoom = () => {
  const dispatch = useDispatch();
  const amount_day = useSelector((state) => state.dateReducer.list_date);
  const room = useSelector((state) => state.roomReducer.room);
  const [date, SetDate] = useState(moment().format("YYYY-MM"));
  const handleDate = (value) => {
    dispatch(handleMonth(value));
    SetDate(value);
    dispatch(showChild(room, value, amount_day));
    dispatch({ type: "SET_LOADING_SPINNER", payload: false });
  };
  function hadleChangeRoom(target, date, amount_day) {
    dispatch({ type: "SET_LOADING_SPINNER", payload: false });
    dispatch(showChild(target, date, amount_day));
  }

  return (
    <>
      <div className="selectMonthAtt">
        <div className="field">
          <div className="control" 
            data-tooltip="เลือกเดือนที่จะดูข้อมูล"
          >
            <input
              className="form-control"
              type="month"
              value={date}
              onChange={({ target }) => handleDate(target.value)}
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
            <div className="select is-info"
              data-tooltip="เลือกห้องเรียนเด็ก"
            
            >
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
