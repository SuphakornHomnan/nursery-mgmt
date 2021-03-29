const initialState = {
  habitObj: {
    pillow_aficionado: false,
    doll_aficionado: false,
    fabric_aficionado: false,
    pacifier_aficionado: false,
    breast_feeding_aficionado: false,
    crib_aficionado: false,
    food_allergy_detail: '',
    milk_intolerance_detail: '',
    no_yogurt_allergy_detail: '',
    no_allergy_to_medicine_detail: '',
    milk_powder_in_bottle: false,
    uht_milk_box_in_bottle: false,
    uht_milk_box: false,
    always_use_diaper: false,
    not_use_diaper: false,
    diaper_only_sleeping: false,
    other_information: '',
  },

  handleInputDisable: {
    food_allergy: false,
    milk_intolerance: false,
    no_yogurt_allergy: false,
    no_allergy_to_medicine: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_HABIT_DETAIL":
      return {
        ...state,
        habitObj: action.payload,
      };
    case "SET_INPUT_DISABLE_HABIT":
      return {
        ...state,
        handleInputDisable: action.payload,
      };
    default:
      return state;
  }
};
