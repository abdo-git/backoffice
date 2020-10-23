function idCours(nomCours, idProf, firestore) {
  return new Promise((resolve) => {
    firestore
      .collection("cours")
      .where("nomCours", "==", nomCours)
      .where("idProf", "==", idProf)
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
    const id = await idCours(nomCours, getState().firebase.auth.uid, firestore);
    firestore
      .collection("chapitre")
      .add({
        ...chap,
        idCours: id,
      })
      .then(() => {
        dispatch({ type: "ADD_CHAP", chap: chap });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", err });
      });
  };
};

export const DeleteChap = (idChap) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("chapitre")
      .doc(idChap)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_CHAP" });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", err });
      });
  };
};

export const UpdateChap = (idChap, newChap) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(idChap)
    console.log(newChap)
    const firestore = getFirebase().firestore();
    firestore
      .collection("chapitre")
      .doc(idChap)
      .set(newChap)
      .then(() => {
        dispatch({ type: "UPDATE_CHAP" });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", err });
      });
  };
};
