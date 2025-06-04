// actions/loginActions.js
export const checkLogin = (status) => {
  return {
    type: "CHECK_LOGIN",
    status,
  };
};
