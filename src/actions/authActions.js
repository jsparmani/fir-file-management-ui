import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from "./types";
import axios from "axios";

import {notification} from "antd";

axios.defaults.baseURL = "https://firfiletracking.pythonanywhere.com/api";

const openNotificationWithIconLogin = (type, placement) => {
    notification[type]({
        message: type === "success" ? "Login Success" : "Login Failed",
        description:
            type === "success"
                ? "You are logged in Successfully"
                : "There seems to be some issue! Please try again",
        placement
    });
};

const openNotificationWithIconLogout = (type, placement) => {
    notification[type]({
        message: type === "success" ? "Success" : "Failed",
        description:
            type === "success"
                ? "You are logged out Successfully"
                : "There seems to be some issue! Please try again",
        placement
    });
};

export const loginUser = (email, password, props) => async dispatch => {
    dispatch({type: LOGIN_USER});

    axios
        .post("/user/token/", {email, password})
        .then(res => {
            loginUserSuccess(dispatch, res.data.token, props);
        })

        .catch(() => {
            loginUserFail(dispatch);
        });
};

const loginUserSuccess = async (dispatch, token, props) => {
    axios
        .post("user/check-user/", {
            token: token
        })
        .then(res => {
            openNotificationWithIconLogin("success", "bottomRight");

            let type = res.data.type;

            let dist_id = null;
            let ps_id = null;
            let user_id = null;

            if (type === "superuser") {
                user_id = res.data.id;
            } else if (type === "district") {
                dist_id = res.data.district;
                user_id = res.data.id;
            } else if (type === "ps") {
                ps_id = res.data.ps;
                user_id = res.data.id;
            }

            props.history.push("/");

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: [`Token ${token}`, user_id, ps_id, dist_id]
            });
        });
};

const loginUserFail = dispatch => {
    openNotificationWithIconLogin("error", "bottomRight");
    dispatch({type: LOGIN_USER_FAIL});
};

export const logoutUser = props => async dispatch => {
    openNotificationWithIconLogout("success", "bottomRight");
    props.history.push("/");
    dispatch({type: LOGOUT_USER});
};

// export const loginCheck = navigation => async dispatch => {
//     token = await AsyncStorage.getItem("auth_token");
//     if (token) {
//         const raw_token = token.split(" ")[1];
//         axios
//             .post("user/check-user/", {
//                 token: raw_token
//             })
//             .then(res => {
//                 if (res.status === 200) {
//                     type = res.data.type;

//                     let dept_id = null;
//                     if (type !== "citizen") {
//                         dept_id = res.data.department_id;
//                     }

//                     routes = [];

//                     if (type === "citizen") {
//                         routes = [
//                             "HomeMain",
//                             "Complaints",
//                             "PayBill",
//                             "Downloads",
//                             "Departments",
//                             "New_Connection",
//                             "Settings"
//                         ];
//                     } else if (type === "department") {
//                         routes = [
//                             "HomeMain",
//                             "Add_Scheme",
//                             "Department_Schemes",
//                             "View_Complaints",
//                             "Settings"
//                         ];
//                     } else if (type === "superuser") {
//                         routes = ["HomeMain", "AddDepartment", "Settings"];
//                     }

//                     dispatch({
//                         type: LOGIN_CHECK,
//                         payload: [
//                             `${token}`,
//                             type,
//                             dept_id,
//                             res.data.id,
//                             routes
//                         ]
//                     });

//                     navigation.navigate("HomeMain");
//                     Toast.show({
//                         text: "Successfully Logged In!",
//                         buttonText: "Okay",
//                         type: "success"
//                     });
//                 } else {
//                     alert("Not 200");
//                 }
//             })
//             .catch(err => {});
//     }
// };
