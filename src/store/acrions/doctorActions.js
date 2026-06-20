import api from "@/services/api";
import { GET_ALL_DOCTOR_FAIL, GET_ALL_DOCTOR_START, GET_ALL_DOCTOR_SUCCESS, GET_DOCTOR_BY_ID_FAIL, GET_DOCTOR_BY_ID_START, GET_DOCTOR_BY_ID_SUCCESS, DOCTOR_LOGIN_START, DOCTOR_LOGIN_SUCCESS, DOCTOR_LOGIN_FAIL, DOCTOR_LOGOUT_SUCCESS, GET_DOCTOR_APPOINTMENTS_START, GET_DOCTOR_APPOINTMENTS_SUCCESS, GET_DOCTOR_APPOINTMENTS_FAIL, CHANGE_DOCTOR_APPOINTMENT_STATUS_SUCCESS } from "../types";

export const getAllDoctors = (page = 1, limit = 9, keyword = "", specialization = "") => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_DOCTOR_START });
        let url = `/doctors?page=${page}&limit=${limit}`;
        if (keyword) url += `&keyword=${keyword}`;
        if (specialization && specialization !== "All") url += `&specialization=${specialization}`;
        const response = await api.get(url);
        dispatch({ type: GET_ALL_DOCTOR_SUCCESS, payload: response.data });
        return true;
    } catch (error) {
        dispatch({ type: GET_ALL_DOCTOR_FAIL, payload: error.response?.data });
        return false;
    }
}

export const getDoctorById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_DOCTOR_BY_ID_START });
        const response = await api.get(`/doctors/${id}`);
        dispatch({ type: GET_DOCTOR_BY_ID_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        dispatch({ type: GET_DOCTOR_BY_ID_FAIL, payload: error.response?.data?.message || "Failed to load doctor" });
        return false;
    }
}

export const doctorLogin = (email, password) => async (dispatch) => {
    dispatch({ type: DOCTOR_LOGIN_START });
    try {
        const res = await api.post("/doctors/login", { email, password });
        dispatch({ type: DOCTOR_LOGIN_SUCCESS, payload: res.data.token });
        if (res.data.token) {
            localStorage.setItem("doctorToken", res.data.token);
        }
        return true;
    } catch (error) {
        const message = error.response?.data?.message || "Invalid email or password";
        dispatch({ type: DOCTOR_LOGIN_FAIL, payload: message });
        return false;
    }
};

export const doctorLogout = () => (dispatch) => {
    dispatch({ type: DOCTOR_LOGOUT_SUCCESS });
    localStorage.removeItem("doctorToken");
};

export const getDoctorAppointments = () => async (dispatch) => {
    try {
        dispatch({ type: GET_DOCTOR_APPOINTMENTS_START });
        
        // Use doctorToken from localStorage since the API is protected
        const token = localStorage.getItem("doctorToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await api.get("/doctors/appointments", config);
        dispatch({ type: GET_DOCTOR_APPOINTMENTS_SUCCESS, payload: response.data.data });
        return true;
    } catch (error) {
        dispatch({ type: GET_DOCTOR_APPOINTMENTS_FAIL, payload: error.response?.data?.message || "Failed to load appointments" });
        return false;
    }
};

export const changeAppointmentStatus = (id, status) => async (dispatch) => {
    try {
        const token = localStorage.getItem("doctorToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.put("/doctors/change-appointment-status", { id, status }, config);
        
        if (response.data.message === "success") {
            dispatch({ type: CHANGE_DOCTOR_APPOINTMENT_STATUS_SUCCESS, payload: { id, status } });
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};
