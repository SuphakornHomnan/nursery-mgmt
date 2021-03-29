import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import "../scss/responsive-gadget.scss";
import moment from "moment";
import SelectRoom from "../components/gadgetModal/selectRoom";
import Modal from "../components/gadgetModal/modal";
import { useSelector, useDispatch } from "react-redux";

import {
  showChildStarter,
  handleMilk,
  handlePamper,
  handleBottle,
  handleMilk_bottle,
  handleTowel,
} from "../redux/actions/gadget";
import { handleStatusClick_v2 } from "../helpers/buttonToggle";
import {Spinner} from 'react-bootstrap'
import Navbar from "../components/navbar";
import { modalChild } from "../redux/actions/attendance";

const ModalTableHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>นม</th>
        <th>แพมเพิส</th>
        <th>ขวดน้ำ</th>
        <th>ขวดนม</th>
        <th>ผ้าขนหนู</th>
      </tr>
    </thead>
  );
};

const ModalTable = ({ children }) => {
  return (
    <div className="gadget-table">
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
  no,
  _id,
  name,
  nickname,
  color,
  milk,
  pampers,
  waterbottle,
  milkbottle,
  towel,
  date,
  checkList,
  length,
}) => {
  const dispatch = useDispatch();
  const [milkCheck, setMilkCheck] = useState(milk);
  const [pampersCheck, setPampersCheck] = useState(pampers);
  const [waterbottleCheck, setWaterBottleCheck] = useState(waterbottle);
  const [milkbottleCheck, setMilkBottleCheck] = useState(milkbottle);
  const [towelCheck, setTowelCheck] = useState(towel);
  let value = null;

  return (
    <tr>
      <th>{no}</th>
      <td style={{ color }}>{name}</td>
      <td style={{ color }}>{nickname}</td>
      <td>
        <button
          className="button is-light"
          onClick={() => {
            value = handleStatusClick_v2(milkCheck);
            dispatch(handleMilk(_id, value, date));
            setMilkCheck(value);
          }}
        >
          {milkCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : milkCheck === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : milkCheck === false ? (
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
            value = handleStatusClick_v2(pampersCheck);
            dispatch(handlePamper(_id, value, date));
            setPampersCheck(value);
          }}
        >
          {pampersCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : pampersCheck === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : pampersCheck === false ? (
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
            value = handleStatusClick_v2(waterbottleCheck);
            dispatch(handleBottle(_id, value, date));
            setWaterBottleCheck(value);
          }}
        >
          {waterbottleCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : waterbottleCheck === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : waterbottleCheck === false ? (
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
            value = handleStatusClick_v2(milkbottleCheck);
            dispatch(handleMilk_bottle(_id, value, date));
            setMilkBottleCheck(value);
          }}
        >
          {milkbottleCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : milkbottleCheck === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : milkbottleCheck === false ? (
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
            value = handleStatusClick_v2(towelCheck);
            dispatch(handleTowel(_id, value, date));
            setTowelCheck(value);
          }}
        >
          {towelCheck === null ? (
            <i className="fas fa-minus"></i>
          ) : towelCheck === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : towelCheck === false ? (
            <i className="fas fa-times has-text-danger"></i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
    </tr>
  );
};

const GadgetHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>นม</th>
        <th>แพมเพิส</th>
        <th>ขวดน้ำ</th>
        <th>ขวดนม</th>
        <th>ผ้าขนหนู</th>
      </tr>
    </thead>
  );
};

const GadgetTable = ({ children }) => {
  return (
    <div className="gadget-table">
      <table
        className="table  is-hoverable
 is-fullwidth"
      >
        <GadgetHeader />
        <tbody className="FontTableRowSize">{children}</tbody>
      </table>
    </div>
  );
};

const GadgetRow = ({
  no,
  _id,
  name,
  nickname,
  date,
  milk,
  pampers,
  waterbottle,
  milkbottle,
  towel,
  color,
}) => {
  return (
    <tr key={date}>
      <th>{no}</th>
      <td style={{ color }}>{name}</td>
      <td style={{ color }}>{nickname === "" ? "-" : nickname}</td>
      {milk === true ? (
        <td>
          {" "}
          <i className="fas fa-check has-text-success m-2"></i>
        </td>
      ) : milk === false ? (
        <td>
          <i className="fas fa-times has-text-danger m-2"></i>
        </td>
      ) : (
        <td></td>
      )}
      {pampers === true ? (
        <td>
          {" "}
          <i className="fas fa-check has-text-success m-2"></i>
        </td>
      ) : pampers === false ? (
        <td>
          <i className="fas fa-times has-text-danger m-2"></i>
        </td>
      ) : (
        <td></td>
      )}
      {waterbottle === true ? (
        <td>
          {" "}
          <i className="fas fa-check has-text-success m-2"></i>
        </td>
      ) : waterbottle === false ? (
        <td>
          <i className="fas fa-times has-text-danger m-2"></i>
        </td>
      ) : (
        <td></td>
      )}
      {milkbottle === true ? (
        <td>
          {" "}
          <i className="fas fa-check has-text-success m-2"></i>
        </td>
      ) : milkbottle === false ? (
        <td>
          <i className="fas fa-times has-text-danger m-2"></i>
        </td>
      ) : (
        <td></td>
      )}
      {towel === true ? (
        <td>
          {" "}
          <i className="fas fa-check has-text-success m-2"></i>
        </td>
      ) : towel === false ? (
        <td>
          <i className="fas fa-times has-text-danger m-2"></i>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
};

const GadgetPage = (props) => {
  const loading = useSelector((state) => state.gadgetReducer.loadingSpinner);
  const dispatch = useDispatch();
  const amount_day = useSelector((state) => state.dateReducer.list_date);
  const list_child = useSelector((state) => state.gadgetReducer.list_child);
  const [modalState, setModalState] = useState(false);
  const [didMount, setDidMount] = useState(true);
  function handleCloseModal(event) {
    setModalState(!event);
    window.location.reload();
  }
  const select_date = useSelector(
    (state) => state.attendanceReducer.select_date
  );
  useEffect(() => {
    if (didMount) {
      async function fetchData() {
        dispatch(modalChild("ห้อง ก1", moment().format("YYYY-MM-DD")));
        dispatch(showChildStarter("ห้อง ก1", moment().format("YYYY-MM-DD")));
      }
      fetchData();
      setDidMount(false);
    }
  }, [dispatch, list_child, didMount]);
  useEffect(() => {}, [dispatch, amount_day]);
  return (
    <>
      <div>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <div className="mt1">
            <h1 className="titleGadgetPage">
              ตารางแสดงอุปกรณ์ประจำวัน
              <i
                className="fas fa-clipboard-check"
                style={{
                  color: "#FEC457",
                  marginLeft: "0.25em",
                  fontSize: "1em",
                }}
              ></i>
            </h1>
          </div>
          {loading ? null : <Spinner animation="border" />}
          <div className="dropdownGadget">
            <SelectRoom />
          </div>
          <GadgetTable>
            {list_child.map((gadget) => (
              <GadgetRow key={gadget._id} {...gadget} />
            ))}
          </GadgetTable>
          <button
            className="button is-success FontAll btnSize"
            onClick={() => setModalState(!modalState)}
          >
            เช็คอุปกรณ์ประจำวัน
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
              <ModalTable>
                {list_child.map((gadget) => (
                  <ModalTableRow
                    key={gadget._id}
                    {...gadget}
                    date={select_date}
                    length={list_child.length}
                  />
                ))}
              </ModalTable>
            </Modal>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default GadgetPage;
