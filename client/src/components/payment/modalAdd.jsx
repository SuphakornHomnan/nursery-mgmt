import React from "react";
import "bulma/css/bulma.css";
import "../../scss/responsive-payment.scss"
import { useSelector, useDispatch } from "react-redux";
import { postTransaction } from "../../redux/actions/payment";

const Modal = ({ closeModal, children, child }) => {
  const sendObj = useSelector((state) => state.paymentReducer.send_add);
  const dispatch = useDispatch();

  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card widthModal">
          <header className="modal-card-head">
            <p className="modal-card-title">
              เพิ่มรายการบัญชีของ {child}
            </p>
            <br />
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">
            <button
              className="button is-success FontAll"
              onClick={() => {
                dispatch(postTransaction(sendObj));
              }}
            >
              บันทึก
            </button>
            <button className="button is-danger FontAll" onClick={closeModal}>
              ยกเลิก
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Modal;
