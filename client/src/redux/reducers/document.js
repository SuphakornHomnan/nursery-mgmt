const initialState = {
  documentObj: {
    birth_certificate: false,
    id_card_father: false,
    house_record: false,
    id_card_mother: false,
    life_lnsurance_card: false,
    health_vaccination: false,
    baby_photo: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOCUMENT_FORM":
      return {
        ...state,
        documentObj: action.payload,
      };

    default:
      return state;
  }
};
