import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Image from "react-native-scalable-image";
import ModalDropDown from "react-native-modal-dropdown";

//Built a signup screen that includes text inputs of each placeholder. with no auto Cap and no auto correcting. Making sure everytime
//you finish one part, it move onto the next one with the "next() or arrow" button depending on which device you have

export default class signUpScreen extends React.Component {
  state = {
    error: false,
    successs: false,
    firstName: "",
    lastName: "",
    email: "",
    type: "",
    options: ["Artist", "Author"]
  };

  saveNewUser = event => {
    console.log(`Creating new ${this.state.type}`);
    fetch(`http://localhost:8000/api/${this.state.type}s/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${this.state.firstName}` + " " + `${this.state.lastName}`,
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
          <Text>Welcome To</Text>
          <Image
            width={Dimensions.get("window").width}
            source={require("./assets/xpression.png")}
          />
          <Text>Where Artists and Authors Unite</Text>

          <View style={styleSignUp.rowContainer}>
            <TextInput
              id="fName"
              placeholder="First Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.lastName.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              style={styleSignUp.textInputs2}
              onChangeText={firstName =>
                this.setState({ firstName: firstName })
              }
              value={this.state.firstName}
            />

            <TextInput
              id="LName"
              placeholder="Last Name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.eMail.focus()}
              style={styleSignUp.textInputs2}
              ref={input => (this.lastName = input)}
              onChangeText={lastName => this.setState({ lastName: lastName })}
              value={this.state.lastName}
            />
          </View>

          <View style={styleSignUp.signUpContainer}>
            <TextInput
              id="emailing"
              placeholder="E-Mail"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              style={styleSignUp.textInputs}
              ref={input => (this.eMail = input)}
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              secureTextEntry
              style={styleSignUp.textInputs}
              ref={input => (this.passwordInput = input)}
            />
          </View>

          <ModalDropDown
            style={styleSignUp.selectionType}
            Text="Select Type"
            options={this.state.options}
            dropdownStyle={{
              height: 90,
              width: "30%"
            }}
            onSelect={type =>
              this.setState({ type: `${this.state.options[type]}` })
            }
            value={this.state.type}
          />
        </View>

        <TouchableOpacity>
          <View style={styleSignUp.onebutton}>
            <AwesomeButton
              textColor="#000000"
              backgroundColor="#5ce1e6"
              alignItems="center"
              onPress={() => {
                this.saveNewUser();
                this.props.navigation.navigate("EditProfile");
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
    paddingHorizontal: 103
  },

  textInputs2: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 33.5,
    marginRight: 1
  },

  onebutton: {
    alignItems: "center",
    textAlign: "right"
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  selectionType: {
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    paddingHorizontal: 95,
    paddingVertical: 10
  }
});
