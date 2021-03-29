import React from "react";
import "bulma/css/bulma.css";
import { useSelector } from "react-redux";
import {Spinner} from 'react-bootstrap'

const Modal = ({ closeModal, children }) => {

  const showDayInModal = useSelector(
    (state) => state.attendanceReducer.show_date
  );
  const loading = useSelector((state) => state.healthReducer.loadingSpinner);
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {showDayInModal}
              {loading ? null : <Spinner animation="border" />}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">
            
          </footer>
        </div>
      </div>
    </>
  );
};
export default Modal;
