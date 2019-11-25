import React from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  Image,
  TouchableOpacity
} from "react-native";
export default class profileDisplayScreen extends React.Component {
  //this is so You can't press back on the hardware for any device once you Login
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", function() {
      return true;
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styleDisplayProfile.container}
      >
        <View style={styleDisplayProfile.container}>
          <Text>Welcome back!</Text>
          <Image
            width="200"
            source={require("./assets/faceicon.png")}
            Text="Upload Your First Image"
          />

          <TouchableOpacity>
            <View style={styleCreateProfile.editProfileButton}>
              <AwesomeButton
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={() => this.props.navigation.navigate("DisplayProfile")}
              >
                See XPression
              </AwesomeButton>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styleDisplayProfile = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  }
});
