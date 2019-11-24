import React from "react";
import { Text, View, StyleSheet, BackHandler, Image } from "react-native";
export default class profileDisplayScreen extends React.Component {
  //this is so You can't press back on the hardware for any device once you Login
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", function() {
      return true;
    });
  }

  render() {
    return (
      <View style={styleDisplayProfile.container}>
        <Text>Welcome back!</Text>
        <Image
          width="50"
          height="50"
          source={require("./assets/faceicon.png")}
        />
      </View>
    );
  }
}

const styleDisplayProfile = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  }
});
