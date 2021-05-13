import jwtDecode from "jwt-decode";
import { AuthResponse } from "../../..";
import { _apiCall } from "../../../utils/Axios";

export const asyncAuth = (payload) => {
    return function (_d) {
        return _apiCall<AuthResponse>(
            "POST",
            `${process.env.REACT_APP_API}/users/auth`,
            null,
            payload
        )
            .then((response) => {
                if (response.data.isActivated) {
                    const { token, isActivated } = response.data;
                    if (!isActivated) {
                        throw "Please activate your account first";
                    }
                    loadUserInfo({ token }, _d);
                    return "success";
                }
            })
            .catch((err) => {
                console.log(`ERROR IN AUTH ACTION -------------------\n${err}`);
                return null;
            });
    };
};

const loadUserInfo = ({ token }, dispatch) => {
    const decodedToken = jwtDecode<{ userId: string; exp: string }>(token);
    const { userId, exp } = decodedToken;
    _apiCall<AuthResponse>(
        "GET",
        `${process.env.REACT_APP_API}/users?userId=${userId}`,
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
            loadUserInfo({ token }, dispatch);
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
