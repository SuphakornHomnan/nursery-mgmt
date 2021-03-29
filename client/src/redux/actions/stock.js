import api from "../../api";

export const showStock = (target) => async (dispatch) => {
  try {
    const res = await api.get("/stock/");
    dispatch({
      type: "SHOW_STOCK",
      payload: res.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK",
      payload: true,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const showStockHandle = (target) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: false,
    });
    const res = await api.get("/stock/select", { params: { size: target } });
    dispatch({
      type: "HANDLE_STOCK",
      payload: res.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: true,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const showHistory = (date) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_HISTORY",
      payload: false,
    });
    const res = await api.get("/stock/v2/history", { params: { date } });
    dispatch({
      type: "SHOW_HISTORY",
      payload: res.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_HISTORY",
      payload: true,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const sentEditData = (item, amount, size) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: false,
    });
    const res = await api.patch("/stock/item", { item, amount });
    if (res.status === 201) {
      const list = await api.get("/stock/select", { params: { size } });
      dispatch({ type: "HANDLE_STOCK", payload: list.data });
      dispatch({
        type: "SET_LOADING_SPINNER_STOCK_MODAL",
        payload: true,
      });
    } 
  } catch (error) {
    alert('กรุณาป้อนค่าที่มากกว่า 0');
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: true,
    });
  }
};

export const sentMinusStock = (item, amount, size) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: false,
    });
    const res = await api.patch("/stock/item/decrease", { item, amount });
    if (res.status === 201) {
      const list = await api.get("/stock/select", { params: { size } });
      dispatch({ type: "HANDLE_STOCK", payload: list.data });
      dispatch({
        type: "SET_LOADING_SPINNER_STOCK_MODAL",
        payload: true,
      });
    } 
  } catch (error) {
    alert('กรุณาป้อนค่าที่มากกว่า 0');
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: true,
    });
  }
};

export const editPrice = (_id, price, size) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: false,
    });
    const res = await api.patch("/stock/price", {
      _id,
      price,
    });
    if (res.status === 201) {
      const list = await api.get("/stock/select", { params: { size } });

      dispatch({ type: "HANDLE_STOCK", payload: list.data });
      dispatch({
        type: "SET_LOADING_SPINNER_STOCK_MODAL",
        payload: true,
      });
    } 
  } catch (error) {
    alert("กรุณากรอกค่าที่มากกว่า 0");
    dispatch({
      type: "SET_LOADING_SPINNER_STOCK_MODAL",
      payload: true,
    });
  }
};
