/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import Navbar from "../components/navbar";
import { showQuitChild } from "../redux/actions/profile";
import {Spinner} from 'react-bootstrap'

const QuitChildHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr style={{ backgroundColor: "#F2EBE2" }}>
        <th>ลำดับ</th>
        <th>ชื่อ-นามสกุล</th>
        <th>ชื่อเล่น</th>
        <th>ห้องเรียนล่าสุดที่อยู่</th>
        <th>วันที่ออก</th>
      </tr>
    </thead>
  );
};

class QuitChildTable extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props)
  }
  render(){
    const { children } = this.props
    return (
      <table className="table is-hoverable is-fullwidth">
        <QuitChildHeader />
        <tbody className="FontTableRowSize">{children}</tbody>
      </table>
    );
  }
  
};

const QuitChildRow = ({ no, name, nickname, photoUrl, room, endDate }) => {
  return (
    <tr>
      <td>{no + 1}</td>
      <td>{name}</td>
      <td>{nickname}</td>
      <td>{room}</td>
      <td>{endDate}</td>
    </tr>
  );
};

const QuitChildPage = (props) => {
  const dispatch = useDispatch();
  const spinner = useSelector((state)=> state.attendanceReducer.spinner_modal)
  const listChild = useSelector((state) => state.profileReducer.quitChild);
  useEffect(() => {
    dispatch({
      type: 'SET_SPINNER_ATTEND_MODAL',
      payload: false
    })
    dispatch(showQuitChild());
  }, []);
  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <div>
            <h1 className="titleProfilePage">
              ประวัติเด็กที่ลาออก
              <button
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "0.5vw",
                    }}
                  >
                    <i className="far fa-file-pdf" style={{ color: "red" }}></i>
                  </button>
            </h1>
          </div>
          {spinner ? null : <Spinner animation="border" />}
          <div>
            <QuitChildTable>
              {listChild
                ? listChild.map((each, index) => (
                    <QuitChildRow key={each._id} {...each} no={index} />
                  ))
                : null}
            </QuitChildTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuitChildPage;
