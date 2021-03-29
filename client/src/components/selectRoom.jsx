import React from "react";
import "bulma/css/bulma.css";
import "../scss/font.scss";
import { handleRoomChange } from "../redux/actions/profile";
import { useDispatch } from "react-redux";
const SelectRoom = () => {
  function handleChangeRoom(target) {
    dispatch({ type: "SET_LOADING_SPINNER", payload: false });
    dispatch(handleRoomChange(target));
  }

  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "left", margin: "1em" }}>
      <div className="field">
        <div
          className="control"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="select is-info" data-tooltip="เลือกห้องเรียนเด็ก">
            <select
              className="FontAll"
              onChange={({ target }) => handleChangeRoom(target.value)}
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
  );
};
export default SelectRoom;
