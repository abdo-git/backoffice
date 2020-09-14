export const CreateCours = (cours) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(getState(), getFirebase())
    const idProf = getState().firebase.auth.uid
    const firestore = getFirebase().firestore();
    firestore
      .collection("cours")
      .where("nomCours", "==", cours.nomCours)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          alert("cours already exist");
        } else {
          firestore
            .collection("cours")
            .add({
              ...cours,
              idProf: idProf,
              date: new Date(),
            })
            .then(() => {
              dispatch({ type: "ADD_COURS", cours: cours });
            })
            .catch((err) => {
              dispatch({ type: "Error", err });
            });
        }
      });
  };
};
