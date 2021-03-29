import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bulma/css/bulma.css";
import "../../scss/font.scss";
import { selectChild } from "../../redux/actions/register";
const SelectChild = () => {
  const dispatch = useDispatch();
  const show_child = useSelector((state) => state.registerReducer.show_child);

  useEffect(() => {
    dispatch(selectChild());
  }, [dispatch]);
  function handleID(id) {
    dispatch({
      type: "SET_SELECT_ID",
      payload: id,
    });
  }
  return (
    <div>
      <div className="field">
        <div className="control">
          <div className="select is-info is-fullwidth">
            <select
              className="FontAll"
              style={{ fontSize: "19px" }}
              onChange={({ target }) => handleID(target.value)}
            >
              <option value={null}>กรุณาเลือกเด็กก่อน</option>
              {show_child !== []
                ? show_child.map((each) => (
                    <option value={each.child}>{each.name}</option>
                  ))
                : ""}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectChild;
