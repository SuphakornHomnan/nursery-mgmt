import React from "react";
import "bulma/css/bulma.css";

const Modal = ({ closeModal, children, name }) => {
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card" style={{ width: "70%" }}>
          <header className="modal-card-head">
            <p className="modal-card-title">สลิปทั้งหมดของ {name}</p>
            <br />
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">{children}</section>
        </div>
      </div>
    </>
  );
};
export default Modal;
