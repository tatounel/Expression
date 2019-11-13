import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
//import RNPickerSelect from "react-native-picker-select";
import TypeOfHobby from './selectionView';

//Built a signup screen that includes text inputs of each placeholder. with no auto Cap and no auto correcting.
class signUpScreen extends React.Component {
    render(){
        return(
            <KeyboardAvoidingView behavior = "padding" style = {styleSignUp.container}>
                <View style = {styleSignUp.container}>
                <StatusBar 
                 barStyle = "light-content"
                />
                <Text>Welcome To</Text>
                <Image style = {{width: 300, height: 200}}
                source = {require("./assets/xpression.png")}/>
                <Text>Where Artists and Authors Unite</Text>

                <View style = {styleSignUp.rowContainer}>
                    <TextInput
                    placeholder ="First Name"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.lastName.focus()}
                    autoCapitalize ="none"
                    autoCorrect={false}
                    style ={styleSignUp.textInputs2}
                    />

                    <TextInput 
                    placeholder = "Last Name"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.eMail.focus()}
                    style = {styleSignUp.textInputs2}
                    ref ={(input) => this.lastName = input}
                    />

                </View>
    
                <View style = {styleSignUp.signUpContainer}>

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
                    onSubmitEditing = {() => this.artistInput.focus()}
                    secureTextEntry
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.passwordInput = input}
                    />

                    <TextInput 
                    placeholder = "Type: Artist or Author"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.artistInput = input}
                    />

                </View>
            </View>

            <TouchableOpacity >
            <View style = {styleSignUp.onebutton}>
            <AwesomeButton
                    textColor= "#000000"
                    backgroundColor= "#5ce1e6"
                    alignItems = "center"
                    onPress = {() => this.props.navigation.navigate('Profile')}
                    >Register
            </AwesomeButton>
            </View>

            </TouchableOpacity>
            </KeyboardAvoidingView>

        );
    }
}

export default signUpScreen;

const styleSignUp = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ff0080",
        alignItems: "center",
        justifyContent: "center",
    },

    SignUpContainer:{
        padding: 10
    },

    textInputs: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 70,
    },

    onebutton:{
        alignItems: "center",
        textAlign: "right"
    },

    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        
    },

    textInputs2:{
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 33.5,
        marginRight: 1
    }
     
});