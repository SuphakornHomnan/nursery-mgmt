import React, { useState, useEffect } from "react";
import moment from "moment";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import "../scss/responsive-attandance.scss";
import SelectRoom from "../components/attendanceModal/selectRoom";
import Modal from "../components/attendanceModal/modal";
import { useDispatch, useSelector } from "react-redux";
import { handleMonth } from "../redux/actions/date";
import { showChild, checkList_v2 } from "../redux/actions/attendance";
import { handleStatusClick } from "../helpers/buttonToggle";
import {Spinner} from 'react-bootstrap';
import Navbar from "../components/navbar";

const AttendancePage = (props) => {
  const loading = useSelector(
    (state) => state.attendanceReducer.loadingSpinner
  );

  const dispatch = useDispatch();
  const trigger = useSelector((state) => state.dateReducer.trigger);
  const list_child = useSelector((state) => state.attendanceReducer.list_child);
  const modal_child = useSelector(
    (state) => state.attendanceReducer.modal_list
  );
  const amount_day = useSelector((state) => state.dateReducer.list_date);
  const day_list = useSelector((state) => state.dateReducer.day_list);
  const dateFirst = moment().format("YYYY-MM");
  const select_date = useSelector(
    (state) => state.attendanceReducer.select_date
  );

  const [didMount, setDidMount] = useState(true);
  useEffect(() => {
    if (didMount) {
      async function fetchData() {
        await dispatch(handleMonth(moment().format("YYYY-MM")));
        dispatch(showChild("ห้อง ก1", dateFirst, amount_day));
      }
      fetchData();
      setDidMount(false);
    }
  }, [dispatch, list_child, didMount, amount_day, dateFirst]);

  useEffect(() => {
    if (trigger) {
      dispatch({ type: "DOWN_TRIGGER" });
    }
  });

  function handleCloseModal(event) {
    setModalState(event);
  }




  const [modalState, setModalState] = useState(false);
  const attend_tag = list_child.map((attendance) => (
    <AttendanceRow key={attendance._id} {...attendance} />
  ));

  let model_attend_tag = modal_child.map((attendance) => (
    <ModalTableRow
      key={attendance._id}
      {...attendance}
      select_date={select_date}
    />
  ));
  return (
    <>
      <div className="mb-payment mt1">
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <div>
            <h1 className="titleAttPage">
              ตารางแสดงการมาเรียน
              <button
                    style={{
                      marginLeft: "0.25em",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    <i className="far fa-file-pdf" style={{ color: "red" }}></i>
                  </button>
            </h1>
          </div>

          {loading ? null : <Spinner animation="border" />}
          <div className="dropdownAtt">
            <SelectRoom />
          </div>
          {/* Render Component */}
          
          <AttendanceTable day_list={day_list}>
            {attend_tag} 
          </AttendanceTable>
          <button
            className="button is-success  FontAll btnSize"
            onClick={() => setModalState(!modalState)}
          >
            เช็คชื่อ
            <i
              className="fas fa-pencil-alt"
              style={{
                marginLeft: "0.25em",
                fontSize: "1em",
              }}
            ></i>
          </button>
          {modalState ? (
            <Modal closeModal={() => handleCloseModal(!modalState)}>
              <ModalTable>{model_attend_tag}</ModalTable>
            </Modal>
          ) : null}
        </div>
      </div>
    </>
  );
};

const ModalTableHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>สถานะ</th>
      </tr>
    </thead>
  );
};

const ModalTable = ({ children }) => {
  return (
    <div className="modal-attendance">
      <table className="table is-hoverable is-fullwidth">
      <ModalTableHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
    </div>
  );
};

const ModalTableRow = ({
  _id,
  no,
  name,
  nickname,
  select_date,
  selectedDateCheck,
  color,
}) => {
  const dispatch = useDispatch();
  const [attend, setAttend] = useState(selectedDateCheck);
  const trigger = useSelector((state) => state.attendanceReducer.date_change);
  useEffect(() => {
    if (trigger) {
      setAttend(selectedDateCheck);
      dispatch({ type: "SET_DATE_CHANGE", payload: false });
    }
  }, [trigger, dispatch, setAttend, selectedDateCheck]);



  let show_check =
    attend === true ? (
      <i className="fas fa-check has-text-success"></i>
    ) : attend === false ? (
      <i className="fas fa-times has-text-danger"></i>
    ) : (
      <i className="fas fa-minus"></i>
    );

  function handleClick(check) {
    let temp = handleStatusClick(check);
    dispatch(checkList_v2(_id, temp, select_date));
    setAttend(temp);
  }
  return (
    <tr>
      <th>{no}</th>
      <td style={{ color }}>{name}</td>
      <td style={{ color }}>{nickname}</td>
      <td>
        <button className="button is-light" onClick={() => handleClick(attend)}>
          {show_check}
        </button>
      </td>
    </tr>
  );
};

const AttendanceHeader = ({ day_list }) => {
  const attend_header =
    day_list !== undefined
      ? day_list.map((element) => <th key={element._id}>{element.Day}</th>)
      : null;
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th style={{width: '10%'}}>ชื่อเล่น</th>
        {attend_header}
      </tr>
    </thead>
  );
};

export class AttendanceTable extends React.Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { day_list, children } = this.props;
    return (
      <div className="attendance-table">
        <table className="table is-hoverable is-fullwidth">
        <AttendanceHeader day_list={day_list} />
        <tbody className="FontTableRowSize">{children}</tbody>
      </table>
      </div>
      
    );
  }
}

export const AttendanceRow = ({ _id, no, name, nickname, checking, color }) => {

  const checking_tag = checking.map((DayPerMonth) => (
    <td key={DayPerMonth._id}>
      {DayPerMonth.attend === true ? (
        <i className="fas fa-check has-text-success m-2"></i>
      ) : DayPerMonth.attend === false ? (
        <i className="fas fa-times has-text-danger m-2"></i>
      ) : null}
    </td>
  ));
  return (
    <tr key={_id}>
      <td>{no}</td>
      <td style={{ width: "20%", color }}>{name}</td>
      <td style={{ color }}>{nickname === "" ? "-" : nickname}</td>
      {checking_tag}
    </tr>
  );
};

export default AttendancePage;
