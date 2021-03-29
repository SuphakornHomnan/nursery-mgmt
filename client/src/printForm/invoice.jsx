/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-constructor */
import React, { useState, useEffect } from "react";
import api from "../api";
import "bulma/css/bulma.css";
import "../scss/font.scss";
import "../scss/invoice.scss";
import moment from "moment";
import THBTEXT from "thai-baht-text";
import {Spinner} from 'react-bootstrap'
import { convertCode } from "../helpers/convertCode";
function getMonth(date) {
  switch (date) {
    case "01":
      return "เดือนมกราคม( January )";
    case "02":
      return "เดือนกุมภาพันธ์( February )";
    case "03":
      return "เดือนมีนาคม( March )";
    case "04":
      return "เดือนเมษายน( April )";
    case "05":
      return "เดือนพฤษภาคม( May )";
    case "06":
      return "เดือนมิถุนายน( June )";
    case "07":
      return "เดือนกรกฎาคม( July )";
    case "08":
      return "เดือนสิงหาคม( August )";
    case "09":
      return "เดือนกันยายน( September )";
    case "10":
      return "เดือนตุลาคม( October )";
    case "11":
      return "เดือนพฤศจิกายน( November )";
    case "12":
      return "เดือนธันวาคม( December )";
    default:
      return;
  }
}

const PrintFormInvoice = (props) => {
  const [invoiceObj, setInvoiceObj] = useState(undefined);
  const [month, setMonth] = useState(
    getMonth(moment().format("YYYY-MM-DD").slice(5, 7))
  );
  const [loading, Setloading] = useState(false);
  const paymentId = props.match.params.payment_id;
  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/payment/print/invoice", {
        params: { paymentId },
      });
      setInvoiceObj(res.data.data);
      Setloading(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (invoiceObj) {
      if (invoiceObj.startDate) {
        setMonth(getMonth(invoiceObj.startDate.split("-")[1]));
      }
    }
  }, [invoiceObj]);

  return (
    <>
      {loading ? null : <Spinner animation="border" />}
      <div className="print-link" onClick={() => window.print()}>
        กดตรงนี้เพื่อพิมพ์( PDF A4 Only )
      </div>
      <div id="section-to-print">
        {invoiceObj ? <FormInvoice month={month} list={invoiceObj} /> : null}
      </div>
    </>
  );
};
class FormInvoice extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { month, year, list } = this.props;
    const startDate = list.startDate ? list.startDate.split("T")[0] : null;
    const expDate = list.expDate ? list.expDate.split("T")[0] : null;
    return (
      <div className="container">
        <div className="title-invoice">
          <p>พีคอะบู เนอร์สเซอรี่ ( PEEKABOO.NURSERY )</p>
          <p>
            ใบแจ้งยอด( INVOICE ) / {month} {year}
          </p>
        </div>
        <div className="head-detail">
          <div className="first-section">
            <label className="name-invoice">
              ลูกค้า {list.name} ({list.nickname})
            </label>
            <label className="tax-id">TaxID:</label>
          </div>
          <div className="second-section">
            <div className="first-sub-section">
              <label className="left-text">เลขที่ใบกำกับ</label>
              <label className="left-text">วันที่แจ้งยอด</label>
              <label className="left-text">วันที่ครบกำหนด</label>
            </div>
            <div className="second-sub-section">
              <label htmlFor="">{convertCode(list.invoice, "IV")}</label>
              <label style={{ marginLeft: "0.8vw" }}>{startDate}</label>
              <label style={{ marginLeft: "0.8vw" }}>{expDate}</label>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
            id="invoice-table"
          >
            <tbody>
              <tr className="head-table">
                <th>No.</th>
                <th>รายละเอียด</th>
                <th>จำนวน</th>
                <th>หน่วยละ</th>
                <th>จำนวนเงิน</th>
              </tr>

              <tr id="invoice-increase">
                <td>1</td>
                <td>{list.topic}</td>
                <td>{list.amount}</td>
                <td>{list.totalPrice / list.amount}</td>
                <td>{list.totalPrice}</td>
              </tr>

              <tr>
                <td colSpan="4">
                  <br />
                  รวมเป็นเงินจำนวนรวมทั้งสิ้น
                  <label className="price">
                    ( {THBTEXT(list.totalPrice)} )
                  </label>
                </td>
                <td>
                  {list.totalPrice}
                  <br />
                  {list.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer">
          <div className="col">
            <p className="left-text">ผู้จัดทำ............</p>
            <p className="flex-start">วันที่../../..</p>
          </div>
          <p style={{ marginLeft: "45vw" }}>ผู้ตรวจสอบ...............</p>
        </div>
      </div>
    );
  }
}

export default PrintFormInvoice;
