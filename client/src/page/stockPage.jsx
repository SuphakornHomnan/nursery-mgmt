import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import "../scss/responsive-stock.scss";
import Navbar from "../components/navbar";
import {Spinner} from 'react-bootstrap'
import ModalHis from "../components/stock/modalHistory";
import ModalEdit from "../components/stock/modalEdit";
import ModalPrice from "../components/stock/modalPrice";
import { useDispatch, useSelector } from "react-redux";
import {
  showStock,
  showHistory,
  showStockHandle,
  sentEditData,
  sentMinusStock,
  editPrice,
} from "../redux/actions/stock";
import moment from "moment";
import Size from "../components/stock/size";

const StockHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ชื่อสินค้า</th>
        <th>S</th>
        <th>M</th>
        <th>L</th>
        <th>XL</th>
        <th>2XL</th>
        <th>Free size</th>
      </tr>
    </thead>
  );
};

const StockTable = ({ children }) => {
  return (
    <table className="table  is-hoverable  is-fullwidth">
      <StockHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
  );
};

const StockRow = ({ name, s, m, l, xl, xxl, free_size, color }) => {
  return (
    <tr>
      <th>{name}</th>
      <th>{s}</th>
      <th>{m}</th>
      <th>{l}</th>
      <th>{xl}</th>
      <th>{xxl}</th>
      <th>{free_size}</th>
    </tr>
  );
};

const ModalHisHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ชื่อสินค้า</th>
        <th>ไซต์</th>
        <th>จำนวน</th>
        <th>อัพเดทวันที่</th>
        <th>โดย</th>
      </tr>
    </thead>
  );
};

const ModalHisTable = ({ children }) => {
  return (
    <table className="table  is-hoverable  is-fullwidth">
      <ModalHisHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
  );
};

const ModalHisRow = ({
  name,
  size,
  color_size,
  amount,
  color_amount,
  date,
  color,
  owner,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{size}</td>
      <td>{amount}</td>
      <td style={{ color }}>{date}</td>
      <td>{owner}</td>
    </tr>
  );
};

const ModalPriceTable = ({ children }) => {
  return (
    <table className="table  is-hoverable  is-fullwidth">
      <ModalPriceHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
  );
};

const ModalPriceHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ชื่อสินค้า</th>
        <th>
          <Size />
        </th>
      </tr>
    </thead>
  );
};

const ModalPriceRow = ({ _id, name, price }) => {
  const [editStatus, setEditStatus] = useState(false);
  const dispatch = useDispatch();
  const size = useSelector((state) => state.stockReducer.size);
  const [priceInput, setPrice] = useState(null);
  return (
    <tr>
      <td>{name}</td>

      {editStatus ? (
        <td>
          <input
            type="text"
            onChange={({ target }) => setPrice(target.value)}
          />
          <button
            className="button is-success"
            style={{ marginLeft: "0.5vw", marginRight: "0.5vw" }}
            onClick={() => {
              dispatch(editPrice(_id, priceInput, size));
              setEditStatus(false);
            }}
          >
            แก้ไข
          </button>
          <button
            className="button is-danger"
            onClick={() => {
              setEditStatus(false);
            }}
          >
            ยกเลิก
          </button>
        </td>
      ) : (
        <td>
          {price}
          <button
            style={{
              marginLeft: "1vw",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#69C9F8",
            }}
            onClick={() => {
              setEditStatus(true);
            }}
          >
            <i className="fas fa-pen"></i>
          </button>
        </td>
      )}
    </tr>
  );
};
const ModalEditHeader = () => {
  return (
    <thead className="FontTableHeaderSize">
      <tr className="color-table-header">
        <th>ชื่อสินค้า</th>
        <th>
          <Size />
        </th>
      </tr>
    </thead>
  );
};

const ModalEditTable = ({ children }) => {
  return (
    <table className="table  is-hoverable  is-fullwidth">
      <ModalEditHeader />
      <tbody className="FontTableRowSize">{children}</tbody>
    </table>
  );
};

const ModalEditRow = ({ name, amount, item, color }) => {
  const dispatch = useDispatch();
  const [handleState, setHandleState] = useState(false);
  const [minusState, setMinusState] = useState(false);
  const [value, setValue] = useState(0);
  const size = useSelector((state) => state.stockReducer.size);
  function closeInputbox() {
    setHandleState(false);
  }
  function sentData() {
    dispatch(sentEditData(item, value, size));
    setHandleState(false);
  }
  function handleDecrease() {
    dispatch(sentMinusStock(item, value, size));
    setHandleState(false);
    setMinusState(false);
  }
  return (
    <tr>
      <th>{name}</th>
      <th>
        {handleState ? (
          <div>
            {`${amount} +  `}
            <input
              className="input"
              type="text"
              style={{ width: "15%" }}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="button is-success FontAll"
              style={{ marginLeft: "0.5em" }}
              onClick={sentData}
            >
              แก้ไข
            </button>
            <button
              className="button is-danger FontAll"
              style={{ marginLeft: "0.5em" }}
              onClick={closeInputbox}
            >
              ยกเลิก
            </button>
          </div>
        ) : minusState ? (
          <div>
            {`${amount} -  `}
            <input
              className="input"
              type="text"
              style={{ width: "15%" }}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="button is-success FontAll"
              style={{ marginLeft: "0.5em" }}
              onClick={handleDecrease}
            >
              แก้ไข
            </button>
            <button
              className="button is-danger FontAll"
              style={{ marginLeft: "0.5em" }}
              onClick={() => setMinusState(false)}
            >
              ยกเลิก
            </button>
          </div>
        ) : (
          <div>
            <button
              className="button is-light"
              onClick={() => setMinusState(true)}
            >
              <i className="fas fa-minus" style={{ color: "red" }}></i>
            </button>
            {amount}{" "}
            <button
              className="button is-light"
              onClick={() => setHandleState(true)}
            >
              <i
                className="fas fa-plus"
                aria-hidden="true"
                style={{ color: "#69D820" }}
              ></i>
            </button>
          </div>
        )}
      </th>
    </tr>
  );
};

const StockPage = (props) => {
  function handleCloseModalHis(event) {
    setModalHisState(event);
  }
  async function handleCloseModalEdit(event) {
    await dispatch(showStock());
    await dispatch(showStockHandle("S"));
    await dispatch(showHistory(moment().format("YYYY-MM")));
    setModalEditState(false);
  }

  const dispatch = useDispatch();
  const list_handleStock = useSelector(
    (state) => state.stockReducer.handle_stock
  );
  const list_stock = useSelector((state) => state.stockReducer.list_stock);
  const history_stock = useSelector(
    (state) => state.stockReducer.history_stock
  );
  const loading = useSelector((state) => state.stockReducer.loadingSpinner);
  const [modalHisState, setModalHisState] = useState(false);
  const [modalEditState, setModalEditState] = useState(false);
  const [modalPrice, setModalPrice] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await dispatch(showStock());
      await dispatch(showStockHandle("S"));
      await dispatch(showHistory(moment().format("YYYY-MM")));
    }
    fetchData();
  }, [dispatch]);
  return (
    <>
      <div>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className={"overflowX"}>
        <div className="Allcontent">
          <div>
            <h1 className="titleStcokPage">
              คลังสินค้า{" "}
              <i className="fas fa-box" style={{ color: "#E19E27" }}></i>
            </h1>
          </div>
          {loading ? false : <Spinner animation="border" />}
          <div className="table-width-header">
            <StockTable>
              {list_stock !== []
                ? list_stock.map((stock) => (
                    <StockRow key={stock._id} {...stock} />
                  ))
                : null}
            </StockTable>
          </div>
          <div>
            <button
              className="button is-info  FontAll btnSize"
              onClick={() => setModalHisState(!modalHisState)}
              style={{
                marginRight: "0.5rem",
              }}
            >
              ประวัติ
              <i
                className="fas fa-history"
                style={{ marginLeft: "0.25em", fontSize: "1em" }}
              ></i>
            </button>
            {modalHisState ? (
              <ModalHis closeModal={() => handleCloseModalHis(!modalHisState)}>
                <div className="table-width-header">
                  <ModalHisTable>
                    {history_stock !== []
                      ? history_stock.map((stock) => (
                          <ModalHisRow key={stock._id} {...stock} />
                        ))
                      : null}
                  </ModalHisTable>
                </div>
              </ModalHis>
            ) : null}
            <button
              className="button is-success FontAll btnSize"
              onClick={() => setModalPrice(!modalPrice)}
            >
              ราคาของในคลัง
            </button>
            {modalPrice ? (
              <ModalPrice closeModal={() => setModalPrice(!modalPrice)}>
                <ModalPriceTable>
                  {list_handleStock
                    ? list_handleStock.map((data) => (
                        <ModalPriceRow key={data._id} {...data} />
                      ))
                    : null}
                </ModalPriceTable>
              </ModalPrice>
            ) : null}
            <button
              className="button is-warning FontAll btnSize"
              style={{
                marginLeft: "0.5rem",
                color: "#FFF",
                backgroundColor: "#E19E26",
              }}
              onClick={() => setModalEditState(!modalEditState)}
            >
              แก้ไข
              <i
                className="fas fa-pencil-alt"
                style={{
                  marginLeft: "0.25em",
                  fontSize: "1em",
                }}
              ></i>
            </button>
          </div>

          {modalEditState ? (
            <ModalEdit closeModal={() => handleCloseModalEdit(!modalEditState)}>
              <ModalEditTable>
                {list_handleStock !== []
                  ? list_handleStock.map((stock) => (
                      <ModalEditRow key={stock.item} {...stock} />
                    ))
                  : null}
              </ModalEditTable>
            </ModalEdit>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default StockPage;
