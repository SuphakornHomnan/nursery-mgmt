import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { useSelector, useDispatch } from "react-redux";
import { modalChild } from "../../redux/actions/attendance";
import moment from "moment";
import {Spinner} from 'react-bootstrap'

const Modal = ({ closeModal, children }) => {
  const dispatch = useDispatch();
  const showDayInModal = useSelector(
    (state) => state.attendanceReducer.show_date
  );
  const room = useSelector((state) => state.roomReducer.room);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [didMount, setDidMount] = useState(true);
  const loading = useSelector((state) => state.attendanceReducer.spinner_modal);

  useEffect(() => {
    async function fetchData() {
      dispatch(modalChild(room, date));
    }
    if (didMount) {
      fetchData();
      setDidMount(false);
    }
  }, [didMount, dispatch, date, room]);

  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">

            <div className="modal-card-title">{showDayInModal}
              {loading ? null : <Spinner animation="border" />}
            </div>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>

          </header>

          <section className="modal-card-body">
            <div className="control" style={{display: 'flex', justifyContent: 'flex-end'}}>
              <input
                className="form-control"
                style={{marginBottom:"1rem", width:"200px"}}
                type="date"
                value={date}
                onChange={({ target }) => {
                  dispatch({ type: "SET_LOADING_SPINNER", payload: false });

                  dispatch(modalChild(room, target.value));
                  setDate(target.value);
                }}
              />
            </div>
            {children}
            </section>
          <footer className="modal-card-foot">

          </footer>
        </div>
      </div>
    </>
  );
};
export default Modal;
