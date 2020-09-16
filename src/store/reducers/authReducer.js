const initState = { signinError: null, signupError: null };
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        signinError: null,
        signupError: null,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        signinError: action.err.message,
        signupError: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("sign out success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        signinError: null,
        signupError: null,
      };
    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        signupError: action.err.message,
        signinError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
