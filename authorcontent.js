import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Image from "react-native-scalable-image";

export default class authorContentScreen extends React.Component {
  render() {
    return (
      <View style={styleAuthor.container}>
        <ScrollView contentContainerStyle={styleAuthor.container}>
          <Image
            width={Dimensions.get("window").width}
            source={require("./assets/xpress.png")}
          />

          <View style={styleAuthor.storyContentPosition}>
            <Image
              width={200}
              height={200}
              source={require("./assets/placeholder-book.png")}
            />

            <Image
              width={200}
              height={200}
              source={require("./assets/placeholder-book.png")}
            />

            <Image
              width={200}
              height={200}
              source={require("./assets/placeholder-book.png")}
            />
          </View>
          <TouchableOpacity>
            <AwesomeButton
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              Add New
            </AwesomeButton>
          </TouchableOpacity>
        </ScrollView>
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
    justifyContent: "space-around"
  }
});
