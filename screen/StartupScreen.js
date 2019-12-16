
import React, { useEffect} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase'
import {useDispatch} from 'react-redux';
import * as authActions from '../actions/authActions'

var firebaseConfig = {
  apiKey: "AIzaSyBb4FL9PbbS3j3SpH_i7_FTOf7LF39Mk6o",
  authDomain: "jobsktm-a474c.firebaseapp.com",
  databaseURL: "https://jobsktm-a474c.firebaseio.com",
  projectId: "jobsktm-a474c",
  storageBucket: "jobsktm-a474c.appspot.com",
  messagingSenderId: "501265617285",
  appId: "1:501265617285:web:a9d9e4556a631d729bb4ec",
  measurementId: "G-54HJGYB5KX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// create a component
const StarupScreen = (props) => {
  const dispatch = useDispatch()

      const tryLogin = async () => {
                          try{
                            await firebase.auth().onAuthStateChanged(user => {
   
                              if(user != null) {
                                
                                    dispatch(authActions.loggedIn(user.uid, user.getIdToken, user.displayName, user.photoURL ))

                                    props.navigation.navigate('Jobs')

                              }else{
                                     
                                      props.navigation.navigate('Auth')
                              }

                            })
                          }catch{
                            console.log('errrors')
                          }
      }


      useEffect(() => {
           tryLogin()
      },[])

  return (
    <View style={{alignItems:'center', justifyContent:'center', flex:1}} >
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};



//make this component available to the app
export default StarupScreen;
