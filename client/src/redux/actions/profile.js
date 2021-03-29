import api from "../../api";

export const getStatusDocForm = (_id) => async (dispatch) => {
  try {
    const res = await api.get("/profile/doc/status", {
      params: { _id },
    });
    dispatch({
      type: "SET_STATUS_DOC_FORM_BUTTON",
      payload: res.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const handleRoomChange = (value) => async (dispatch) => {
  try {
    let room = value;

    const res = await api.get("/profile/", {
      params: {
        room,
      },
    });
    dispatch({
      type: "GET_PROFILE_CHILD",
      payload: res.data,
    });
    dispatch({
      type: "SET_LOADING_SPINNER",
      payload: true,
    });
  } catch (error) {
    alert(error);
  }
};

export const getInfo = (_id) => async (dispatch) => {
  try {
    const res = await api.get("/profile/info", {
      params: {
        _id,
      },
    });
    dispatch({
      type: "GET_PROFILE_INFO",
      payload: res.data.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const updateInfo = (_id, objList) => async () => {
  try {
    await api.patch(`/profile/info/${_id}`, {
      objList,
    });
  } catch (error) {
    alert(error.message)
  }
};

export const quitRoom = (id) => async () => {
  try {
    await api.put("/room/quitRoom", {
      id,
    });
  } catch (error) {
    alert(error.message)
  }
};

export const showQuitChild = () => async (dispatch) => {
  try {
    const res = await api.get("/home/room");
  dispatch({
    type: "SET_QUIT_CHILD_LIST",
    payload: res.data.data,
  });
  dispatch({
    type: 'SET_SPINNER_ATTEND_MODAL',
    payload: true
  })
  } catch (error) {
    alert(error.message)
  }
  
};
