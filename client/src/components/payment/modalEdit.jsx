import React from "react";
import "../../scss/responsive-payment.scss"
import "bulma/css/bulma.css";
import { useDispatch, useSelector } from "react-redux";
import { handleTransaction } from "../../redux/actions/payment";
const Modal = ({ closeModal, children }) => {
  const dispatch = useDispatch();
  const sendObj = useSelector((state) => state.paymentReducer.send_handle);

  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card widthModal">
          <header className="modal-card-head">
            <p className="modal-card-title">
              ชำระค่าเรียน
              <i
                className="far fa-money-bill-alt"
                style={{ marginLeft: "0.25em", fontSize: "1em" }}
              ></i>
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
              onClick={() => dispatch(handleTransaction(sendObj))}
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
