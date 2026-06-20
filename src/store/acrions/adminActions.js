import api from "../../services/api";
import { ADMIN_LOGIN_START, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGOUT_SUCCESS, ADD_DOCTOR_START, ADD_DOCTOR_SUCCESS, ADD_DOCTOR_FAIL, GET_ALL_DOCTOR_START, GET_ALL_DOCTOR_SUCCESS, GET_ALL_DOCTOR_FAIL, CHANGE_AVAILABILITY_SUCCESS, GET_ALL_APPOINTMENTS_START, GET_ALL_APPOINTMENTS_SUCCESS, GET_ALL_APPOINTMENTS_FAIL, CHANGE_APPOINTMENT_STATUS_SUCCESS, GET_STATISTICS_START, GET_STATISTICS_SUCCESS, GET_STATISTICS_FAIL } from "../types";
export const adminLogin = (email, password) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_START })

    try {
        const res = await api.post("/admin/login", { email, password })
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.token })
        if (res.data.token) {
            localStorage.setItem("token", res.data.token)
        }
        return true

    } catch (error) {
        const message = error.response?.data?.message || "Invalid email or password"
        dispatch({ type: ADMIN_LOGIN_FAIL, payload: message })
        return false
    }

}
export const adminLogout = () => (dispatch) => {
    dispatch({ type: ADMIN_LOGOUT_SUCCESS })
    localStorage.removeItem("token")
}
export const addDocotr = (formData) => async (dispatch) => {
    dispatch({ type: ADD_DOCTOR_START });
    try {
        const response = await api.post('/admin/add-doctor', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        dispatch({ type: ADD_DOCTOR_SUCCESS, payload: response.data.data })
        return true

    }
    catch (error) {
        dispatch({ type: ADD_DOCTOR_FAIL, payload: error.response?.data?.message || "Failed to add doctor" })
        return false

    }

}
export const getAllDoctors = (page = 1, limit = 9, keyword = "") => async (dispatch) => {
    dispatch({ type: GET_ALL_DOCTOR_START });
    try {
        const response = await api.get(`/admin/all-doctors?page=${page}&limit=${limit}&keyword=${keyword}`);
        dispatch({ type: GET_ALL_DOCTOR_SUCCESS, payload: response.data });
        return true;
    }
    catch (error) {
        dispatch({ type: GET_ALL_DOCTOR_FAIL, payload: error.response?.data?.message || "Failed to get all doctors" });
        return false;
    }
}
export const changeAvailability = (id) => async (dispatch) => {
    try {
        const response = await api.put('/admin/change-availability', { id });
        if (response.data.sucess) {
            dispatch({ type: CHANGE_AVAILABILITY_SUCCESS, payload: id });
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
export const getAllAppointments = (page = 1, limit = 6, keyword = "") => async (dispatch) => {
    dispatch({ type: GET_ALL_APPOINTMENTS_START });
    try {
        const response = await api.get(`/admin/all-appointments?page=${page}&limit=${limit}&keyword=${keyword}`);
        dispatch({ type: GET_ALL_APPOINTMENTS_SUCCESS, payload: response.data });
        return true;
    } catch (error) {
        dispatch({ type: GET_ALL_APPOINTMENTS_FAIL, payload: error.response?.data?.message || "Failed to get appointments" });
        return false;
    }
};
export const changeAppointmentStatus = (id, status) => async (dispatch) => {
    try {
        const response = await api.put(`/admin/change-appointment-status/${id}`, { status });
        dispatch({ type: CHANGE_APPOINTMENT_STATUS_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        return false;
    }
};
export const getStatistics = () => async (dispatch) => {
    dispatch({ type: GET_STATISTICS_START });
    try {
        const response = await api.get(`/admin/stastics`);
        dispatch({ type: GET_STATISTICS_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        dispatch({ type: GET_STATISTICS_FAIL, payload: error.response?.data?.message || "Failed to get statistics" });
        return false;
    }
};
