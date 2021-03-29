import api from "../../api";

export const showChild = (target, date) => async (dispatch) => {
  let room = "";
  if (target.value === undefined) {
    room = target;
  } else {
    room = target.value;
  }
  try {
    const showChild = await api.get("/gadget/", {
      params: {
        room,
        date,
      },
    });
    dispatch({
      type: "SHOW_CHILD_MAIN_GADGET",
      payload: showChild.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER_GADGET",
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

export const showChildStarter = (room, date) => async (dispatch) => {
  try {
    const showChild = await api.get("/gadget/", {
      params: {
        room,
        date,
      },
    });
    dispatch({
      type: "SHOW_CHILD_MAIN_GADGET",
      payload: showChild.data,
    });
    dispatch({
      type: "SET_ROOM",
      payload: room,
    });
    dispatch({ type: "SET_LOADING_SPINNER_GADGET", payload: true });
  } catch (error) {
    alert(error.message);
  }
};

export const checkList = (list) => async () => {
  try {
    await api.post("/gadget/checkStuff", {
      list,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleMilk = (child, milk, date) => async () => {
  try {
    await api.post("/gadget/milk", {
      child,
      milk,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handlePamper = (child, pamper, date) => async () => {
  try {
    await api.post("/gadget/pamper", {
      child,
      pamper,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleBottle = (child, bottle, date) => async () => {
  try {
    await api.post("/gadget/bottle", {
      child,
      bottle,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleMilk_bottle = (child, milk_bottle, date) => async () => {
  try {
    await api.post("/gadget/milk_bottle", {
      child,
      milk_bottle,
      date,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const handleTowel = (child, towel, date) => async () => {
  try {
    await api.post("/gadget/towel", {
      child,
      towel,
      date,
    });

  } catch (error) {
    alert(error.message);
  }
};
