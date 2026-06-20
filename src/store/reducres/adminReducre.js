import { ADMIN_LOGIN_START, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL, GET_ALL_APPOINTMENTS_START, GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAIL, CHANGE_APPOINTMENT_STATUS_SUCCESS, GET_STATISTICS_START, GET_STATISTICS_SUCCESS, GET_STATISTICS_FAIL } from "../types"

const initialState = {
    token: null,
    loading: false,
    error: null,
    appointments: [],
    appointmentsTotal: 0,
    statistics: null,
}
const adminReducre = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload
            }
        case ADMIN_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "ADMIN_LOGOUT":
            return {
                ...initialState
            }
        case GET_ALL_APPOINTMENTS_START:
            return { ...state, loading: true, error: null }
        case GET_ALL_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                appointments: action.payload.data,
                appointmentsTotal: action.payload.total,
            }
        case GET_ALL_APPOINTMENTS_FAIL:
            return { ...state, loading: false, error: action.payload }
        case CHANGE_APPOINTMENT_STATUS_SUCCESS:
            return {
                ...state,
                appointments: state.appointments.map(a =>
                    a._id === action.payload._id ? { ...a, status: action.payload.status } : a
                ),
            }
        case GET_STATISTICS_START:
            return { ...state, loading: true, error: null }
        case GET_STATISTICS_SUCCESS:
            return {
                ...state,
                loading: false,
                statistics: action.payload,
            }
        case GET_STATISTICS_FAIL:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
export default adminReducre;
