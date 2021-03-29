import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import "../scss/responsive-payment.scss";
import Navbar from "../components/navbar";
import SelectStatus from "../components/payment/selectStatus";
import ModalEdit from "../components/payment/modalEdit";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../helpers/handletoggle";
import { convertCode } from "../helpers/convertCode";
import { useHistory } from "react-router";
import moment from "moment";
import { storage } from "../firebase";
import {Spinner} from 'react-bootstrap'

export const ModalAddContent = ({ child }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');
  const [type, setType] = useState("ค่าเรียน");
  const [topic, setTopic] = useState("001-ชุดนักเรียน");
  const [trigger, setTrigger] = useState(false);
  const [expDate, setExpDate] = useState('');
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("S");

  useEffect(() => {
    if (trigger) {
      dispatch({
        type: "SET_SEND_ADD_OBJ",
        payload: {
          child,
          total_price: price,
          date: moment().format("YYYY-MM-DD"),
          expDate,
          type,
          topic,
          amount,
          size,
        },
      });
      setTrigger(false);
    }
  }, [trigger, dispatch, child, price, type, topic, amount, expDate, size]);
  return (
    <div>
      <div className="showModalScreen">
        <div style={{ textAlign: "left" }}>
          <label style={{ fontSize: "20px" }}>ประเภท</label>
          <div className="field">
            <div className="control">
              <div className="select is-info">
                <select
                  className="FontAll"
                  style={{ fontSize: "19px" }}
                  onChange={({ target }) => {
                    setType(target.value);
                    setTrigger(true);
                  }}
                >
                  <option value="ค่าเรียน">ค่าเรียน</option>
                  <option value="ค่าเครื่องแบบ">ค่าเครื่องแบบ</option>
                  <option value="ชุดฟอร์มต่างๆ">ชุดฟอร์มต่างๆ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-label increase-top-date-input">
        <label className="left-text">วันที่ครบกำหนด</label>
        <input
          className="input"
          type="date"
          value={expDate}
          onChange={({ target }) => setExpDate(target.value)}
        />
      </div>
      <div>
        <p
          className="has text-black"
          style={{ fontSize: "20px", textAlign: "left", marginTop: "1em" }}
        >
          กำหนดชื่อรายการ
        </p>
        {type === "ชุดฟอร์มต่างๆ" ? (
          <div className="column">
            <div className="l-align">
              <select
                className="select m-2 is-info FontAll topice-order"
                onChange={({ target }) => {
                  setTopic(target.value);
                  setTrigger(true);
                }}
              >
                <option value="001-ชุดนักเรียน">001-ชุดนักเรียน</option>
                <option value="002-ชุดเดรส">002-ชุดเดรส</option>
                <option value="003-กางเกงนักเรียน">003-กางเกงนักเรียน</option>
                <option value="004-ชุดนอน">004-ชุดนอน</option>
                <option value="005-ชุดพละ">005-ชุดพละ</option>
                <option value="006-เอี้ยม">006-เอี้ยม(ไม่มีไซต์2XL)</option>
                <option value="007-ถุงผ้า">
                  007-ถุงผ้า(มีแค่ฟรีไซต์เท่านั้น)
                </option>
                <option value="008-กระเป๋านักเรียน">
                  008-กระเป๋านักเรียน(มีแค่ฟรีไซต์เท่านั้น)
                </option>
              </select>
              <select
                className="select m-2 is-info FontAll size-order"
                onChange={({ target }) => {
                  setSize(target.value);
                  setTrigger(true);
                }}
              >
                <option value="S">ไซต์ S</option>
                <option value="M">ไซต์ M</option>
                <option value="L">ไซต์ L</option>
                <option value="XL">ไซต์ XL</option>
                <option value="2XL">ไซต์ 2XL</option>
                <option value="FREE SIZE">ฟรีไซต์</option>
              </select>
            </div>
            <div className="column l-align m-2">
              <label className="">จำนวน</label>
              <input
                type="number"
                className=""
                style={{ width: "46%" }}
                min={1}
                value={amount}
                onChange={({ target }) => {
                  setAmount(target.value);
                  setTrigger(true);
                }}
              />
            </div>
          </div>
        ) : (
          <input
            className="input is-normal"
            type="text"
            onChange={({ target }) => {
              setTopic(target.value);
              setTrigger(true);
            }}
          />
        )}

        <p
          className="has text-black"
          style={{ fontSize: "20px", textAlign: "left", marginTop: "1em" }}
        >
          ยอดที่ต้องชำระทั้งหมด
        </p>
        <input
          className="input"
          type="text"
          onChange={({ target }) => {
            setPrice(target.value);
            setTrigger(true);
          }}
        />
      </div>
    </div>
  );
};

const ModalEditContent = (payment_id) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [outstanding_balance, setPrice] = useState(null);
  const [slip, setSlip] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [progress, setProgress] = useState(0);
  const [click, setClick] = useState(false);
  const id = payment_id.payment_id;
  const handleChangePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const uploadImg = () => {
    if (photo !== null) {
      let img = photo;
      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error.message);
        },
        async () => {
          await storage
            .ref("images")
            .child(img.name)
            .getDownloadURL()
            .then(async (url) => {
              setSlip(url);
              setTrigger(true);
            });
        }
      );
    }
  };

  useEffect(() => {
    if (trigger) {
      // dispatch(getChildHandle(info.type));
      dispatch({
        type: "SET_SEND_HANDLE_OBJ",
        payload: {
          outstanding_balance,
          slip,
          payment_id: id,
        },
      });
      setTrigger(false);
    }
  }, [trigger, dispatch, id, outstanding_balance, slip]);
  return (
    <div>
      <div>
        <p
          className="has text-black"
          style={{ fontSize: "20px", marginTop: "1em", textAlign: "left" }}
        >
          จำนวนเงินที่ชำระ
        </p>
        <input
          className="input"
          type="text"
          onChange={({ target }) => {
            setPrice(target.value);
            setTrigger(true);
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={click}
            onChange={() => {
              let temp = false;
              temp = toggle(click);

              setClick(temp);
              if (temp) {
                setSlip(
                  "https://firebasestorage.googleapis.com/v0/b/nursery-upload.appspot.com/o/images%2F%E0%B9%81%E0%B8%99%E0%B8%9A%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%81.png?alt=media&token=1a8bc584-c1ce-44e3-a3f9-591a442d6afe"
                );
              } else {
                setSlip(null);
              }
              setTrigger(true);
            }}
          />
          <label>แนบสลิปใบเสร็จส่งแยกภายนอก</label>
        </label>
      </div>
      {click ? null : (
        <>
          <p
            className="has text-black"
            style={{ fontSize: "20px", marginTop: "1em", textAlign: "left" }}
          >
            รูป slip
          </p>
          <input
            className="input is-hovered"
            type="file"
            onChange={handleChangePhoto}
          />
          <button
            className="button FontAll is-primary"
            style={{ width: "100%", marginTop: "0.25em" }}
            onClick={uploadImg}
          >
            อัพโหลดภาพ
          </button>
          <progress
            value={progress}
            max="100"
            className="progress is-info"
            style={{ marginTop: "0.25em" }}
          />
        </>
      )}
    </div>
  );
};

const PaymentHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr style={{ backgroundColor: "#F2EBE2" }}>
        <th>No</th>
        <th>เลขที่ใบแจ้งยอด</th>
        <th>ชื่อรายการ</th>
        <th>ประเภท</th>
        <th>ของน้อง</th>

        <th>ค่าใช้จ่าย</th>
        <th>ค้างชำระ</th>
        <th>สถานะ</th>
        <th>เลขที่ใบเสร็จ</th>
        <th>อัพเดทล่าสุด</th>
      </tr>
    </thead>
  );
};
const PaymentTable = ({ children }) => {
  return (
    <div className="payment-table">
      <table className="table  is-hoverable is-fullwidth">
      <PaymentHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
    </div>
    
  );
};

const PaymentRow = ({
  no,
  _id,
  name,
  nickname,
  color_name,
  outstanding_balance,
  topic,
  slipNo,
  type,
  status,
  total_price,
  invoiceNum,
  payment_id,
  updateOn,
  date_color,
}) => {
  const history = useHistory();
  const [modalEditState, setModalEditState] = useState(false);
  function handleCloseModalEdit(event) {
    setModalEditState(event);
  }
  let pay_button = status;
  if (status === "ค้างชำระ") {
    pay_button = (
      <button
        className="button is-warning FontAll btnSize"
        style={{
          marginLeft: "30px",
          color: "#FFF",
          backgroundColor: "#E19E26",
        }}
        onClick={() => setModalEditState(!modalEditState)}
      >
        ชำระค่าใช้จ่าย
        <i
          className="far fa-money-bill-alt"
          style={{ marginLeft: "0.25em", fontSize: "1em" }}
        ></i>
      </button>
    );
  }

  return (
    <tr>
      <td>{no}</td>
      <td>{convertCode(invoiceNum, "IV")}</td>

      <td>{topic}</td>
      <td>{type}</td>
      <td style={{ color: color_name }}>{nickname}</td>

      <td>{total_price}</td>

      <td style={{ color: "#FD0303" }}>{outstanding_balance}</td>
      <td>
        {/* {status} */}
        {pay_button}
        {modalEditState ? (
          <ModalEdit closeModal={() => handleCloseModalEdit(!modalEditState)}>
            <ModalEditContent payment_id={payment_id} />
          </ModalEdit>
        ) : null}
      </td>
      <td>{convertCode(slipNo, "RE")}</td>
      <td style={{ color: date_color }}>
        {updateOn}
        {status === "ค้างชำระ" ? (
          <button
            className="print-btn"
            data-tooltip="ปริ้นใบแจ้งยอด"
            onClick={() => history.push(`/print/payment/${payment_id}/invoice`)}
          >
            <i className="fas fa-print"></i>
          </button>
        ) : (
          <button
            className="print-btn"
            data-tooltip="ปริ้นใบเสร็จ"
            onClick={() => history.push(`/print/payment/${payment_id}/slip`)}
          >
            <i className="fas fa-print"></i>
          </button>
        )}
      </td>
    </tr>
  );
};

const PaymentPage = (props) => {
  const loading = useSelector((state) => state.paymentReducer.spinner_main);
  const history_list = useSelector(
    (state) => state.paymentReducer.child_history
  );

  return (
    <>
      <div className="mb-payment">
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <div>
            <h1 className="titlePaymentPage">
              บัญชี
              <i
                className="fas fa-file-invoice"
                style={{
                  color: "#A2F969",
                  marginLeft: "0.25em",
                  fontSize: "1em",
                }}
              ></i>
            </h1>
          </div>
          {loading ? false : <Spinner animation="border" />}

          <div
            style={{
              margin: "1em",
              width: "100%",
              textAlign: "left",
              display: "flex",
            }}
          >
            <SelectStatus />
          </div>

          <PaymentTable>
            {history_list.length !== 0
              ? history_list.map((payment) => (
                  <PaymentRow key={payment.payment_id} {...payment} />
                ))
              : null}
          </PaymentTable>
        </div>
      </div>
    </>
  );
};
export default PaymentPage;
