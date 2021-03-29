import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import "../scss/responsive-health.scss";
import SelectRoom from "../components/healthModal/selectRoom";
import Modal from "../components/healthModal/modal";
import { handleStatusClick_v2 } from "../helpers/buttonToggle";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import {
  showChildStarter,
  handleBreakfast,
  handleCloth,
  handleEar,
  handleHead,
  handleNail,
  handleSkin,
  handleTemperature,
  handleWound,
} from "../redux/actions/health";
import { modalChild } from "../redux/actions/attendance";
import {Spinner} from 'react-bootstrap'
import Navbar from "../components/navbar";

const ModalTableHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>อาหารเช้า</th>
        <th>ศีรษะ</th>
        <th>หู/ใบหู</th>
        <th>เล็บ</th>
        <th>ผิวหนัง</th>
        <th>เสื้อผ้า</th>
        <th>ร่องรอยบาดแผล</th>
        <th>วัดไข้</th>
      </tr>
    </thead>
  );
};

const ModalTable = ({ children }) => {
  return (
    <div className="health-table">
      <table
        className="table  is-hoverable
 is-fullwidth"
      >
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
  color,
  breakfast,
  head,
  ear,
  nail,
  skin,
  clothing,
  wound,
  fever,
  date,
  length,
}) => {
  const dispatch = useDispatch();
  const [breakfastCheck, setBreakfast] = useState(breakfast),
    [headCheck, setHead] = useState(head),
    [earCheck, setEar] = useState(ear),
    [nailCheck, setNail] = useState(nail),
    [skinCheck, setSkin] = useState(skin),
    [clothCheck, setCloth] = useState(clothing),
    [woundCheck, setWound] = useState(wound),
    [feverCheck, setFever] = useState(fever);
  let status = null;

  return (
    <tr>
      <th>{no}</th>
      <td style={{ color }}>{name}</td>
      <td style={{ color }}>{nickname}</td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(breakfastCheck);
            dispatch(handleBreakfast(_id, status, date));
            setBreakfast(status);
          }}
        >
          {breakfastCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : breakfastCheck === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : breakfastCheck === false ? (
            <i className="fas fa-times has-text-danger"></i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(headCheck);
            dispatch(handleHead(_id, status, date));
            setHead(status);
          }}
        >
          {headCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : headCheck === true ? (
            <i className="normal-color">ปกติ</i>
          ) : headCheck === false ? (
            <i className="defective-color">ไม่ปกติ</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(earCheck);
            dispatch(handleEar(_id, status, date));
            setEar(status);
          }}
        >
          {earCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : earCheck === true ? (
            <i className="normal-color">ปกติ</i>
          ) : earCheck === false ? (
            <i className="defective-color">ไม่ปกติ</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(nailCheck);
            dispatch(handleNail(_id, status, date));
            setNail(status);
          }}
        >
          {nailCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : nailCheck === true ? (
            <i className="normal-color">ปกติ</i>
          ) : nailCheck === false ? (
            <i className="defective-color">ไม่ปกติ</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(skinCheck);
            dispatch(handleSkin(_id, status, date));
            setSkin(status);
          }}
        >
          {skinCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : skinCheck === true ? (
            <i className="normal-color">ปกติ</i>
          ) : skinCheck === false ? (
            <i className="defective-color">ไม่ปกติ</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(clothCheck);
            dispatch(handleCloth(_id, status, date));
            setCloth(status);
          }}
        >
          {clothCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : clothCheck === true ? (
            <i className="normal-color">ปกติ</i>
          ) : clothCheck === false ? (
            <i className="defective-color">ไม่ปกติ</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(woundCheck);
            dispatch(handleWound(_id, status, date));
            setWound(status);
          }}
        >
          {woundCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : woundCheck === true ? (
            <i className="normal-color">ไม่มี</i>
          ) : woundCheck === false ? (
            <i className="defective-color">มี</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            status = handleStatusClick_v2(feverCheck);
            dispatch(handleTemperature(_id, status, date));
            setFever(status);
          }}
        >
          {feverCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : feverCheck === true ? (
            <i className="normal-color">ปกติ</i>
          ) : feverCheck === false ? (
            <i className="defective-color">ป่วย</i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
    </tr>
  );
};

const HealthHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>อาหารเช้า</th>
        <th>ศีรษะ</th>
        <th>หู/ใบหู</th>
        <th>เล็บ</th>
        <th>ผิวหนัง</th>
        <th>เสื้อผ้า</th>
        <th>ร่องรอยบาดแผล</th>
        <th>วัดไข้</th>
      </tr>
    </thead>
  );
};

const HealthTable = ({ children }) => {
  return (
    <div className="health-table">
      <table
        className="table  is-hoverable
 is-fullwidth"
      >
        <HealthHeader />
        <tbody className="FontTableRowSize">{children}</tbody>
      </table>
    </div>
  );
};

const HealthRow = ({
  _id,
  no,
  name,
  nickname,
  color,
  date,
  breakfast,
  head,
  ear,
  nail,
  skin,
  clothing,
  wound,
  fever,
}) => {
  return (
    <tr key={date}>
      <th>{no}</th>
      <td style={{ color }}>{name}</td>
      <td style={{ color }}>{nickname === "" ? "-" : nickname}</td>
      {breakfast === true ? (
        <td>
          {" "}
          <i className="fas fa-check has-text-success m-2"></i>
        </td>
      ) : breakfast === false ? (
        <td>
          <i className="fas fa-times has-text-danger m-2"></i>
        </td>
      ) : (
        <td></td>
      )}
      {head === true ? (
        <td>
          <i className="normal-color">ปกติ</i>
        </td>
      ) : head === false ? (
        <td>
          <i className="defective-color">ไม่ปกติ</i>
        </td>
      ) : (
        <td></td>
      )}
      {ear === true ? (
        <td>
          <i className="normal-color">ปกติ</i>
        </td>
      ) : ear === false ? (
        <td>
          <i className="defective-color">ไม่ปกติ</i>
        </td>
      ) : (
        <td></td>
      )}
      {nail === true ? (
        <td>
          {" "}
          <i className="normal-color">ปกติ</i>
        </td>
      ) : nail === false ? (
        <td>
          <i className="defective-color">ไม่ปกติ</i>
        </td>
      ) : (
        <td></td>
      )}
      {skin === true ? (
        <td>
          {" "}
          <i className="normal-color">ปกติ</i>
        </td>
      ) : skin === false ? (
        <td>
          <i className="defective-color">ไม่ปกติ</i>
        </td>
      ) : (
        <td></td>
      )}
      {clothing === true ? (
        <td>
          {" "}
          <i className="normal-color">ปกติ</i>
        </td>
      ) : clothing === false ? (
        <td>
          <i className="defective-color">ไม่ปกติ</i>
        </td>
      ) : (
        <td></td>
      )}
      {wound === true ? (
        <td>
          <i className="normal-color">ไม่มี</i>
        </td>
      ) : wound === false ? (
        <td>
          <i className="defective-color">มี</i>
        </td>
      ) : (
        <td></td>
      )}
      {fever === true ? (
        <td>
          <i className="normal-color">ปกติ</i>
        </td>
      ) : fever === false ? (
        <td>
          <i className="defective-color">ป่วย</i>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
};

const HealthPage = (props) => {
  const dispatch = useDispatch();
  const amount_day = useSelector((state) => state.dateReducer.list_date);
  const list_child = useSelector((state) => state.healthReducer.list_child);
  const [modalState, setModalState] = useState(false);
  const loading = useSelector((state) => state.healthReducer.loadingSpinner);
  const [didMount, setDidMount] = useState(true);
  const select_date = useSelector(
    (state) => state.attendanceReducer.select_date
  );
  function handleCloseModal(event) {
    setModalState(!event);
    window.location.reload();
  }
  useEffect(() => {
    if (didMount) {
      async function fetchData() {
        dispatch(modalChild("ห้อง ก1", moment().format("YYYY-MM-DD")));
        dispatch(
          showChildStarter("ห้อง ก1", moment().format("YYYY-MM-DD"), amount_day)
        );
      }
      fetchData();
      setDidMount(false);
    }
  }, [dispatch, list_child, didMount, amount_day]);

  const health_row = list_child.map((health) => (
    <HealthRow key={health._id} {...health} />
  ));
  const modal_row = list_child.map((health) => (
    <ModalTableRow
      key={health._id}
      {...health}
      select_date={select_date}
      length={list_child.length}
    />
  ));
  return (
    <>
      <div>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <div className="mt1">
            <h1 className="titleHealthPage">
              ตารางแสดงสุขภาพประจำวัน{" "}
              <i className="fas fa-first-aid" style={{ color: "#FE3E2F" }}></i>
            </h1>
          </div>
          {loading ? null : <Spinner animation="border" />}
          <div className="dropdownHealth">
            <SelectRoom />
          </div>
          <HealthTable>{health_row}</HealthTable>
          <button
            className="button is-success FontAll btnSize"
            onClick={() => setModalState(!modalState)}
          >
            เช็คสุขภาพประจำวัน
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
              <ModalTable>{modal_row}</ModalTable>
            </Modal>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default HealthPage;
