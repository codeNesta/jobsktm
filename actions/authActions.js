
import * as firebase from 'firebase'

export  const loggedIn = (userId,token,name,image) =>{
    return async dispatch => {
        dispatch({
            type:"LOGGED_IN",
            userId:userId,
            token:token,
            name:name,
            image:image
        })
    }
}


export  const loggedOut = () =>{
    return async dispatch => {
       firebase.auth().signOut()
       .then(function(){
                            dispatch({
                                type:"LOGGED_IN",
                                userId:undefined,
                                token:undefined,
                                name:undefined,
                                image:undefined
                            })
       })
    }
}

