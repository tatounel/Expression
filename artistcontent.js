import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
<<<<<<< HEAD
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
=======
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
>>>>>>> 8032acc79003dc7a051545685986f495c9687ee0
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Image from "react-native-scalable-image";

export default class artistContentScreen extends React.Component {
  state = {
    photo: []
  };

  render() {
    return (
      <View style={styleArtist.Container}>
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={require("./assets/xpress.png")}
        />
        <ScrollView>
          <View style={styleArtist.imgContentPositionColumn}>
            <View style={styleArtist.imgContentPosition}>
              {this._renderImages()}
            </View>
          </View>
        </ScrollView>

<<<<<<< HEAD
        <AwesomeButton
          width={70}
          textColor="#000000"
          backgroundColor="#5ce1e6"
          onPress={this._pickImage}
        >
          <Text>Add New</Text>
        </AwesomeButton>
=======
        <TouchableOpacity>
          <AwesomeButton
            textColor="#000000"
            backgroundColor="#5ce1e6"
            onPress={this._pickImage}
          >
            <Text>Add New</Text>
          </AwesomeButton>
        </TouchableOpacity>
>>>>>>> 8032acc79003dc7a051545685986f495c9687ee0
      </View>
    );
  }
  //asking for permissions
  componentDidMount() {
    this.getPermissionAsync();
    console.log("Hi!");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  //rendering images
  _renderImages() {
    let photos = [];
    this.state.photo.map((item, index) => {
      photos.push(
        <Image
          borderRadius={10}
          width={150}
          height={150}
          key={index}
          source={{ uri: item }}
        />
      );
    });
    return photos;
  }

  //getting images from local directory
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: this.state.photo.concat([result.uri]) });
    }
  };
}

const styleArtist = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },
  imgContentPosition: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  imgContentPositionColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  }
});
