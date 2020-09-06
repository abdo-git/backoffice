
export const CreateChap = (chap) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("chapitre")
      .add({
        ...chap,
      })
      .then(() => {
        dispatch({ type: "ADD_CHAP", chap: chap });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", err });
      });
  };
};
