import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Image from "react-native-scalable-image";

export default class artistContentScreen extends React.Component {
  state = {
    photo: null
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

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
              {photo && (
                <Image
                  width={100}
                  height={100}
                  source={require("./assets/placeholder-image.png")}
                />
              )}
              {photo && (
                <Image
                  width={100}
                  height={100}
                  source={require("./assets/placeholder-image.png")}
                />
              )}
              {photo && (
                <Image
                  width={100}
                  height={100}
                  source={require("./assets/placeholder-image.png")}
                />
              )}
            </View>
            <View style={styleArtist.imgContentPositionColumn}>
              {photo && (
                <Image
                  width={100}
                  height={100}
                  source={require("./assets/placeholder-image.png")}
                />
              )}
              {photo && (
                <Image
                  width={100}
                  height={100}
                  source={require("./assets/placeholder-image.png")}
                />
              )}
              {photo && (
                <Image
                  width={100}
                  height={100}
                  source={require("./assets/placeholder-image.png")}
                />
              )}
            </View>
          </View>
          <TouchableOpacity onPress={this.handleChoosePhoto}>
            <AwesomeButton
              title="Add New"
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={this.handleChoosePhoto}
            />
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
