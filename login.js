import React from 'react';
import { StyleSheet, Text, View, Image, 
        TextInput, KeyboardAvoidingView, 
        StatusBar, AsyncStorage, Alert,
        TouchableOpacity } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

//import firebase from "firebase";
import User from './User';
import firebase from "firebase";

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
      username: "",
      password: "",
      name: "",
      errormsg: null
    }
   

  
    //FOR CHAT APP
    handleChange = key => val => {
      this.setState({ [key] : val})
    }
    componentWillMount(){
      AsyncStorage.getItem('email').then(val => {
        if(val){
          this.setState({ email : val })
        }
      })
    }
    componentWillUnmount(){
    }

    submitForm = async() => {
      const{email, username, password, name} = this.state;
      if(this.state.email.length < 3){
        Alert.alert('Error', 'Wrong Email Address')
      }else if(this.state.username.length < 2){
        Alert.alert('Error', 'Wrong name!')
      }else{             
        //this is for User.js?
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('name', name);
        User.name = this.state.name;
        User.email = this.state.email;
        User.password = this.state.password;
        User.username = this.state.username;
        //console.log(User.username+ " TESTING")
        firebase
          .auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(()=>{
            //this.readUserData();
            //WORKS FOR A SIGNED'UP ACC
            this.props.nagivation.navigate('App');
            this.setState({error: "", loading: false});
          })
          .catch(()=>{
            this.setState({error: "Login Authentication failed.", loading: false})
        });
      }//end of else
    }
  readUserData() {
      firebase.database().ref('Users/').once('value', function (snapshot) {
          console.log(snapshot.val())
      });
  }//reads signed up user account details

  handleLogin = () => {
    const { email, password, name} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({errormsg: error.message}))
  }//NEED TO PASS IN NAME FOR CHAT APP

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
                        placeholder ="E-mail"
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
                        // value={this.state.username}
                        // onChangeText={this.handleChange('username')}
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

                    {/* TEST FOR FIREBASE CHAT APP */}
                    <TextInput
                        placeholder = "Name"
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        returnKeyType = "next"
                        keyboardType = "email-address"
                        autoCapitalize ="none"
                        autoCorrect={false}
                        style ={styleLogin.textInput}

                        //for chatScreen
                        value={this.state.username}
                        onChangeText={this.handleChange('username')}
                    />

                </View>

                <AwesomeButton
                    textColor= "#000000"
                    backgroundColor= "#5ce1e6"
                    // onPress = {this.handleLogin, () => 
                    //   this.props.navigation.navigate("DisplayProfile")}
                    //   onPress = {this.handleLogin, this.submitForm}
                      onPress = {this.submitForm}
                    // onPress={this.onLoginPress.bind(this)}
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
