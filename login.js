import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Image from "react-native-scalable-image";

//Built a login that includes inputs of each placeholder needed to be filled out
class loginScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styleLogin.container}>
        <View style={styleLogin.container}>
          <StatusBar barStyle="light-content" />
          <Text>Welcome To</Text>

          <Image
            width={Dimensions.get("window").width}
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
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              secureTextEntry
              style={styleLogin.textInput}
              ref={input => (this.passwordInput = input)} //refer to onsubmitediting, this helps move onto the next input
            />
          </View>
          <AwesomeButton
            textColor="#000000"
            backgroundColor="#5ce1e6"
            onPress={() => this.props.navigation.navigate("DisplayProfile")}
          >
            Login
          </AwesomeButton>
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
  }
});
