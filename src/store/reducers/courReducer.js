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
      return {
        ...state,
        exist: action.msg,
      };
    case "Error":
      return {
        ...state,
        exist: null,
      };
    default:
      return state;
  }
};

export default courReducer;
