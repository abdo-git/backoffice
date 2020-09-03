export const AddTag = (tag) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("tags")
      .where("libelle", "==", tag.libelle)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          alert("le Tag existe deja !");
        } else {
          firestore
            .collection("tags")
            .add({
              ...tag,
              idProf: "1",
            })
            .then(() => {
              dispatch({ type: "ADD_TAG", tag });
            })
            .catch((err) => {
              dispatch({ type: "ERROR", err });
            });
        }
      });
  };
};
