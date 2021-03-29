const initialState = {
  medicalObj: {
    vaccination_against_chickenpox: false,
    vaccinated_at_the_age_of: '',
    Infectious_Disease_Mumps_or_Others: '',
    Bronchitis_Asthma_Respiratory_Tract_Disease_Others: '',
    Congenital_Heart_Disease: false,
    Diabetes: false,
    Epilepsy_Febrile_Seizure: false,
    Hospital: '',
  },
  vaccinated_checkbox: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_MEDICAL_DETAIL":
      return {
        ...state,
        medicalObj: action.payload,
      };
    case "SET_MEDICAL_DISABLE":
      return {
        ...state,
        vaccinated_checkbox: action.payload,
      };
    default:
      return state;
  }
};
