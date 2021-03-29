import api from "../../api";

export const register = (listForm) => async () => {
  try {
    await api.post("/register/", {
      listForm,
    });
    window.location.pathname = "/";
  } catch (error) {
    alert(error.message);
  }
};

export const regisForm = (listForm) => async () => {
  try {
    const res = await api.post("/register/step1", {
      listForm,
    });
    if (res.data.code === 201) {
      window.location.pathname = "/";
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    alert(error.message);
  }
};

export const docForm = (listForm) => async () => {
  try {
    const res = await api.post("/register/step2", {
      listForm,
    });
    if (res.data.code === 201) {
      window.location.pathname = "/";
    } else {
      alert(res.data.message);
    }
  } catch (error) {
    alert(error.message);
  }
};

export const selectChild = () => async (dispatch) => {
  try {
    const res = await api.get("/register/");
    dispatch({ type: "SET_SHOW_CHILD_DOC_FORM", payload: res.data });
  } catch (error) {
    alert(error.message);
  }
};
