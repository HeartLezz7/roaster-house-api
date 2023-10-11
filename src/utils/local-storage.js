const ACCESS_TOKEN = "ACCESS_TOKEN";

const createAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
const deleteAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
