import jwtDecode from "jwt-decode";
import { AuthResponse } from "../../..";
import { _apiCall } from "../../../utils/Axios";
import { v4 as uuidv4 } from "uuid";

const generateAuthPsdToken = () => {
    const tempToken: string = uuidv4();
};

const isChecked = () => {
    const email = localStorage.getItem("email");
    const chkTkn = localStorage.getItem("chkTkn");
    if (email && email.trim() !== "" && chkTkn && chkTkn.trim() !== "") {
        const newTkn = uuidv4();
        localStorage.setItem("athTkn", newTkn);
        return newTkn;
    } else {
        return "";
    }
};

export const asyncAuth = (payload) => {
    return function (_d) {
        return _apiCall<AuthResponse>(
            "POST",
            `${process.env.REACT_APP_API}/users/auth`,
            null,
            {
                ...payload,
                athTkn: localStorage.getItem("athTkn")
                    ? localStorage.getItem("athTkn")
                    : "",
            }
        )
            .then((response) => {
                if (response.data.isActivated) {
                    const { token, isActivated } = response.data;
                    if (!isActivated) {
                        throw "Please activate your account first";
                    }
                    const newAthTkn = isChecked();
                    loadUserInfo({ token, newAthTkn }, _d);
                    return "success";
                }
            })
            .catch((err) => {
                return null;
            });
    };
};

const loadUserInfo = ({ token, newAthTkn }, dispatch) => {
    const decodedToken = jwtDecode<{ userId: string; exp: string }>(token);
    const { userId, exp } = decodedToken;
    _apiCall<AuthResponse>(
        "GET",
        `${process.env.REACT_APP_API}/users?userId=${userId}&athTkn=${newAthTkn}`,
        { Authorization: `Bearer ${token}` }
    )
        .then((res) => {
            const user = res.data;
            if (!user.isActivated) {
                throw "Please activate your account first";
            }
            dispatch(_saveUserToState(user));
            const role = user.role;
            saveUserTokenToLS({ token, exp, role });
        })
        .catch((err) => {
            console.log("ERROR INSIDE LOAD USER");
            dispatch(_logout());
        });
};

const saveUserTokenToLS = (payload) => {
    const { token, exp, role } = payload;
    localStorage.setItem(`investway_token`, token);
    localStorage.setItem(`investway_exp`, exp);
};

export const tryAutoAuthentication = (role) => {
    return function (dispatch) {
        const token = localStorage.getItem(`investway_token`);
        const exp = parseInt(localStorage.getItem(`investway_exp`));
        // const date = new Date();
        const now = new Date().getTime() / 1000;
        console.log("INSIDE AUTOAUTH");
        if (token && exp - now > 0) {
            console.log("loading user....");
            const newAthTkn = isChecked();
            loadUserInfo({ token, newAthTkn }, dispatch);
        } else {
            console.log("LOGOUT INSIDE AUTO AUTH");
            dispatch(_logout());
        }
    };
};

// -----------------------------------------------------------------------------------------
export const _logout = () => {
    return {
        type: "LOGOUT",
        payload: {},
    };
};

const _saveUserToState = (payload) => {
    return {
        type: "AUTH",
        payload: payload,
    };
};

export default {
    _logout,
    _saveUserToState,
};
