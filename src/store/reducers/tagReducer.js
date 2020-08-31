const initState = {
  tag: [
    {
      libelle: "",
    },
  ],
};

const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TAG":
      console.log("tag Ajoute");
      break;
    case "ERROR ":
        console.log(action.err)
        break;
    default:
      break;
  }
  return state;
};

export default tagReducer;
