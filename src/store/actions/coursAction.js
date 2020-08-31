export const CreateCours = (cours) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(cours);
    const firestore = getFirebase().firestore();
    firestore
      .collection("cours")
      .add({
        ...cours,
        idProf: "1",
      })
      .then(() => {
        dispatch({ type: "ADD_COURS", cours: cours });
      })
      .catch((err) => {
        dispatch({ type: "Error", err });
      });
  };
};
