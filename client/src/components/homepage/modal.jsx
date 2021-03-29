import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {Spinner} from 'react-bootstrap'
import { getCheckInfo } from "../../redux/actions/chart";

const Modal = ({ closeModal, children, childId }) => {
  const loading = useSelector((state) => state.chartReducer.spinnerChart);
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    dispatch({
      type: "SET_SPINNER_CHART",
      payload: false,
    });
    dispatch(getCheckInfo(childId, date));
  }, [childId, date, dispatch]);
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">ตารางเช็คข้อมูลทุกอย่างรายวัน</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <div>{loading ? null : <Spinner animation="border" />}</div>

            <div
              className="control"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {/* มาเอาออกในภายหลัง */}
              <p style={{ color: "red", marginRight: "0.5vw" }}>
                เลือกวันที่เช็คทางนี้ ====={">"}
              </p>
              <input
                className="form-control"
                style={{ marginBottom: "1rem", width: "200px" }}
                type="date"
                value={date}
                onChange={({ target }) => {
                  dispatch(getCheckInfo(childId, target.value));
                  setDate(target.value);
                }}
              />
            </div>
            {children}
          </section>
          <footer className="modal-card-foot"></footer>
        </div>
      </div>
    </>
  );
};
export default Modal;
