import React from "react";
import "bulma/css/bulma.css";
import { handleMonth } from "../redux/actions/date";

import { useDispatch } from "react-redux";

const Datebox = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: "left", margin: "1em" }}>
      <div className="field">
        <div className="control">
          <input
            className="form-control"
            type="date"
            onChange={({ target }) => dispatch(handleMonth(target))}
          />
        </div>
      </div>
    </div>
  );
};
export default Datebox;
