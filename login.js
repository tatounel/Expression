import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Image
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
//Built a login that includes inputs of each placeholder needed to be filled out
//import firebase from "firebase";
import User from "./chatScreens/User";

import * as firebase from "firebase";

class loginScreen extends React.Component {
  //For Top Page Details
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Log In"
    };
  };

  state = {
    email: "",
    password: "",
    errormsg: null
  };

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  // componentWillMount(){
  //   AsyncStorage.getItem('userEmail').then(val => {
  //     if(val){
  //       this.setState({ email : val })
  //     }
  //   })
  // }

  submitForm = async () => {
    if (this.state.email.length < 3) {
      Alert.alert("Error", "Wrong Email Address");
    } else if (this.state.name.length < 2) {
      Alert.alert("Error", "Wrong name!");
    } else {
      await AsyncStorage.setItem("userEmail", this.state.email);
      User.email = this.state.email;
      firebase
        .database()
        .ref("users/" + User.email)
        .set({ name: this.state.name });
    }
  };

  //authentication vr. 0
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
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ errormsg: error.message }));
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styleLogin.container}>
        <View style={styleLogin.container}>
          <StatusBar barStyle="light-content" />
          <Text>Welcome To</Text>

          <Image
            style={{ width: 300, height: 200, resizeMode: "contain" }}
            source={require("./assets/xpression.png")}
          />

          <Text>Where Artists and Authors Unite</Text>

          <View style={styleLogin.loginContainer}>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styleLogin.textInput}
              //for chatScreen
              value={this.state.email}
              onChangeText={this.handleChange("email")}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              secureTextEntry
              style={styleLogin.textInput}
              //refer to onsubmitediting, this helps move onto the next input
              ref={input => (this.passwordInput = input)}
              //for chatScreen
              value={this.state.password}
              onChangeText={this.handleChange("password")}
            />
          </View>
          <AwesomeButton
            progress={true}
            progressLoadingTime={10000}
            width={70}
            textColor="#000000"
            backgroundColor="#5ce1e6"
            onPress={() => this.props.navigation.navigate("DisplayProfile")}
          >
            <Text>Login</Text>
          </AwesomeButton>

          <View style={styleLogin.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styleLogin.error}>{this.state.errorMessage}</Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default loginScreen;

const styleLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },

  button1: {
    marginRight: 50,
    padding: 20
  },
  loginContainer: {
    padding: 20
  },

  textInput: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 50,
    borderWidth: 1
  },
  errorMessage: {
    //height: 72,
    alignItems: "center",
    justifyContent: "center"
    //marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  }
});
