import React from 'react';
import { StyleSheet, Text,  View, Image, StatusBar, 
        TextInput, KeyboardAvoidingView, TouchableOpacity, 
        TouchableWithoutFeedback } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

//import Image from "react-native-scalable-image";
import ModalDropDown from "react-native-modal-dropdown";

//import RNPickerSelect from "react-native-picker-select";
//import TypeOfHobby from './selectionView';


import * as firebase from "firebase";
//------------------------------------------------------------------------------------

/* Built a signup screen that includes text inputs of each placeholder. 
    with no auto Cap and no auto correcting. */
export default class signUpScreen extends React.Component {
    //For Top Page Details
    static navigationOptions = ({ navigation }) => {
        return{ 
          title: 'Sign Up',
        }
      }
  
  state = {
    error: false,
    successs: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
    errorMessage: null,
    options: ["Artist", "Author"]
  };

  // saveNewUser = event => {
  //   console.log(`Creating new ${this.state.type}`);
  //   fetch(`http://localhost:8000/api/${this.state.type}s/`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       name: `${this.state.firstName}` + " " + `${this.state.lastName}`,
  //       email: `${this.state.email}`
  //     })
  //   })
  //     .then(res => {
  //       console.log(`Created new ${this.state.type}`);
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw new Error("Content validation");
  //     })
  //     .then(artist => {
  //       this.setState({
  //         success: true
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: true
  //       });
  //     });
  // };

  //authentication vr 0
  // SignUp = (email, password) => {
  //   try {
  //     firebase
  //         .auth()
  //         .createUserWithEmailAndPassword(email, password)
  //         .then(user => { 
  //                console.log(user);
  //          });
  //   } catch (error) {
  //     console.log(error.toString(error));
  //   }
  // };
  handleSignUp = () => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.firstName + ' ' + this.state.lastName
            });
        })
        .catch(error => this.setState({ errorMessage: error.message }));
};

  render(){
        return(
            <KeyboardAvoidingView behavior = "padding" style = {styleSignUp.container}>
                <View style = {styleSignUp.container}>
                <StatusBar barStyle = "light-content" />
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
                    autoCorrect={false}
                    style ={styleSignUp.textInputs2} 
                    onChangeText={firstName => this.setState({ firstName })}
                    value={this.state.firstName} />

                    <TextInput 
                    placeholder = "Last Name"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing={() => this.eMail.focus()}
                    style = {styleSignUp.textInputs2}
                    ref ={(input) => this.lastName = input} 
                    onChangeText={lastName => this.setState({ lastName })}
                    value={this.state.lastName} />

                </View>
    
                <View style = {styleSignUp.signUpContainer}>

                    <TextInput 
                    placeholder = "E-Mail"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing = {() => this.userName.focus()}
                    keyboardType = "email-address"
                    style = {styleSignUp.textInputs}
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref ={(input) => this.eMail= input}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}  />

                    <TextInput 
                    placeholder = "Username"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    autoCapitalize="none"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style = {styleSignUp.textInputs}
                    ref ={(input) => this.userName = input}
                    onChangeText={userName => this.setState({ userName })}
                    value={this.state.userName} />

                    <TextInput 
                    placeholder = "Password"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    returnKeyType = "next"
                    onSubmitEditing = {() => this.artistInput.focus()}
                    secureTextEntry = {true}
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    style = {styleSignUp.textInputs}
                    ref = {(input) => this.passwordInput = input}
                    onChangeText = { password => this.setState({ password })}
                    value={this.state.password} />
                </View>

                <ModalDropDown
                    style={styleSignUp.selectionType}
                    Text="Select Type"
                    options={this.state.options}
                    dropdownStyle={{ height: 90, width: "30%" }}
                    onSelect={type =>
                      this.setState({ type: `${this.state.options[type]}` })
                    }
                    value={this.state.type} />
            </View>

            <TouchableOpacity >
                <View style = {styleSignUp.onebutton}>
                    <AwesomeButton
                        textColor= "#000000"
                        backgroundColor= "#5ce1e6"
                        onPress={() => {
                          //this.saveNewUser();
                          //this.props.navigation.navigate("EditProfile");
                          this.handleSignUp();
                          // this.SignUp(this.state.email, this.state.password);
                        }}
                    >Register
                    </AwesomeButton>
                </View>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }

}

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
    },
    selectionType: {
      backgroundColor: "rgba(255,255,255,0.2)",
      marginBottom: 10,
      paddingHorizontal: 95,
      paddingVertical: 10
    }
     
});
