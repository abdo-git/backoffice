export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (prof) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(prof.email, prof.password)
      .then((resp) => {
        return firestore
          .collection("professeur")
          .doc(resp.user.uid)
          .set({
            fullName: prof.fullName,
          })
          .then(() => {
            firebase
              .auth()
              .signOut()
              .then(() => window.location = "/signin");
          });
      })
      .catch((err) => {
        console.log("error");
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
