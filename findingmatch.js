import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import Image from "react-native-scalable-image";

class matchScreen extends React.Component {
  render() {
    return (
      <View style={matchStyleSheet.container}>
        <Image
          width={Dimensions.get("window").width}
          source={require("./assets/findmatch.png")}
        />

        <TouchableOpacity style={matchStyleSheet.buttonContainer}>
          <View style={matchStyleSheet.shiftButton}>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              XPression
            </AwesomeButton>
          </View>

          <View>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              Message
            </AwesomeButton>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={matchStyleSheet.buttonContainer}>
          <View style={matchStyleSheet.shiftButton}>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              Accept
            </AwesomeButton>
          </View>

          <View>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              Deny
            </AwesomeButton>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default matchScreen;

const matchStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  shiftButton: {
    marginRight: 20
  }
});
