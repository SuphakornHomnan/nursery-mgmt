import api from "../../api";

export const handleMonth = (value) => async (dispatch) => {
  let date = value;
  const res = await api.get("/attendance/listDate", {
    params: {
      date,
    },
  });
  dispatch({
    type: "ADD_LIST_DAY",
    payload: res.data.data.dayList,
  });
};
