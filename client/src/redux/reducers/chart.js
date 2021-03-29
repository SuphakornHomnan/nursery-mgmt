import moment from 'moment'
const initialState = {
    attendInfo: {},
    gadgetInfo: {},
    healthInfo: {},
    childInfo: [],
    childId: '',
    month: moment().format("YYYY-MM"),
    childModal: [],
    date: moment().format('YYYY-MM-DD'),
    spinnerChart: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_CHART_ATTEND":
            
            return {
                ...state,
                attendInfo: action.payload
            }
        case "SET_CHART_GADGET":

            return {
                ...state,
                gadgetInfo: action.payload
            }
        case "SET_CHART_HEALTH":

            return {
                ...state,
                healthInfo: action.payload
            }
        case "SET_CHILD_NAME_CHART":
            return {
                ...state,
                childInfo: action.payload
            }
        case "SET_CHART_CHILD_ID":
            return {
                ...state,
                childId: action.payload
            }
        case "SET_MONTH_CHART":
            return {
                ...state,
                month: action.payload
            }
        case "SET_DATE_CHART":
            return {
                ...state,
                date: action.payload
            }
        case "SET_CHART_MODAL_CHILD":
            return {
                ...state,
                childModal: action.payload
            }
        case "SET_SPINNER_CHART":
            return {
                ...state,
                spinnerChart: action.payload
            }
        default:
            return state
    }
}