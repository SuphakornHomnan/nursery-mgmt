const initialState = {
  room: "ห้อง ก1",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROOM":
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
};
