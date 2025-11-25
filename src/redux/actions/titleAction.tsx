export const CHANGE_TITLE = "CHANGE_TITLE";
export const SHOW_TOAST = "SHOW_TOAST";

export const changeTitle = (title: string) => ({
    type: CHANGE_TITLE,
    title: title
});

export const showToast = (toast: boolean, toastTitle: string) => {
    return {
        type: SHOW_TOAST,
        toast: toast,
        toastTitle,
    };
};