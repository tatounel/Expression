import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
<<<<<<< HEAD
import { ScrollView, StyleSheet, View, Image } from "react-native";
=======
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Image from "react-native-scalable-image";
import RichTextEditor from "react-native-zss-rich-text-editor";
>>>>>>> 8032acc79003dc7a051545685986f495c9687ee0

export default class authorContentScreen extends React.Component {
  render() {
    return (
      <View style={styleAuthor.container}>
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={require("./assets/xpress.png")}
        />
        <ScrollView contentContainerStyle={styleAuthor.container}>
          <View style={styleAuthor.storyContentPosition}></View>
          <View style={styleAuthor.storyContentPosition}></View>
        </ScrollView>
        <AwesomeButton
          textColor="#000000"
          backgroundColor="#5ce1e6"
          onPress={() => this.props.navigation.navigate("WritingContent")}
        >
          Add New
        </AwesomeButton>
      </View>
    );
  }
}

const styleAuthor = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },
  storyContentPosition: {
    flex: 1,
    flexDirection: "column",
    flexBasis: 100,
    justifyContent: "space-around",
    padding: 100
  }
});
