import React from "react";
import "bulma/css/bulma.css";
import "../../scss/font.scss";
import { useDispatch } from "react-redux";
import { showStockHandle } from "../../redux/actions/stock";

const Size = () => {
  const dispatch = useDispatch();
  function handleSize(target) {
    dispatch(showStockHandle(target.value));
    dispatch({ type: "SET_SIZE", payload: target.value });
  }
  return (
    <div>
      <div className="field">
        <div className="control">
          <div className="select is-info">
            <select
              className="FontAll"
              onChange={({ target }) => handleSize(target)}
            >
              <option value={"S"}>ไซส์ S</option>
              <option value={"M"}>ไซส์ M</option>
              <option value={"L"}>ไซส์ L</option>
              <option value={"XL"}>ไซส์ XL</option>
              <option value={"2XL"}>ไซส์ 2XL</option>
              <option value={"Free Size"}>Free Size</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Size;
