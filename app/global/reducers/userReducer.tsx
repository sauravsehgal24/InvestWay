import axios from "axios";
import jwtDecode from "jwt-decode";
import redux from "redux";

import userActions from "../actions/userAction";

const initialState = null;

const clearUserTokenFromLS = () => {
    localStorage.removeItem(`investway_token`);
    localStorage.removeItem(`investway_exp`);
};

// ---------------------------------------------------------------------------
const userReducer = (
    state = initialState,
    { type, payload } = userActions as unknown
) => {
    switch (type) {
        case "AUTH": {
            return payload;
        }
        case "DEBUGMODE": {
            return { ...state, debugMode: payload };
        }
        case "LOGOUT":
            clearUserTokenFromLS();
            return null;
        default:
            return state;
    }
};

export default userReducer;
