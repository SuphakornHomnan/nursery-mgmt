import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import "../../scss/font.scss";
import { useDispatch } from "react-redux";
import { getHistory } from "../../redux/actions/payment";
const SelectStatus = () => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(true);
  const handleStatus = (status) => {
    dispatch(getHistory(status));
  };

  useEffect(() => {
    if (didMount) {
      dispatch(getHistory("ค้างชำระ"));
      setDidMount(false);
    }
  }, [dispatch, didMount]);
  return (
    <div>
      <div className="field">
        <div
          className="control"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="select is-info is-fullwidth"
              data-tooltip="เลือกสถานะของบัญชี"
          >
            <select
              className="FontAll"
              onChange={({ target }) => handleStatus(target.value)}
            >
              <option>ค้างชำระ</option>
              <option>ชำระแล้ว</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};
export default SelectStatus;
