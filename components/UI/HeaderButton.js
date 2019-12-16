//import liraries
import React, { Component } from 'react';
import { View} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons';


// create a component
const CustomHeaderButton = (props) => {
    return (

         <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="white"  />
          
         );
};



//make this component available to the app
export default CustomHeaderButton;
