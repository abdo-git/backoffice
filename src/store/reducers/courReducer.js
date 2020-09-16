const initState = {
  cour: [
    {
      nom: "",
      nbrOnglet: "",
      idProf: "",
      date: "",
    },
  ],
  exist: null,
};
const courReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_COURS":
      console.log("Cours Ajoute");
      return {
        ...state,
        exist: null,
      };
    case "DELETE_COURS":
      console.log("cours supprime avec succes");
      return {
        ...state,
        exist: null,
      };
    case "EXIST":
      console.log("exist");
      return {
        ...state,
        exist: action.msg,
      };
    case "Error":
      console.log(action.err);
      return {
        ...state,
        exist: null,
      };
    default:
      return state;
  }
};

export default courReducer;
