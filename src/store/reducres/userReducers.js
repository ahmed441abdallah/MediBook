import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGOUT_USER_SUCCESS, GET_PROFILE_START, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, UPDATE_PROFILE_START, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS, GET_MY_APPOINTEMNT_START, GET_MY_APPOINTEMNT_FAIL, GET_MY_APPOINTEMNT_SUCCESS, BOOK_APPOINTEMNT_START, BOOK_APPOINTEMNT_FAIL, BOOK_APPOINTEMNT_SUCCESS, CANCEL_APPOINTEMNT_START, CANCEL_APPOINTEMNT_SUCCESS, CANCEL_APPOINTEMNT_FAIL } from "../types"

const initialState = {
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
    user: null,
    appointements: [],

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_START:
        case REGISTER_USER_START:
        case GET_PROFILE_START:
        case UPDATE_PROFILE_START:
        case GET_MY_APPOINTEMNT_START:
        case BOOK_APPOINTEMNT_START:
        case CANCEL_APPOINTEMNT_START:

            return {
                ...state,
                isLoading: true,
                error: null
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                token: action.payload
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                token: action.payload
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload
            }
        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:
        case GET_PROFILE_FAIL:
        case UPDATE_PROFILE_FAIL:
        case GET_MY_APPOINTEMNT_FAIL:
        case BOOK_APPOINTEMNT_FAIL:
        case CANCEL_APPOINTEMNT_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                token: null,
                user: null,
            }
        case GET_MY_APPOINTEMNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                appointements: action.payload
            }
        case BOOK_APPOINTEMNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                appointements: [...state.appointements, action.payload]
            }
        case CANCEL_APPOINTEMNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                appointements: state.appointements.map(appt => appt._id === action.payload._id ? action.payload : appt)
            }
        default:
            return state
    }
}
export default userReducer;
