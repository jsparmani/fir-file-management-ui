import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from "./types";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

export const loginUser = (email, password) => async dispatch => {
    dispatch({type: LOGIN_USER});

    axios
        .post("/user/token/", {email, password})
        .then(res => {
            console.log(res.data);
            loginUserSuccess(dispatch, res.data.token);
        })

        .catch(() => {
            loginUserFail(dispatch);
        });
};

const loginUserSuccess = async (dispatch, token) => {
    axios
        .post("user/check-user/", {
            token: token
        })
        .then(res => {
            let type = res.data.type;

            let dist_id = null;
            let ps_id = null;
            let user_id = null;

            if (type == "superuser") {
                user_id = res.data.id;
            } else if (type === "district") {
                dist_id = res.data.district;
                user_id = res.data.id;
            } else if (type === "ps") {
                ps_id = res.data.ps;
                user_id = res.data.id;
            }

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: [`Token ${token}`, user_id, ps_id, dist_id]
            });
        });
};

const loginUserFail = dispatch => {
    dispatch({type: LOGIN_USER_FAIL});
};

export const logoutUser = navigation => async dispatch => {
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
