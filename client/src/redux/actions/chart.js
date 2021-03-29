import api from "../../api";

export const getChildInfo = (room) => async (dispatch) => {
  try {
    const res = await api.get("/home/child", {
      params: { room },
    });
    if (res.data.length === 0) {
      dispatch({
        type: "SET_CHART_CHILD_ID",
        payload: null,
      });
    }
    dispatch({
      type: "SET_CHILD_NAME_CHART",
      payload: res.data.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const getCheckInfo = (childId, date) => async (dispatch) => {
  try {
    const res = await api.get("/home/check", {
      params: { childId, date },
    });
    dispatch({
        type: "SET_DATE_CHART",
        payload: date
    })
    if (res.data.data === null) {
        dispatch({
            type: "SET_CHART_MODAL_CHILD",
            payload: [],
          })
          dispatch({
            type: "SET_SPINNER_CHART",
            payload: true
        })
    } else {
      const headList = [
        "มาเรียน/ไม่มาเรียน",
        "นม",
        "แพมเพิส",
        "ขวดน้ำ",
        "ขวดนม",
        "ผ้าขนหนู",
        "อาหารเช้า",
        "เสื้อผ้า",
        "ศีรษะ",
        "หู/ใบหู",
        "เล็บ",
        "ผิวหนัง",
        "ร่องรอยบาดแผล",
        "วัดไข้",
      ];

      const list = headList.map((each, index) => ({
        name: each,
        status: res.data.data[index],
      }));
      dispatch({
        type: "SET_CHART_MODAL_CHILD",
        payload: list,
      });
      dispatch({
          type: "SET_SPINNER_CHART",
          payload: true
      })
    }
  } catch (error) {
      alert(error);
  }
};

export const getChildChartAttend = (childId, date) => async (dispatch) => {
  try {
    const res = await api.get("/home/attend", {
      params: { childId, date },
    });
    dispatch({
      type: "SET_CHART_ATTEND",
      payload: res.data.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const getChildChartGadget = (childId, date) => async (dispatch) => {
  try {
    const res = await api.get("/home/gadget", {
      params: { childId, date },
    });
    dispatch({
      type: "SET_CHART_GADGET",
      payload: res.data.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const getChildChartHealth = (childId, date) => async (dispatch) => {
  try {
    const res = await api.get("/home/health", {
      params: { childId, date },
    });
    dispatch({
      type: "SET_CHART_HEALTH",
      payload: res.data.data,
    });
  } catch (error) {
    alert(error.message);
  }
};
