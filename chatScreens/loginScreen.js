import React from 'react';
import { StyleSheet, Text, 
        TextInput, View, Image, 
        KeyboardAvoidingView, 
        StatusBar, TouchableOpacity } from "react-native";

export default class LoginScreen extends React.Component{

    state = {
        name: ""
    }

    contine = () => {
        this.props.navigation.navigate("Chat", {name: this.state.name})
    }

    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.circle} /> 

                <View style={{ marginHorizontal: 32}}>
                    <Text style={styles.header}>Username</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F7"
    },
    circle:{
        width: 500,
        hieght: 500,
        borderRadius: 500/2,
        backgroundColor: "FFF",
        position: "absoulute",
        left: -120,
        top: -20
    }
})