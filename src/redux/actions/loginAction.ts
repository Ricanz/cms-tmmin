export const LOGIN_ACTION = "LOGIN_ACTION";

export const setUser = (user: any) => ({
    type: LOGIN_ACTION,
    user: user,
});