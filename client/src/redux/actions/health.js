import api from "../../api";

export const showChild = (target, date, amount_day) => async (dispatch) => {
  let room = "";
  if (target.value === undefined) {
    room = target;
  } else {
    room = target.value;
  }
  try {
    const showChild = await api.get("/health/", {
      params: {
        room,
        date,
        amount_day,
      },
    });
    dispatch({
      type: "SHOW_CHILD_MAIN_HEALTH",
      payload: showChild.data.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER_HEALTH",
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

export const showChildStarter = (room, date, amount_day) => async (
  dispatch
) => {
  try {
    const showChild = await api.get("/health/", {
      params: {
        room,
        date,
        amount_day,
      },
    });
    dispatch({
      type: "SHOW_CHILD_MAIN_HEALTH",
      payload: showChild.data.data,
    });
    dispatch({
      type: "SET_ROOM",
      payload: room,
    });
    dispatch({ type: "SET_LOADING_SPINNER_HEALTH", payload: true });
  } catch (error) {
    alert(error.message);
  }
};

export const checkHealth = (list) => async () => {
  try {
    await api.post("/health/chooseChild/checkHealth/", {
      list,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleBreakfast = (child, breakfast, date) => async () => {
  try {
    await api.post("/health/breakfast", {
      child,
      breakfast,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleCloth = (child, cloth, date) => async () => {
  try {
    await api.post("/health/cloth", {
      child,
      cloth,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleEar = (child, ear, date) => async () => {
  try {
    await api.post("/health/ear", {
      child,
      ear,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleHead = (child, head, date) => async () => {
  try {
    await api.post("/health/head", {
      child,
      head,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleNail = (child, nail, date) => async () => {
  try {
    await api.post("/health/nail", {
      child,
      nail,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleSkin = (child, skin, date) => async () => {
  try {
    await api.post("/health/skin", {
      child,
      skin,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleTemperature = (child, temperature, date) => async () => {
  try {
    await api.post("/health/temperature", {
      child,
      temperature,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleWound = (child, wound, date) => async () => {
  try {
    await api.post("/health/wound", {
      child,
      wound,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};
