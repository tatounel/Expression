import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker,
  SafeAreaView
} from "react-native";
import Image from "react-native-scalable-image";
import MultiSelect from "react-native-multiple-select";

this.items = [];

export default class createProfileScreen extends React.Component {
  state = {
    //We will store selected item in this
    selectedItems: [],
    items: [],
    success: true,
    error: false
  };
  componentDidMount() {
    this.getGenres();
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    //Set Selected Items
  };

  getGenres = () => {
    fetch(`http://localhost:8000/api/genres/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        //console.log(`Got genres: ${res}`);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Content validation");
      })
      .then(genres => {
        this.setState({
          success: true
        });
        console.log(genres);
        let items = [];
        genreNames = genres.filter(genre => {
          let obj = genre;
          let itemElement = { id: `${obj.id}`, name: `${obj.name}` };
          console.log(obj.name);
          items.push(itemElement);
        });
        this.setState({
          items: items
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };
  render() {
    const { selectedItems } = this.state;
    console.log(this.items);
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

            {/* <TextInput
              placeholder="Interest"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.bioInputs.focus()}
              keyboardType="email-address"
              style={styleCreateProfile.textProfileInputs}
              ref={interests => (this.interestInput = interests)}
            /> */}
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <MultiSelect
                  // hideTags
                  items={this.state.items}
                  uniqueKey="id"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Pick Interests"
                  searchInputPlaceholderText="Search Items..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: "#CCC" }}
                  submitButtonColor="#48d22b"
                  submitButtonText="Submit"
                />
              </View>
            </SafeAreaView>

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
