import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Image from "react-native-scalable-image";

//built a class that includes the touchability to move forward to the next page for each button

class WelcomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Welcome"
    };
  };

  render() {
    return (
      <View style={styleWelcome.container}>
        <Text>Welcome To</Text>
        <Image
          width={Dimensions.get("window").width}
          source={require("./assets/xpression.png")}
        />
        <Text>Where Artists and Authors Unite</Text>

        <TouchableOpacity style={styleWelcome.buttoncontainer}>
          <View style={styleWelcome.button1}>
            <AwesomeButton
              width={80}
              raiseLevel={10}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Log In</Text>
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
              <Text>Sign Up</Text>
            </AwesomeButton>
          </View>
        </TouchableOpacity>
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
