const initState = {
    chapitre:[{
        titre:'',
        contenu:'',
        volumeHoraire:'',
        niveau:"",
        idOnget:''
    }]
};

const chapReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CHAP':
      console.log(action.chap)
      break;
  
    default:
      break;
  }
  return state;
};

export default chapReducer;
