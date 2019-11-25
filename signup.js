import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
//import RNPickerSelect from "react-native-picker-select";

//Built a signup screen that includes text inputs of each placeholder. with no auto Cap and no auto correcting.
class signUpScreen extends React.Component {
  state = {
    error: false,
    successs: false,
    firstName: "",
    lastName: "",
    email: "",
    type: ""
  };

  saveNewUser = event => {
    console.log(`Creating new ${this.state.type}`);
    fetch(`/api/${this.state.type}s/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${this.state.firstName} + " " + ${this.state.lastName}`,
        email: `${this.state.email}`
      })
    })
      .then(res => {
        console.log(`Created new ${this.state.type}`);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Content validation");
      })
      .then(artist => {
        this.setState({
          success: true
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styleSignUp.container}>
        <View style={styleSignUp.container}>
          <StatusBar barStyle="light-content" />
          <Image
            style={{ width: 300, height: 200 }}
            source={require("./assets/xpression.png")}
          />

          <View style={styleSignUp.rowContainer}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.lastName.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              style={styleSignUp.textInputs2}
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            />

            <TextInput
              placeholder="Last Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.eMail.focus()}
              style={styleSignUp.textInputs2}
              ref={input => (this.lastName = input)}
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            />
          </View>

          <View style={styleSignUp.signUpContainer}>
            <TextInput
              placeholder="E-Mail"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.userName.focus()}
              keyboardType="email-address"
              style={styleSignUp.textInputs}
              ref={input => (this.eMail = input)}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              style={styleSignUp.textInputs}
              ref={input => (this.userName = input)}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.artistInput.focus()}
              secureTextEntry
              style={styleSignUp.textInputs}
              ref={input => (this.passwordInput = input)}
            />

            <TextInput
              placeholder="Type: Artist or Author"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              style={styleSignUp.textInputs}
              ref={input => (this.artistInput = input)}
              onChangeText={type => this.setState({ type })}
              value={this.state.type}
            />
          </View>
        </View>

        <TouchableOpacity>
          <View style={styleSignUp.onebutton}>
            <AwesomeButton
              progress
              textColor="#000000"
              backgroundColor="#5ce1e6"
              alignItems="center"
              onPress={next => {
                next();
                this.saveNewUser();
                this.props.navigation.navigate("Profile");
              }}
            >
              Register
            </AwesomeButton>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default signUpScreen;

const styleSignUp = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },

  SignUpContainer: {
    padding: 10
  },

  textInputs: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 70
  },

  onebutton: {
    alignItems: "center",
    textAlign: "right"
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  textInputs2: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 33.5,
    marginRight: 1
  }
});
