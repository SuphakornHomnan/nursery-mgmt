import api from "../../api";

export const checkList_v2 = (child, attend, date) => async (dispatch) => {
  try {
    await api.post("/attendance/", { child, attend, date });

    dispatch({type:"UPDATE_ATTEND",payload : {id:child,date:parseInt(date.split('-')[2]),att:attend}})

  } catch (error) {
    alert(error.message);
  }
};

export const showChild = (target, date, amount_day) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING_SPINNER_ATTEND",
      payload: false,
    });
    let room = "";
    if (target.value === undefined) {
      room = target;
    } else {
      room = target.value;
    }

    const showChild = await api.get("/attendance/getChild", {
      params: {
        room,
        date,
        amount_day,
      },
    });
    dispatch({
      type: "SHOW_CHILD_MAIN",
      payload: showChild.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER_ATTEND",
      payload: true,
    });
    dispatch({
      type: "SET_ROOM",
      payload: room,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const modalChild = (room, date) => async (dispatch) => {
  try {
    dispatch({ type: "SET_SPINNER_ATTEND_MODAL", payload: false });
    const child_list = await api.get("/attendance/changeMonth", {
      params: {
        room,
        date,
      },
    });
    dispatch({
      type: "SET_MODAL_CHILD",
      payload: child_list.data.data.answer,
    });
    dispatch({
      type: "SET_SHOW_DATE_MODAL",
      payload: child_list.data.data.showDayInModal,
    });
    dispatch({
      type: "SET_SELECT_DATE",
      payload: child_list.data.data.date,
    });
    dispatch({ type: "SET_SPINNER_ATTEND_MODAL", payload: true });
    dispatch({ type: "SET_DATE_CHANGE", payload: true });
  } catch (error) {
    alert(error.message);
  }
};
