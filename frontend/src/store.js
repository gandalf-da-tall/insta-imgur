import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  postListReducer,
  postDetailsReducer,
  postCommentCreateReducer,
  postCreateReducer,
} from "./reducers/postReducers";

const reducer = combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postCommentCreate: postCommentCreateReducer,
  postCreate: postCreateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
