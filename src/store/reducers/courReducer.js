const initState = {
  cour: [
    {
      nom: "",
      nbrOnglet: "",
      idProf: "",
      date: "",
    },
  ],
};
const courReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_COURS":
      console.log("Cours Ajoute");
      break;
    case "DELETE_COURS":
      console.log("cours supprime avec succes");
      break;
    case "Error":
      console.log(action.err);
      break;
    default:
      break;
  }
  return state;
};

export default courReducer;
