import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Image from "react-native-scalable-image";

export default class artistContentScreen extends React.Component {
  render() {
    return (
      <View style={styleArtist.container}>
        <ScrollView contentContainerStyle={styleArtist.container}>
          <Image
            width={Dimensions.get("window").width}
            source={require("./assets/xpress.png")}
          />
          <View style={styleArtist.imgContentPosition}>
            <View style={styleArtist.imgContentPositionColumn}>
              <Image
                width={100}
                height={100}
                source={require("./assets/placeholder-image.png")}
              />
              <Image
                width={100}
                height={100}
                source={require("./assets/placeholder-image.png")}
              />
              <Image
                width={100}
                height={100}
                source={require("./assets/placeholder-image.png")}
              />
            </View>
            <View style={styleArtist.imgContentPositionColumn}>
              <Image
                width={100}
                height={100}
                source={require("./assets/placeholder-image.png")}
              />
              <Image
                width={100}
                height={100}
                source={require("./assets/placeholder-image.png")}
              />
              <Image
                width={100}
                height={100}
                source={require("./assets/placeholder-image.png")}
              />
            </View>
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

const styleArtist = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },

  imgContentPosition: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 75
  },
  imgContentPositionColumn: {
    flex: 1,
    flexDirection: "column",
    flexBasis: 100,
    justifyContent: "space-around"
  }
});
