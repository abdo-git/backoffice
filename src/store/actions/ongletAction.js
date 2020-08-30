export const CreateOnglet = (onglet) => {
    return (dispatch, getState) => {
        console.log(onglet)
      dispatch({ type: "ADD_ONGLET", onglet: onglet });
    };
};
  