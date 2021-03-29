import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import "../scss/responsive-profile.scss";
import SelectRoom from "../components/selectRoom";
import ModalSlip from "../components/profileInfo/modalSlip";
import ModalSlipContent from "../components/profileInfo/modalSlipContent";
import { useSelector, useDispatch } from "react-redux";
import { addCustomerNo } from "../redux/actions/child";
import { handleRoomChange, quitRoom } from "../redux/actions/profile";
import { withRouter } from "react-router";
import {Spinner} from 'react-bootstrap'
import Navbar from "../components/navbar";
import Modal from "../components/homepage/modal";
import { ModalAddContent } from "../page/paymentPage";
import ModalAdd from "../components/payment/modalAdd";
import { ModalTable, ModalTableRow } from "../page/welcome";
import { getCheckInfo } from "../redux/actions/chart";

const ProfileHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>เพศ</th>
        <th>ปี</th>
        <th>เดือน</th>
        <th>น้ำหนัก</th>
        <th>ส่วนสูง</th>
        <th>น้ำหนักเทียบกับอายุ</th>
        <th>ส่วนสูงเทียบกับอายุ</th>
        <th>น้ำหนักเทียบกับส่วนสูง</th>
      </tr>
    </thead>
  );
};

const ProfileTable = ({ children }) => {
  return (
    <table className="table is-hoverable is-fullwidth">
      <ProfileHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
  );
};

const ProfileRow = withRouter(
  ({
    _id,
    no,
    name,
    nickname,
    sex,
    sex_color,
    age,
    weight,
    height,
    weightPerAge,
    heightPerAge,
    weightPerHeight,
    colorOne,
    colorTwo,
    colorThree,
    history,
  }) => {
    const [modalState, setModalState] = useState(false);
    const [modalSlipState, setModalSlipState] = useState(false);
    const [modalAddState, setModalAddState] = useState(false);
    const [editCustomerNo, setEditCustomerNo] = useState(false);
    const [customerNo, setCustomerNo] = useState(null);
    const dateRedux = useSelector((state) => state.chartReducer.date);
    const data = useSelector((state) => state.chartReducer.childModal);
    const dispatch = useDispatch();
    function handleCloseModal() {
      setModalState(false);
    }

    function addCustomer(customerId, childId) {
      dispatch(addCustomerNo(customerId, childId));
      setEditCustomerNo(false);
      setCustomerNo(null);
    }

    return (
      <tr>
        <th>{no}</th>
        <td>
          <div
            onClick={() => {
              setModalState(!modalState);
              dispatch(getCheckInfo(_id, dateRedux));
            }}
            data-tooltip="เช็คข้อมูลรายวัน"
            className="nameCheck"
          >
            {name}
          </div>
          {modalState ? (
            <Modal
              closeModal={() => handleCloseModal(!modalState)}
              childId={_id}
            >
              <ModalTable name={nickname}>
                {data.map((info) => (
                  <ModalTableRow
                    key={info.name}
                    {...info}
                    childId={_id}
                    date={dateRedux}
                  />
                ))}
              </ModalTable>
            </Modal>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button
              className="btnChart"
              onClick={() => history.push(`/home/${_id}/${nickname}`)}
              data-tooltip="ดูข้อมูลรายเดือน"
            >
              <i className="fas fa-chart-bar"></i>
            </button>
            {localStorage.getItem("role") === "accountant" ||
            localStorage.getItem("role") === "admin" ? (
              <button
                className="btnProfileInfo"
                onClick={() => history.push(`/profileInfoPage/${_id}`)}
                data-tooltip="ดูข้อมูลส่วนตัว"

              >
                <i className="far fa-id-badge"></i>
              </button>
            ) : null}
            {localStorage.getItem("role") === "accountant" ||
            localStorage.getItem("role") === "admin" ? (
              <button
                className="btnBill"
                onClick={() => setModalAddState(!modalAddState)}
              data-tooltip="เพิ่มรายการบัญชี"

              >
                <i className="fas fa-file-invoice-dollar"></i>
              </button>
            ) : null}
            {modalAddState ? (
              <ModalAdd
                closeModal={() => setModalAddState(false)}
                child={nickname}
              >
                <ModalAddContent child={_id} />
              </ModalAdd>
            ) : null}
            <button
              className="btnslip"
              onClick={() => setModalSlipState(!modalSlipState)}
              data-tooltip="ดูสลิปทั้งหมด"

            >
              <i className="fas fa-search-dollar"></i>
            </button>
            <button
              className="btnDelete"
              data-tooltip="ลบเด็กออกจากเนอสเซอรี่"

              onClick={() => {
                if (
                  window.confirm(
                    "คุณแน่ใจแล้วใช่ไหมที่จะลบเด็กคนนี้ออกจากการเป็นเด็กในเนอสเซอรี่นี้?"
                  )
                ) {
                  // Save it!
                  dispatch(quitRoom(_id));
                  window.location.reload();
                  console.log("Thing was saved to the database.");
                } else {
                  // Do nothing!
                  console.log("Thing was not saved to the database.");
                }
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            {modalSlipState ? (
              <ModalSlip
                closeModal={() => setModalSlipState(!modalSlipState)}
                name={nickname}
              >
                <ModalSlipContent child={_id} />
              </ModalSlip>
            ) : null}
          </div>
        </td>
        <td>
          {nickname === "" ? "-" : nickname}
          {editCustomerNo ? (
            <div>
              <input
                type="text"
                className="customer-no-input"
                onChange={({ target }) => setCustomerNo(target.value)}
              />
              <button
                className="button is-success"
                onClick={()=> addCustomer(customerNo, _id)}
              >
                บันทึก
              </button>
              <button
                className="button is-danger"
                onClick={() => setEditCustomerNo(false)}
              >
                ยกเลิก
              </button>
            </div>
          ) : (
            <button
              className="add-customer-no"
              data-tooltip="เพิ่มรหัสลูกค้า"
              onClick={() => setEditCustomerNo(true)}
            >
              <i className="fas fa-user-plus"></i>
            </button>
          )}
        </td>
        <td style={{ color: sex_color }}>
          {sex === 1 ? (
            <i className="fas fa-mars"></i>
          ) : (
            <i className="fas fa-venus"></i>
          )}
        </td>
        <td>{age.year}</td>
        <td>{age.month}</td>
        <td>{weight === null ? "-" : weight}</td>
        <td>{height === null ? "-" : height}</td>
        <td style={{ color: colorOne }}>
          {weightPerAge === undefined ? "-" : weightPerAge}
        </td>
        <td style={{ color: colorTwo }}>
          {heightPerAge === undefined ? "-" : heightPerAge}
        </td>
        <td style={{ color: colorThree }}>
          {weightPerHeight === undefined ? "-" : weightPerHeight}
        </td>
      </tr>
    );
  }
);

const ProfilePage = (props) => {
  const loading = useSelector((state) => state.profileReducer.loadingSpinner);
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(true);
  const list_child = useSelector((state) => state.profileReducer.list_child);

  useEffect(() => {
    if (didMount) {
      async function fetchData() {
        await dispatch(handleRoomChange("ห้อง ก1"));
        if (list_child !== []) {
          dispatch({ type: "SET_LOADING_SPINNER", payload: true });
        }
      }
      fetchData();
      setDidMount(false);
    }
  }, [dispatch, list_child, didMount]);
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.reload();
      window.location.pathname = "/";
    }
  });
  const profile_list =
    list_child.data !== undefined
      ? list_child.data.map((profile) => (
          <ProfileRow key={profile._id} {...profile} />
        ))
      : null;
  return (
    <>
      <div>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <div className="mt1">
            <h1 className="titleProfilePage">
              ประวัติเด็ก
              <i
                className="fas fa-id-badge"
                style={{ marginLeft: "0.5rem", color: "#69C9F9" }}
              ></i>
            </h1>
          </div>
          {loading ? null : <Spinner animation="border" />}
          <SelectRoom />
          <div className='table-profile'>
            <ProfileTable>{profile_list}</ProfileTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
