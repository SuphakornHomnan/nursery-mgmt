import React from "react";
import "bulma/css/bulma.css";
import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../redux/actions/profile";
import screening from "../../helpers/screenRequest";
import moment from "moment";
const Modal = ({ closeModal, children }) => {
  const dispatch = useDispatch();
  const sendListRedux = useSelector((state) => state.profileReducer.editObj);
  const profileTwo = useSelector((state) => state.profileReducer.child_info);

  const child_id = useSelector((state) => state.profileReducer._id);
  const sendReq = screening.profileInfoReq(
    profileTwo,
    sendListRedux,
    moment().format("YYYY-MM-DD")
  );
  function updateDetail() {
    dispatch(updateInfo(child_id, sendReq));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  return (
    <div>
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">แก้ไขข้อมูล</p>
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
              onClick={updateDetail}
            >
              บันทึก
            </button>
            <button className="button is-danger FontAll" onClick={closeModal}>
              ยกเลิก
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default Modal;
