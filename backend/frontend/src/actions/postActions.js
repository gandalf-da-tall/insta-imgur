import axios from "axios";

// constants
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_CREATE_COMMENT_REQUEST,
  POST_CREATE_COMMENT_SUCCESS,
  POST_CREATE_COMMENT_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
} from "../constants/postConstants";

//Goes to the home screen
export const listPosts = () => async (dispatch) => {
  try {
    // get state
    dispatch({ type: POST_LIST_REQUEST });

    // send get request
    const { data } = await axios.get("/api/posts/");

    // update state with success data
    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // udate state with error
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// goes to the Post screen
export const listPostDetails = (id) => async (dispatch) => {
  try {
    // get state
    dispatch({ type: POST_DETAILS_REQUEST });

    // send get request
    const { data } = await axios.get(`/api/posts/${id}`);

    // update state with success data
    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // udate state with error
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Goes to the post screen
export const createPostComment =
  (postId, comment) => async (dispatch, getState) => {
    try {
      // get state
      dispatch({ type: POST_CREATE_COMMENT_REQUEST });

      // send get request
      const { data } = await axios.post(
        `/api/posts/${postId}/comments/`,
        comment
      );

      // update state with success data
      dispatch({
        type: POST_CREATE_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // udate state with error
      dispatch({
        type: POST_CREATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// goes to the upload screen
export const createPost = (post) => async (dispatch, getState) => {
  try {
    // get state
    dispatch({ type: POST_CREATE_REQUEST });

    // send get request
    const { data } = await axios.post(`/api/upload/`, post);

    // update state with success data
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // udate state with error
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
