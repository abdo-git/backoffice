export  const CreateChap = (chap) =>{
    return (dispatch, getState)=>{
        dispatch({type:'ADD_CHAP', chap:chap})
    }
}