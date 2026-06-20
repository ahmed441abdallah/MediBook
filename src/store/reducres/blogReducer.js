import { 
    GET_ALL_BLOGS_START, 
    GET_ALL_BLOGS_SUCCESS, 
    GET_ALL_BLOGS_FAIL,
    ADD_BLOG_START,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_FAIL,
    REMOVE_BLOG_SUCCESS
} from "../types";

const initialState = {
    blogs: [],
    totalBlogs: 0,
    loading: false,
    error: null,
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BLOGS_START:
        case ADD_BLOG_START:
            return { ...state, loading: true, error: null };
            
        case GET_ALL_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload.data,
                totalBlogs: action.payload.total,
            };
            
        case ADD_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: [action.payload.data, ...state.blogs],
                totalBlogs: state.totalBlogs + 1,
            };
            
        case GET_ALL_BLOGS_FAIL:
        case ADD_BLOG_FAIL:
            return { ...state, loading: false, error: action.payload };
            
        case REMOVE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
                totalBlogs: state.totalBlogs - 1,
            };
            
        default:
            return state;
    }
};

export default blogReducer;
