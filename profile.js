import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Image from "react-native-scalable-image";

export default class createProfileScreen extends React.Component {
  render() {
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

          <Image
            width={200}
            source={require("./assets/faceicon.png")}
            Text="Upload Your First Image"
          />

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
            <View style={styleCreateProfile.editProfileButton}>
              <AwesomeButton
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
    paddingHorizontal: 70
  },

  editProfileButton: {
    alignItems: "center",
    textAlign: "right"
  },

  textContainer: {
    padding: 20
  }
});
