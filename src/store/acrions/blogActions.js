import api from "../../services/api";
import { 
    GET_ALL_BLOGS_START, 
    GET_ALL_BLOGS_SUCCESS, 
    GET_ALL_BLOGS_FAIL,
    ADD_BLOG_START,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_FAIL,
    REMOVE_BLOG_SUCCESS
} from "../types";

export const getAllBlogs = (page = 1, limit = 9, category = "All") => async (dispatch) => {
    dispatch({ type: GET_ALL_BLOGS_START });
    try {
        let url = `/blogs?page=${page}&limit=${limit}`;
        if (category && category !== "All") url += `&category=${category}`;
        
        const response = await api.get(url);
        dispatch({ type: GET_ALL_BLOGS_SUCCESS, payload: response.data });
        return true;
    } catch (error) {
        dispatch({ type: GET_ALL_BLOGS_FAIL, payload: error.response?.data?.message || "Failed to fetch blogs" });
        return false;
    }
};

export const addBlog = (blogData) => async (dispatch) => {
    dispatch({ type: ADD_BLOG_START });
    try {
        const response = await api.post("/blogs", blogData);
        dispatch({ type: ADD_BLOG_SUCCESS, payload: response.data });
        return { success: true, message: response.data.message };
    } catch (error) {
        dispatch({ type: ADD_BLOG_FAIL, payload: error.response?.data?.message || "Failed to add blog" });
        return { success: false, message: error.response?.data?.message || "Failed to add blog" };
    }
};

export const removeBlog = (id) => async (dispatch) => {
    try {
        await api.delete(`/blogs/${id}`);
        dispatch({ type: REMOVE_BLOG_SUCCESS, payload: id });
        return true;
    } catch (error) {
        console.error("Failed to remove blog:", error);
        return false;
    }
};
