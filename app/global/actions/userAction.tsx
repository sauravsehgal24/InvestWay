import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import { AuthResponse } from "../../..";
import { _get, _post } from "../../../utils/Axios";

export const asyncAuth = (payload) => {
    return function (_d) {
        return _post<AuthResponse>(
            `${process.env.REACT_APP_API}/users/auth`,
            null,
            payload
        )
            .then((response) => {
                console.log(`RES`);

                if (response.isActivated) {
                    console.log(response);

                    const { token, isActivated } = response;
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
    console.log("LOAD USER");
    const decodedToken = jwtDecode<{ userId: string; exp: string }>(token);
    const { userId, exp } = decodedToken;

    _get<AuthResponse>(`${process.env.REACT_APP_API}/users?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            console.log(res);
            const user = res;
            if (!user.isActivated) {
                throw "Please activate your account first";
            }
            dispatch(_saveUserToState(user));
            const role = user.role;
            saveUserTokenToLS({ token, exp, role });
        })
        .catch((err) => {
            dispatch(_logout());
        });
};

const saveUserTokenToLS = (payload) => {
    const { token, exp, role } = payload;
    localStorage.setItem(`investway_token`, token);
    localStorage.setItem(`investway_token`, exp);
};

export const tryAutoAuthentication = (role) => {
    return function (dispatch) {
        const token = localStorage.getItem(`liteboardscom_${role}token`);
        const exp = parseInt(localStorage.getItem(`liteboardscom_${role}exp`));
        // const date = new Date();
        const now = new Date().getTime() / 1000;

        if (token && exp - now > 0) {
            console.log("loading user....");
            loadUserInfo({ token }, dispatch);
        } else {
            dispatch(_logout());
        }
    };
};

// -----------------------------------------------------------------------------------------
const _logout = () => {
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
