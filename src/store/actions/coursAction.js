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
    const chap = await delChap(cours.id, firestore);
    const onglet = await delOnglet(cours.id, firestore);
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

function coursAlreadyExist(listCours, idProf, nomCours) {
  return new Promise((resolve) => {
    console.log(listCours);
    const coursFiltered =
      listCours && listCours.filter((cours) => cours.idProf === idProf);
    if (coursFiltered.length !== 0) {
      coursFiltered.forEach((cours) => {
        if (cours.nomCours === nomCours) resolve(true);
      });
    }
    resolve(false);
  });
}

export const CreateCours = (cours, listCours) => {
  return async (dispatch, getState, { getFirebase }) => {
    const idProf = getState().firebase.auth.uid;
    const existCours = await coursAlreadyExist(
      listCours,
      idProf,
      cours.nomCours
    );
    const firestore = getFirebase().firestore();
    if (!existCours) {
      firestore
        .collection("cours")
        .add({
          nomCours: cours.nomCours,
          nbrOnglet: cours.nbrOnglet,
          idProf: idProf,
          date: new Date(),
        })
        .then(() => {
          dispatch({ type: "ADD_COURS", cours: cours });
        })
        .catch((err) => {
          dispatch({ type: "Error", err });
        });
    } else {
      dispatch({
        type: "EXIST",
        msg: "cours already exist",
      });
    }
  };
};
