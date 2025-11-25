import { CHANGE_TITLE, SHOW_TOAST } from "../actions/titleAction";

const initialState = {
    title: "Welcome",
    toast: false,
    toastTitle: "",
};

const titleReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case CHANGE_TITLE:
            return { ...state, title: action.title };

        case SHOW_TOAST:
            return { ...state, toast: action.toast, toastTitle: action.toastTitle };

        default:
            return state;
    }
};

export default titleReducer;