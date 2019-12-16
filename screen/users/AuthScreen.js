//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Facebook from 'expo-facebook'
import * as firebase from 'firebase'

// create a component
const AuthScreen = (props) => {

       facebook = async () => {
    const {type, token}  =   await Facebook.logInWithReadPermissionsAsync("429919701266210", {
                                                            permission:"public_profile"
                                                        })

       if(type == "success"){
           const credential =  firebase.auth.FacebookAuthProvider.credential(token)

           firebase.auth().signInWithCredential(credential)
           .catch(error => {
               console.log(error)
           })
       }

       props.navigation.navigate('Jobs')

       }

    return (
        <View style={styles.container}>
         <Text  style={{fontSize: 35, textAlign:'center', paddingBottom:8}}>{`Find Jobs or \nSubmit Jobs`}</Text>
         <View style={{paddingHorizontal:30, marginTop:10}} >
             <Button title="Login with Facebook" onPress={facebook} />
         </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default AuthScreen;
