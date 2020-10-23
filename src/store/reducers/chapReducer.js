const initState = {
  chapitre: [
    {
      titre: "",
      contenu: "",
      volumeHoraire: "",
      niveau: "",
      tags: [],
      idOnget: "",
      idCours: "",
    },
  ],
};

const chapReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_CHAP":
      console.log("chapitre ajoute", action.chap);
      break;
    case "DELETE_CHAP":
      console.log("chapitre supprimer");
      break;
    case "UPDATE_CHAP":
      console.log("chapitre modifie");
      break;
    default:
      break;
  }
  return state;
};

export default chapReducer;
