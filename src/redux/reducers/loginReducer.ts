import { LOGIN_ACTION } from "../actions/loginAction";

const initialState = {
    user: null,
    auth: null,
};

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return { ...state, user: {}, auth: {} };
        default:
            return state;
    }
};

export default loginReducer;