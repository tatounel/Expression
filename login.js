import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, StatusBar } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

class loginScreen extends React.Component {
    render(){
        return(
            <KeyboardAvoidingView behavior = "padding" style = {styleLogin.container}>
                <View style = {styleLogin.container}>
                <StatusBar 
                 barStyle = "light-content"
                />
                <Text>Welcome To</Text>
                <Image style = {{width: 300, height: 200}}
                source = {require("./assets/xpression.png")}/>
                <Text>Where Artists and Authors Unite</Text>
                
                <View style = {styleLogin.loginContainer}>
                    <TextInput
                    placeholder ="E-mail or username"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType = "email-address"
                    autoCapitalize ="none"
                    autoCorrect={false}
                    style ={styleLogin.textInput}
                    />

                    <TextInput 
                    placeholder = "Password"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "go"
                    secureTextEntry
                    style = {styleLogin.textInput}
                    ref ={(input) => this.passwordInput = input}
                    />
                </View>

                <AwesomeButton
                    textColor= "#000000"
                    backgroundColor= "#5ce1e6"
                    >Login
                </AwesomeButton>
            </View>
            </KeyboardAvoidingView>

        );
    }
}

export default loginScreen;

const styleLogin = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ff0080",
        alignItems: "center",
        justifyContent: "center",
    },

    loginContainer:{
        padding: 20
    },

    textInput: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    }
        
});