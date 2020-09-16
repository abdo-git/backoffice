function idCours(nomCours, firestore) {
  return new Promise((resolve) => {
    firestore
      .collection("cours")
      .where("nomCours", "==", nomCours)
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          resolve(doc.id);
        });
      });
  });
}

export const CreateChap = (chap, nomCours) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const id = await idCours(nomCours, firestore)
    firestore
      .collection("chapitre")
      .add({
        ...chap,
        idCours:id
      })
      .then(() => {
        dispatch({ type: "ADD_CHAP", chap: chap });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", err });
      });
  };
};
