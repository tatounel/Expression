import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Image from "react-native-scalable-image";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default class createProfileScreen extends React.Component {
  state = {
    photo: null
  };
  render() {
    let { photo } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styleCreateProfile.container}
      >
        <View style={styleCreateProfile.container}>
          <Image
            width={Dimensions.get("window").width}
            source={require("./assets/profile.png")}
          />
          <TouchableOpacity onPress={this._pickImage}>
            <View>
              {photo && (
                <Image
                  borderRadius={10}
                  width={150}
                  height={150}
                  source={{ uri: photo }}
                />
              )}
            </View>
            <View style={styleCreateProfile.photoTxt}>
              <Text>Upload photo</Text>
            </View>
          </TouchableOpacity>

          <View style={styleCreateProfile.textContainer}>
            <TextInput
              placeholder="Genre/Style"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.interestInput.focus()}
              style={styleCreateProfile.textProfileInputs}
            />

            <TextInput
              placeholder="Interest"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.bioInputs.focus()}
              keyboardType="email-address"
              style={styleCreateProfile.textProfileInputs}
              ref={interests => (this.interestInput = interests)}
            />

            <TextInput
              placeholder="Bio"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              style={styleCreateProfile.textProfileInputs}
              ref={bio => (this.bioInputs = bio)}
            />
          </View>

          <TouchableOpacity>
            <View>
              <AwesomeButton
                width={70}
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={() => this.props.navigation.navigate("DisplayProfile")}
              >
                Next
              </AwesomeButton>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };
}

const styleCreateProfile = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },

  textProfileInputs: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#FFF",
    paddingHorizontal: 70,
    borderWidth: 1
  },

  textContainer: {
    padding: 20
  },

  photoTxt: {
    color: "#FFF",
    alignItems: "center"
  }
});