import api from "../../api";

export const getHistory = (status) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_SPINNER_MAIN",
      payload: false,
    });
    const res = await api.get("/payment/", {
      params: {
        status,
      },
    });
    dispatch({
      type: "SET_PAYMENT_HISTORY",
      payload: res.data.data,
    });
    dispatch({
      type: "SET_SPINNER_MAIN",
      payload: true,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const getSlip = (child) => async (dispatch) => {
  try {
    const res = await api.get("/payment/slip", {
      params: { child },
    });
    dispatch({
      type: "SET_PICTURE_SLIP",
      payload: res.data.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const postTransaction = (obj) => async () => {
  try {
    const res = await api.post("/payment/", {
      obj,
    });
    if (res.status === 201) {
      window.location.reload();
    } 
  } catch (error) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน หากกรอกครบแล้ว แสดงว่าจำนวนในคลังมีไม่เพียงพอ");
  }
};

export const handleTransaction = (obj) => async () => {
  try {
    const res = await api.patch("/payment", {
      obj,
    });
    if (res.status === 204) {
      window.location.reload();
    }
  } catch (error) {
    alert('กรุณากรอกข้อมูลให้ถูกต้อง ค่าจ่ายต้องไม่มากว่าในใบแจ้งยอด');
  }
};
