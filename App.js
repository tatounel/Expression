import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

function Button(text) {
  return (
    <AwesomeButton
      backgroundColor="#5ce1e6"
      textColor="#000000"
      style={(width = 700)}
    >
      {text}
    </AwesomeButton>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to</Text>
      <Image
        style={{ width: 300, height: 200 }}
        source={require("./assets/xpression.png")}
      />
      <Text>where artists and authors unite</Text>
      {Button("Log In")}
      {Button("Sign up")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  }
});
