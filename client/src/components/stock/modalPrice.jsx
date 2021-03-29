import React from "react";
import "bulma/css/bulma.css";
import {Spinner} from 'react-bootstrap'
import { useSelector } from "react-redux";

const ModalPrice = ({ closeModal, children }) => {
  const loading = useSelector((state) => state.stockReducer.spinner_modal);
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              ราคาของในคลัง
              <i
                className="fas fa-pencil-alt"
                style={{
                  marginLeft: "0.25em",
                  fontSize: "1em",
                }}
              ></i>
              {loading ? null : <Spinner animation="border" />}
            </div>
            <br />

            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>

          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot"></footer>
        </div>
      </div>
    </>
  );
};

export default ModalPrice
