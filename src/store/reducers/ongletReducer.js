const initState = {
  onglet: [
    {
      idOnglet: "",
      nom: "",
      idCours: "",
    },
  ],
};

const ongletReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ONGLET":
      console.log("onglet added")
      break;
    case "DELETE_ONGLET":
      console.log("onglet deleted")
      break
    case "Error":
      console.log(action.err);
      break;
    default:
      break;
  }
  return state;
};

export default ongletReducer;
