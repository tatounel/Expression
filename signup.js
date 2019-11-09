import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, StatusBar } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

class signUpScreen extends React.Component {
    render(){
        return(
            <KeyboardAvoidingView behavior = "padding" style = {styleSignUp.container}>
                <View style = {styleSignUp.container}>
                <StatusBar 
                 barStyle = "light-content"
                />
    
                <View style = {styleSignUp.signUpContainer}>
                    <TextInput
                    placeholder ="First Name"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.lastName.focus()}
                    autoCapitalize ="none"
                    autoCorrect={false}
                    style ={styleSignUp.textInputs}
                    />

                    <TextInput 
                    placeholder = "Last Name"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.eMail.focus()}
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.lastName = input}
                    />

                    <TextInput 
                    placeholder = "E-Mail"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.userName.focus()}
                    keyboardType = "email-address"
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.eMail= input}
                    />

                    <TextInput 
                    placeholder = "Username"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.userName = input}
                    />

                    <TextInput 
                    placeholder = "Password"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    secureTextEntry
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.passwordInput = input}
                    />

                </View>
            </View>

            <View style = {styleSignUp.onebutton}>
            <AwesomeButton
                    textColor= "#000000"
                    backgroundColor= "#5ce1e6"
                    alignItems = "center"
                    >Register
            </AwesomeButton>
            </View>

            </KeyboardAvoidingView>

        );
    }
}

export default signUpScreen;

const styleSignUp = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ff0080",
    },

    SignUpContainer:{
        padding: 20
    },

    textInputs: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },

    onebutton:{
        alignItems: "center",
    }
        
});