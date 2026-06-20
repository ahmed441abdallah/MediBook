import api from "@/services/api"
import { LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, REGISTER_USER_FAIL, REGISTER_USER_START, REGISTER_USER_SUCCESS, GET_PROFILE_START, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, UPDATE_PROFILE_START, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, BOOK_APPOINTEMNT_START, BOOK_APPOINTEMNT_SUCCESS, BOOK_APPOINTEMNT_FAIL, GET_MY_APPOINTEMNT_START, GET_MY_APPOINTEMNT_SUCCESS, GET_MY_APPOINTEMNT_FAIL, CANCEL_APPOINTEMNT_START, CANCEL_APPOINTEMNT_SUCCESS, CANCEL_APPOINTEMNT_FAIL } from "../types"

const loginUser = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_START })
    try {
        const response = await api.post('/users/login', userData);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.token });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return true;

    } catch (error) {
        const message = error.response?.data?.message || "Invalid email or password";
        dispatch({ type: LOGIN_USER_FAIL, payload: message });
        return false;
    }
}
const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_START })
    try {
        const response = await api.post('/users/register', userData);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data.token });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return true;

    } catch (error) {
        const message = error.response?.data?.message || "Invalid email or password";
        dispatch({ type: REGISTER_USER_FAIL, payload: message });
        return false;
    }
}
const getProfile = () => async (dispatch) => {
    dispatch({ type: GET_PROFILE_START })
    try {
        const response = await api.get('/users/me');
        dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Invalid email or password";
        dispatch({ type: GET_PROFILE_FAIL, payload: message });
        return false;
    }
}
const updateProfile = (formData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_START })
    try {
        const response = await api.put('/users/update-profile', formData);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update profile";
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: message });
        return false;
    }
}
const bookAppointemnt = (formData) => async (dispatch) => {
    dispatch({ type: BOOK_APPOINTEMNT_START })
    try {
        const response = await api.post('/appointements', formData);
        dispatch({ type: BOOK_APPOINTEMNT_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to book appointment";
        dispatch({ type: BOOK_APPOINTEMNT_FAIL, payload: message });
        return false;
    }
}
const getMyAppointment = () => async (dispatch) => {
    dispatch({ type: GET_MY_APPOINTEMNT_START })
    try {
        const response = await api.get('/appointements');
        dispatch({ type: GET_MY_APPOINTEMNT_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to get appointments";
        dispatch({ type: GET_MY_APPOINTEMNT_FAIL, payload: message });
        return false;
    }
}
const cancelAppointment = (id) => async (dispatch) => {
    dispatch({ type: CANCEL_APPOINTEMNT_START })
    try {
        const response = await api.put('/appointements/cancel', { id });
        dispatch({ type: CANCEL_APPOINTEMNT_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to cancel appointment";
        dispatch({ type: CANCEL_APPOINTEMNT_FAIL, payload: message });
        return false;
    }
}
export { loginUser, registerUser, getProfile, updateProfile, bookAppointemnt, getMyAppointment, cancelAppointment }