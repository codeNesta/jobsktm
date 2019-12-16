


export default  (state={}, action) => {
    switch(action.type){

        case "LOGGED_IN":
            return {
                ...state,
                userId:action.userId,
                token:action.token,
                name:action.name,
                image:action.image
            }


        default :
        return state
    }


  
}