import api from "../../api";

export const getChildbyRoom = (room) => async (dispatch) => {
  try {
    const res = await api.get("/child/show/atRooms/", { room: room });
    dispatch({
      type: "GET_CHILD_ROOMS",
      payload: res.data,
    });
  } catch (error) {
    alert(error.message);
  }
};

export const addCustomerNo = (customerId, child) => async () => {
  try {
    const res = await api.post('/child/customer', {
      customerId, child
    })
    alert(res.data.message)
  } catch (error) {
    alert(error.message)
  }
}