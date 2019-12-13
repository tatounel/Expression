import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

//built a class that includes the touchability to move forward to the next page for each button

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styleWelcome.container}>
        <Text>Welcome To</Text>
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={require("./assets/xpression.png")}
        />
        <Text>Where Artists and Authors Unite</Text>

        <View style={styleWelcome.buttoncontainer}>
          <View style={styleWelcome.button1}>
            <AwesomeButton
              width={80}
              raiseLevel={10}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("Login")}
            >
              Log In
            </AwesomeButton>
          </View>

          <View>
            <AwesomeButton
              width={80}
              raiseLevel={10}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              Sign Up
            </AwesomeButton>
          </View>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;

const styleWelcome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },
  buttoncontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button1: {
    marginRight: 20
  }
});
