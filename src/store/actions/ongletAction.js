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

export const CreateOnglet = (onglet, nomCours) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const id = await idCours(nomCours, firestore);
    const exist = await ongletAlreadyExist(getState, id, onglet.nomOnglet);
    if (!exist) {
      firestore
        .collection("onglet")
        .add({
          ...onglet,
          idCours: id,
        })
        .then(() => {
          dispatch({ type: "ADD_ONGLET", onglet });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", err });
        });
    } else {
      alert("already exist !");
    }
  };
};
