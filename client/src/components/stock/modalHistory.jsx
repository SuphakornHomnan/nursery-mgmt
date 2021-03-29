import React from "react";
import "bulma/css/bulma.css";
import Datebox from "./selectDate";
import {Spinner} from 'react-bootstrap'
import { useSelector } from "react-redux";

const Modal = ({ closeModal, children }) => {
  const loading = useSelector((state) => state.stockReducer.spinner_history);

  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              ประวัติ
              {loading ? (
                <i
                  className="fas fa-history"
                  style={{
                    marginLeft: "0.25em",
                    fontSize: "1em",
                  }}
                ></i>
              ) : (
                <Spinner animation="border" />
              )}
            </div>
            <br />
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <div style={{marginBottom:"1rem", width:"250px"}}>
              <Datebox />
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
