import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER
    // LOGIN_CHECK
} from "../actions/types";

const INITIAL_STATE = {
    token: null,
    loading: false,
    isLoggedIn: false,
    dist_id: null,
    user_id: null,
    ps_id: null,
    leftRoutes: [
        {
            key: "home",
            to: "/",
            display: "Home"
        }
    ],
    rightRoutes: [
        {
            key: "login",
            to: "/login",
            display: "Login"
        }
    ]
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...INITIAL_STATE,
                loading: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                token: action.payload[0],
                user_id: action.payload[1],
                ps_id: action.payload[2],
                dist_id: action.payload[3],
                loading: false,
                isLoggedIn: true,
                leftRoutes: [
                    {
                        key: "home",
                        to: "/",
                        display: "Home"
                    },
                    {
                        key: "register_fir",
                        to: "/register-fir",
                        display: "Add FIR"
                    },
                    {
                        key: "status_fir",
                        to: "/status-fir",
                        display: "FIR Status"
                    },
                    {
                        key: "view_fir",
                        to: "/view-firs",
                        display: "View FIRs"
                    }
                ],
                rightRoutes: [
                    {
                        key: "logout",
                        to: "/",
                        display: "Logout"
                    }
                ]
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                leftRoutes: [
                    {
                        key: "home",
                        to: "/",
                        display: "Home"
                    }
                ],
                rightRoutes: [
                    {
                        key: "login",
                        to: "/login",
                        display: "Login"
                    }
                ]
            };
        case LOGOUT_USER:
            return {
                ...INITIAL_STATE
            };
        /* case LOGIN_CHECK:
            return {
                ...state,
                token: action.payload[0],
                user_type: action.payload[1],
                dept_id: action.payload[2],
                isLoggedIn: true,
                user_id: action.payload[3],
                routes: action.payload[4]
            }; */
        default:
            return state;
    }
};
