/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../api";
import "bulma/css/bulma.css";
import "../scss/font.scss";
import "../scss/slip.scss";
import moment from "moment";
import {Spinner} from 'react-bootstrap'
import THBTEXT from "thai-baht-text";
import { convertCode } from "../helpers/convertCode";

const SlipForm = ({ list, today }) => {
  const startDate = list.startDate ? list.startDate.split("T")[0] : null;
  const expDate = list.expDate ? list.expDate.split("T")[0] : null;
  return (
    <div className="container-slip">
      <div className="title-slip left-text">
        พีคอะบู เนอร์สเซอรี่(Peekaboo Nursery)
      </div>
      <div className="header-slip">
        <div className="section-one">
          <div className="left-text">ลูกค้า {list.customerId}</div>
          <div>
            {list.name}({list.nickname})
          </div>
        </div>
        <div className="section-two">
          <div className="sub-section-one">
            <br />
            <div>เลขที่ใบเสร็จ</div>
            <div className="left-text">วันที่</div>
          </div>
          <div className="sub-section-two">
            <div>Receipt/ใบเสร็จรับเงิน</div>
            <div className="left-text">{convertCode(list.slipNum, "RE")}</div>
            <div className="left-text">{today}</div>
          </div>
        </div>
      </div>
      <div className="table-slip">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={{ width: "2.5%" }}>No.</th>
              <th style={{ width: "10%" }}>เลขที่ใบกำกับ</th>
              <th style={{ width: "25.5%" }}>รายละเอียด</th>
              <th style={{ width: "16%" }}>วันที่</th>
              <th style={{ width: "16%" }}>ครบกำหนด</th>
              <th style={{ width: "10%" }}>จำนวนเงิน</th>
              <th style={{ width: "10%" }}>ยอดคงค้าง</th>
              <th style={{ width: "10%" }}>ยอดชำระ</th>
            </tr>
            <tr className="increase">
              <td>1</td>
              <td>{convertCode(list.invoice, "IV")}</td>
              <td>
                {list.topic} X{list.amount}{" "}
              </td>
              <td>{startDate}</td>
              <td>{expDate}</td>
              <td>{list.totalPrice}</td>
              <td>{null}</td>
              <td>{list.totalPrice}</td>
            </tr>

            <tr>
              <td colSpan="7">
                <div className="tail-slip">
                  <label>({THBTEXT(list.totalPrice)})</label>
                  <label>รวมเป็นเงิน</label>
                </div>
              </td>
              <td>{list.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="footer-slip">
        <div className="col">
          <p className="left-text">ผู้รับเงิน .................</p>
          <p className="flex-start">วันที่../../..</p>
        </div>
        <div className="checker">ผู้ตรวจสอบ .................</div>
      </div>
    </div>
  );
};

const PrintSlip = (props) => {
  const [slipObj, setSlipObj] = useState({});
  const paymentId = props.match.params.payment_id;
  const [loading, setloading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/payment/print/slip", {
          params: { paymentId },
        });

        setSlipObj(res.data.data);
        setloading(true);
      } catch (error) {
        alert("ไปเพิ่มรหัสลูกค้ามาก่อนนะครับ");
        history.push("/profilePage");
      }
    }
    fetchData();
  }, []);
  return (
    <>
      {loading ? null : <Spinner animation="border" />}

      <div className="print-link" onClick={() => window.print()}>
        กดตรงนี้เพื่อพิมพ์ (PDF A4 only)
      </div>

      <div id="section-to-print">
        <SlipForm list={slipObj} today={moment().format("YYYY-MM-DD")} />
      </div>
    </>
  );
};

export default PrintSlip;
