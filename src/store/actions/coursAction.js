function delChap(idCours, firestore) {
  return new Promise((resolve) => {
    firestore
      .collection("chapitre")
      .where("idCours", "==", idCours)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
        resolve(true);
      });
    resolve(true);
  });
}

function delOnglet(idCours, firestore) {
  return new Promise((resolve) => {
    firestore
      .collection("onglet")
      .where("idCours", "==", idCours)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
        resolve(true);
      });
    resolve(true);
  });
}

export const DeleteCours = (cours) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    console.log("cours supp", cours.id)
    const chap = await delChap(cours.id, firestore);
    const onglet = await delOnglet(cours.id, firestore);
    console.log(chap, onglet)
    if (chap && onglet) {
      firestore
        .collection("cours")
        .doc(cours.id)
        .delete()
        .then(() => {
          dispatch({ type: "DELETE_COURS", cours });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", err });
        });
    }
  };
};

export const CreateCours = (cours) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(getState(), getFirebase());
    const idProf = getState().firebase.auth.uid;
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
