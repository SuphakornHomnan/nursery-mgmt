/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import "../scss/responsive-homepage.scss";
import Navbar from "../components/navbar";
import AttandanceChart from "../components/charts/attandanceChart";
import HealthChart from "../components/charts/healthChart";
import GadgetChart from "../components/charts/gadgetChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getChildChartAttend,
  getChildChartGadget,
  getChildChartHealth,
} from "../redux/actions/chart";
import { checkList_v2 } from "../redux/actions/attendance";
import {
  handleBreakfast,
  handleCloth,
  handleEar,
  handleHead,
  handleNail,
  handleSkin,
  handleTemperature,
  handleWound,
} from "../redux/actions/health";
import {
  handleMilk,
  handlePamper,
  handleBottle,
  handleMilk_bottle,
  handleTowel,
} from "../redux/actions/gadget";
import { handleStatusClick_v2 } from "../helpers/buttonToggle";
import {Spinner} from 'react-bootstrap'

const ModalTableHeader = ({ name }) => {
  return (
    <thead className="FontTableHeaderSize">
      <tr style={{ backgroundColor: "#F2EBE2" }}>
        <th>{name}</th>
        <th>สถานะ</th>
      </tr>
    </thead>
  );
};

export const ModalTable = ({ children, name }) => {
  return (
    <table className="table is-hoverable is-fullwidth">
      <ModalTableHeader name={name} />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
  );
};

export const ModalTableRow = ({ name, status, childId, date }) => {
  const dispatch = useDispatch();
  const [statusModal, setStatus] = useState(null);
  useEffect(() => {
    setStatus(status);
  }, [status]);

  function handleCheck(check, name) {
    const temp = handleStatusClick_v2(check);
    if (name === "มาเรียน/ไม่มาเรียน") {
      dispatch(checkList_v2(childId, temp, date));
    } else if (name === "นม") {
      dispatch(handleMilk(childId, temp, date));
    } else if (name === "แพมเพิส") {
      dispatch(handlePamper(childId, temp, date));
    } else if (name === "ขวดน้ำ") {
      dispatch(handleBottle(childId, temp, date));
    } else if (name === "ขวดนม") {
      dispatch(handleMilk_bottle(childId, temp, date));
    } else if (name === "ผ้าขนหนู") {
      dispatch(handleTowel(childId, temp, date));
    } else if (name === "อาหารเช้า") {
      dispatch(handleBreakfast(childId, temp, date));
    } else if (name === "เสื้อผ้า") {
      dispatch(handleCloth(childId, temp, date));
    } else if (name === "ศีรษะ") {
      dispatch(handleEar(childId, temp, date));
    } else if (name === "หู/ใบหู") {
      dispatch(handleHead(childId, temp, date));
    } else if (name === "เล็บ") {
      dispatch(handleNail(childId, temp, date));
    } else if (name === "ผิวหนัง") {
      dispatch(handleSkin(childId, temp, date));
    } else if (name === "ร่องรอยบาดแผล") {
      dispatch(handleTemperature(childId, temp, date));
    } else if (name === "วัดไข้") {
      dispatch(handleWound(childId, temp, date));
    }
    // dispatch(getCheckInfo(childId, date))
    setStatus(temp);
  }
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button
          className="button is-light"
          onClick={() => handleCheck(statusModal, name)}
        >
          {statusModal === true ? (
            <i className="fas fa-check has-text-success"></i>
          ) : statusModal === false ? (
            <i className="fas fa-times has-text-danger"></i>
          ) : (
            <i className="fas fa-minus"></i>
          )}
        </button>
      </td>
    </tr>
  );
};

const Welcome = (props) => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.chartReducer.month);
  const loading = useSelector((state) => state.chartReducer.spinnerChart);

  useEffect(() => {
    dispatch({
      type: "SET_SPINNER_CHART",
      payload: false,
    });
    dispatch(getChildChartAttend(props.match.params.id, date));
    dispatch(getChildChartGadget(props.match.params.id, date));
    dispatch(getChildChartHealth(props.match.params.id, date));
    dispatch({
      type: "SET_MONTH_CHART",
      payload: date,
    });
    dispatch({
      type: "SET_SPINNER_CHART",
      payload: true,
    });
  }, []);
  function handleDate(date) {
    dispatch({
      type: "SET_SPINNER_CHART",
      payload: false,
    });
    dispatch(getChildChartAttend(props.match.params.id, date));
    dispatch(getChildChartGadget(props.match.params.id, date));
    dispatch(getChildChartHealth(props.match.params.id, date));
    dispatch({
      type: "SET_MONTH_CHART",
      payload: date,
    });
    dispatch({
      type: "SET_SPINNER_CHART",
      payload: true,
    });
  }

  return (
    <div>
      <Navbar />
      <div className="Allcontent">
        <h1 className="titleHomePage">
          กราฟแสดงข้อมูลของน้อง{props.match.params.name}ในแต่ละเดือน
        </h1>
        {loading ? null : <Spinner animation="border" />}
        <div className="dropdown">
          <div className="selectHome">
            <div className="field">
              <div className="control" data-tooltip="เลือกเดือนที่จะดูข้อมูล">
                <input
                  className="form-control"
                  type="month"
                  value={date}
                  onChange={({ target }) => handleDate(target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <AttandanceChart />
        <HealthChart />
        <GadgetChart />
      </div>
    </div>
  );
};

export default Welcome;
