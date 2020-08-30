export const CreateCours = (cours) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        console.log(cours)
      dispatch({ type: "ADD_COURS", cours: cours });
    };
  };
  