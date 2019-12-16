//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Communications from 'react-native-communications'

// create a component
const JobItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={{...styles.card,backgroundColor:props.bgColor}}>
                 <Text style={{fontSize:20,lineHeight:22}}>{props.description}</Text>
                 <TouchableNativeFeedback onPress={() =>  Communications.phonecall(props.phone, true) } >
                   <View style={{alignSelf:'center', width:'60%', backgroundColor:'#d63031', padding:10, borderRadius:4, marginTop:5}} >
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <FontAwesome name="phone" size={23} style={{paddingRight:8}} />
                            <Text style={{fontSize:20,textAlign:'center',color:'white'}} >call</Text>
                        </View>
                   </View>

                 </TouchableNativeFeedback>
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
        padding:8
    },
    card:{
        elevation:5,
        borderRadius:10,
        padding:8
    }
});

//make this component available to the app
export default JobItem;
