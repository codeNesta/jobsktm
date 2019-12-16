//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen authorized users</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
     
    },
});

//make this component available to the app
export default WelcomeScreen;
