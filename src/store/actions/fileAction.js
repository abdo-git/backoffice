function getTags(firestore, idProf) {
  const tags = [];
  return new Promise((resolve) => {
    firestore
      .collection("tags")
      .where("idProf", "==", idProf)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          tags.push({
            id: doc.id,
            libelle: doc.data().libelle,
          });
        });
        resolve(tags);
      });
  });
}
function getChapitres(firestore, idCours) {
  const chap = [];
  return new Promise((resolve) => {
    firestore
      .collection("chapitre")
      .where("idCours", "==", idCours)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          chap.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve(chap);
      });
  });
}

function getOnglets(firestore, idCours, chaps) {
  const onglet = [];
  return new Promise((resolve) => {
    firestore
      .collection("onglet")
      .where("idCours", "==", idCours)
      .orderBy("idOnglet")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          onglet.push({
            idOnlget: doc.data().idOnglet,
            ongletName: doc.data().nomOnglet,
            chapters:
              chaps &&
              chaps.filter((chap) => chap.idOnglet === doc.data().idOnglet),
          });
        });
        resolve(onglet);
      });
  });
}

export const generateFile = (cours) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const chaps = await getChapitres(firestore, cours.id);
    const onglet = await getOnglets(firestore, cours.id, chaps);
    const tags = await getTags(firestore, getState().firebase.auth.uid);

    const file = {
      name: cours.nomCours,
      tags: tags,
      onglets: onglet,
    };

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var json = JSON.stringify(file, null, 2),
      blob = new Blob([json], { type: "application/json" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "Data.json";
    a.click();
    window.URL.revokeObjectURL(url);
  };
};
