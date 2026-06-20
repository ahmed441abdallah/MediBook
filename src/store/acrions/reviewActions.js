import api from "../../services/api";
import {
    GET_REVIEWS_START,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    ADD_REVIEW_START,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
} from "../types";

export const getReviews = (doctorId) => async (dispatch) => {
    dispatch({ type: GET_REVIEWS_START });
    try {
        const response = await api.get(`/reviews/${doctorId}`);
        dispatch({ type: GET_REVIEWS_SUCCESS, payload: response.data });
        return true;
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response?.data?.message || "Failed to load reviews",
        });
        return false;
    }
};

export const addReview = (reviewData) => async (dispatch) => {
    dispatch({ type: ADD_REVIEW_START });
    try {
        const response = await api.post("/reviews", reviewData);
        dispatch({ type: ADD_REVIEW_SUCCESS, payload: response.data.data });
        return { success: true };
    } catch (error) {
        const message = error.response?.data?.message || "Failed to submit review";
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: message,
        });
        return { success: false, message };
    }
};
