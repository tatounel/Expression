import React from 'react';
import { StyleSheet, Text, View, Image, 
        TextInput, KeyboardAvoidingView, 
        StatusBar, TouchableOpacity } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

//import firebase from "firebase";
import User from "./chatScreens/User";


import * as firebase from "firebase";

//Building a login that includes inputs of each placeholder needed to be filled out
class loginScreen extends React.Component {
    //For Top Page Details
    static navigationOptions = ({ navigation }) => {
        return{ 
          title: 'Log In',
        }
      }
  
    state = {
      email: "",
      password: "",
      errormsg: null
    }
  
    handleChange = key => val => {
      this.setState({ [key] : val})
    }
  
    // componentWillMount(){
    //   AsyncStorage.getItem('userEmail').then(val => {
    //     if(val){
    //       this.setState({ email : val })
    //     }
    //   })
    // }
  
    submitForm = async() => {
      if(this.state.email.length < 3){
        Alert.alert('Error', 'Wrong Email Address')
      }else if(this.state.name.length < 2){
        Alert.alert('Error', 'Wrong name!')
      }else{
        await AsyncStorage.setItem('userEmail', this.state.email);
        User.email = this.state.email;
        firebase.database().ref('users/' + User.email).set({ name: this.state.name });
        this.props.nagivation.navigate('App');
      }
    }  

  //authentication tutorial from web
  // Login = (email, password) => {
  //   try {
  //     firebase
  //        .auth()
  //        .signInWithEmailAndPassword(email, password)
  //        .then(res => {
  //            console.log(res.user.email);
  //     });
  //   } catch (error) {
  //     console.log(error.toString(error));
  //   }
  // };

  /* from yt tutorial https://www.youtube.com/watch?v=TkuQAjnaSbM&t=128s */
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({errormsg: error.message}))
  }

    render(){
        return(
            <KeyboardAvoidingView behavior = "padding" style = {styleLogin.container}>
                <View style = {styleLogin.container}>
                <StatusBar barStyle = "light-content" />
                <Text>Welcome To</Text>
                <Image style = {{width: 300, height: 200}}
                    source = {require("./assets/xpression.png")}/>
                <Text>Where Artists and Authors Unite</Text>
                
                <View style = {styleLogin.loginContainer}>
                    <TextInput
                        placeholder ="E-mail or Username"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        returnKeyType = "next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize ="none"
                        autoCorrect={false}
                        style ={styleLogin.textInput}

                        //for chatScreen
                        value={this.state.email}
                        onChangeText={this.handleChange('email')}
                    />

                    <TextInput 
                        placeholder = "Password"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        returnKeyType = "go"
                        secureTextEntry
                        style = {styleLogin.textInput}
                        //refer to onsubmitediting, this helps move onto the next input
                        ref ={(input) => this.passwordInput = input}

                        //for chatScreen
                        value={this.state.password}
                        onChangeText={this.handleChange('password')}
                    />
                </View>

                <AwesomeButton
                    textColor= "#000000"
                    backgroundColor= "#5ce1e6"
                    onPress = {this.handleLogin, () => 
                      this.props.navigation.navigate("DisplayProfile")}
                      onPress = {this.handleLogin}
                    >Login
                </AwesomeButton>

                <View style={styleLogin.errorMessage}>
                    {this.state.errorMessage && <Text style={styleLogin.error}>{this.state.errorMessage}</Text>}
                </View>

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
    },
    errorMessage: {
      //height: 72,
      alignItems: "center",
      justifyContent: "center",
      //marginHorizontal: 30
  },
  error: {
      color: "#E9446A",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center"
  },
        
});
