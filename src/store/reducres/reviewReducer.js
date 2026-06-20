import {
    GET_REVIEWS_START,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    ADD_REVIEW_START,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL,
} from "../types";

const initialState = {
    reviews: [],
    averageRating: 0,
    loading: false,
    error: null,
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_START:
        case ADD_REVIEW_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload.data,
                averageRating: action.payload.averageRating,
            };
        case ADD_REVIEW_SUCCESS: {
            const newReviews = [action.payload, ...state.reviews];
            const newAverageRating = newReviews.reduce((acc, rev) => acc + rev.rating, 0) / newReviews.length;
            return {
                ...state,
                loading: false,
                reviews: newReviews,
                averageRating: newAverageRating,
            };
        }
        case GET_REVIEWS_FAIL:
        case ADD_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reviewReducer;
