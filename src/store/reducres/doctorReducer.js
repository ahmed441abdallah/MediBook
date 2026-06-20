import { ADD_DOCTOR_FAIL, ADD_DOCTOR_START, ADD_DOCTOR_SUCCESS, GET_ALL_DOCTOR_FAIL, GET_ALL_DOCTOR_START, GET_ALL_DOCTOR_SUCCESS, CHANGE_AVAILABILITY_SUCCESS, GET_DOCTOR_BY_ID_START, GET_DOCTOR_BY_ID_SUCCESS, GET_DOCTOR_BY_ID_FAIL, DOCTOR_LOGIN_START, DOCTOR_LOGIN_SUCCESS, DOCTOR_LOGIN_FAIL, DOCTOR_LOGOUT_SUCCESS, GET_DOCTOR_APPOINTMENTS_START, GET_DOCTOR_APPOINTMENTS_SUCCESS, GET_DOCTOR_APPOINTMENTS_FAIL, CHANGE_DOCTOR_APPOINTMENT_STATUS_SUCCESS } from "../types"
const initialState = {
    doctorList: [],
    total: 0,
    isLoading: false,
    error: null,
    selectedDoctor: null,
    detailLoading: false,
    detailError: null,
    doctorToken: typeof window !== 'undefined' ? localStorage.getItem('doctorToken') : null,
    appointments: [],
    appointmentsLoading: false,
}
const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOCTOR_LOGIN_START:
            return { ...state, isLoading: true, error: null };
        case DOCTOR_LOGIN_SUCCESS:
            return { ...state, isLoading: false, doctorToken: action.payload };
        case DOCTOR_LOGIN_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case DOCTOR_LOGOUT_SUCCESS:
            return { ...state, doctorToken: null };
            
        case GET_DOCTOR_APPOINTMENTS_START:
            return { ...state, appointmentsLoading: true, error: null };
        case GET_DOCTOR_APPOINTMENTS_SUCCESS:
            return { ...state, appointmentsLoading: false, appointments: action.payload };
        case GET_DOCTOR_APPOINTMENTS_FAIL:
            return { ...state, appointmentsLoading: false, error: action.payload };

        case CHANGE_DOCTOR_APPOINTMENT_STATUS_SUCCESS:
            return {
                ...state,
                appointments: state.appointments.map((appt) => 
                    appt._id === action.payload.id ? { ...appt, status: action.payload.status } : appt
                )
            };

        case ADD_DOCTOR_START:
            return { ...state, isLoading: true, error: null };

        case ADD_DOCTOR_SUCCESS:
            return { ...state, isLoading: false, doctorList: [...state.doctorList, action.payload] };

        case ADD_DOCTOR_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case GET_ALL_DOCTOR_START:
            return { ...state, isLoading: true, error: null };
        case GET_ALL_DOCTOR_SUCCESS:
            return { ...state, isLoading: false, doctorList: action.payload.data, total: action.payload.total };
        case GET_ALL_DOCTOR_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case CHANGE_AVAILABILITY_SUCCESS:
            return {
                ...state,
                doctorList: state.doctorList.map((doc) =>
                    doc._id === action.payload
                        ? { ...doc, available: !doc.available }
                        : doc
                ),
            };
        case GET_DOCTOR_BY_ID_START:
            return { ...state, detailLoading: true, detailError: null, selectedDoctor: null };
        case GET_DOCTOR_BY_ID_SUCCESS:
            return { ...state, detailLoading: false, selectedDoctor: action.payload };
        case GET_DOCTOR_BY_ID_FAIL:
            return { ...state, detailLoading: false, detailError: action.payload };
        default: return state
    }

}
export default doctorReducer;