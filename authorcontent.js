import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Image from "react-native-scalable-image";
import RichTextEditor from "react-native-zss-rich-text-editor";

export default class authorContentScreen extends React.Component {
  render() {
    return (
      <View style={styleAuthor.container}>
        <Image
          width={Dimensions.get("window").width}
          source={require("./assets/xpress.png")}
        />
        <ScrollView contentContainerStyle={styleAuthor.container}>
          <View style={styleAuthor.storyContentPosition}></View>

          <View style={styleAuthor.storyContentPosition}></View>
        </ScrollView>
        <TouchableOpacity>
          <AwesomeButton
            textColor="#000000"
            backgroundColor="#5ce1e6"
            onPress={() => this.props.navigation.navigate("WritingContent")}
          >
            Add New
          </AwesomeButton>
        </TouchableOpacity>
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
