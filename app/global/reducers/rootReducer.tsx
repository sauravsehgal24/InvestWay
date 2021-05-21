import { combineReducers } from "redux";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    userInfo: userReducer,
});

export default allReducers;
