

function idCours(nomCours, idProf,firestore) {
  return new Promise((resolve) => {
    firestore
      .collection("cours")
      .where("nomCours", "==", nomCours)
      .where("idProf", "==",idProf)
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          resolve(doc.id);
        });
      });
  });
}

function ongletAlreadyExist(getState, idCours, nomOnglet) {
  return new Promise((resolve) => {
    const onglets = getState().firestore.ordered.onglet;
    if (onglets.length !== 0) {
      const ongletsFiltered = onglets.filter(
        (onglet) => onglet.idCours === idCours
      );
      ongletsFiltered.forEach((onglet) => {
        if (onglet.nomOnglet === nomOnglet) resolve(true);
      });
    }
    resolve(false);
  });
}

///Add Onglet
export const CreateOnglet = (onglet, nomCours) => {
  return async (dispatch, getState, { getFirebase }) => {
    console.log(getState())
    const firestore = getFirebase().firestore();
    const id = await idCours(nomCours, getState().firebase.auth.uid, firestore);
    const exist = await ongletAlreadyExist(getState, id, onglet.nomOnglet);

    if (!exist) {
      firestore
        .collection("onglet")
        .add({
          idOnglet: onglet.idOnglet,
          nomOnglet: onglet.nomOnglet,
          idCours: id,
        })
        .then(() => {
          dispatch({ type: "ADD_ONGLET", onglet });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", err });
        });
    } else {
      alert("already exist ! type another name");
    }
  };
};

/////////Delete Onglet
function delChap(idOnglet, idCours, firestore) {
  return new Promise((resolve) => {
    firestore
      .collection("chapitre")
      .where("idCours", "==", idCours)
      .where("idOnglet", "==", idOnglet)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    resolve(true);
  });
}

export const DeleteOnglet = (idOnglet, idCours) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    console.log(idOnglet, idCours)
    const Chap = await delChap(idOnglet, idCours, firestore);
    if (Chap) {
      firestore
        .collection("onglet")
        .where("idCours", "==", idCours)
        .where("idOnglet", "==", idOnglet)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .then(() => {
          dispatch({ type: "DELETE_ONGLET"});
        })
        .catch((err) => {
          dispatch({ type: "ERROR", err });
        });
    }
  };
};
