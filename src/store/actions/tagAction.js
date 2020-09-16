export const DeleteTag = (tag) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("tags")
      .doc(tag.id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_TAG", tag });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", err });
      });
  };
};

function coursAlreadyExist(getState, idProf, libelle) {
  return new Promise((resolve) => {
    const tags = getState().firestore.ordered.tags;
    if (tags.length !== 0) {
      const tagsFiltered = tags.filter((tag) => tag.idProf === idProf);
      tagsFiltered.forEach((tag) => {
        if (tag.libelle === libelle) resolve(true);
      });
    }
    resolve(false);
  });
}
export const AddTag = (tag) => {
  return async (dispatch, getState, { getFirebase }) => {
    const idProf = getState().firebase.auth.uid;
    const firestore = getFirebase().firestore();
    const existTag = await coursAlreadyExist(getState, idProf, tag.libelle);
    if (!existTag) {
      firestore
        .collection("tags")
        .add({
          libelle: tag.libelle,
          idProf: idProf,
        })
        .then(() => {
          dispatch({ type: "ADD_TAG", tag });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", err });
        });
    } else {
      alert("already exist !")
    }
  };
};
