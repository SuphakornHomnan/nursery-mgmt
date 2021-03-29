import React, { useState } from "react";
import "bulma/css/bulma.css";
import { useDispatch } from "react-redux";
import moment from "moment";
import { showHistory } from "../../redux/actions/stock";
const Datebox = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const handleMonth = (month) => {
    dispatch(showHistory(month));
    setMonth(month);
  };
  return (
    <div style={{ textAlign: "left", margin: "1em" }}>
      <div className="field">
        <div className="control">
          <input
            className="form-control"
            type="month"
            value={month}
            onChange={({ target }) => handleMonth(target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default Datebox;
