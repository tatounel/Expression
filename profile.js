import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker,
  SafeAreaView
} from "react-native";
import Image from "react-native-scalable-image";
import MultiSelect from "react-native-multiple-select";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

import Constants from "expo-constants";

export default class createProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.navigation.state.params.type;
    if (this.type == "Author") {
      this.genreOrStyle = "genres";
      this.interests = "styles";
    } else if (this.type == "Artist") {
      this.genreOrStyle = "styles";
      this.interests = "genres";
    }
  }

  //For Top Page Details
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Profile"
    };
  };

  state = {
    //We will store selected item in this
    selectedInterests: [],
    interests: [],
    selectedGenresOrStyles: [],
    genresOrStyles: [],
    success: true,
    error: false,
    photo: null,
    email: "",
    password: "",
    id: "",
    bio: "",
    usersInterests: "",
    usersGenresOrStyles: ""
  };
  componentDidMount() {
    const { email, password } = firebase.auth().currentUser;
    this.setState({ email, password });
    this.getUserByEmail();
    this.getInterests();
    this.getGenresOrStyles();

    // console.log(this.state.type);
    this.getPermissionAsync();
  }

  onSelectedInterestsChange = selectedInterests => {
    this.setState({ selectedInterests });
    //Set Selected Items
  };
  onSelectedGenresOrStylesChange = selectedGenresOrStyles => {
    this.setState({ selectedGenresOrStyles });
    //Set Selected Items
  };
  signOut = () => {
    firebase.auth().signOut();
  };
  //logout Button
  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  getUserByEmail = () => {
    // console.log(`${params}`);
    fetch(`http://localhost:8000/api/${this.type}s/`, {
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
      .then(authorsOrArtists => {
        this.setState({
          success: true
        });
        //console.log(authors);
        let currentUser = null;
        authorsOrArtists.filter(authorOrArtist => {
          let obj = authorOrArtist;
          console.log(obj.email);
          console.log(this.state.email);
          if (obj.email == this.state.email) {
            console.log("FOUND MATCH EMAIL");
            console.log(obj + " == " + this.state.email);
            currentUser = obj;
          }
        });
        this.setState({
          id: currentUser.id
        });
        console.log(currentUser.id);
        console.log(this.state.id);
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };
  getInterests = () => {
    fetch(`http://localhost:8000/api/${this.interests}/`, {
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
      .then(interests => {
        this.setState({
          success: true
        });
        let items = [];
        let interestsNames = interests.filter(interest => {
          let obj = interest;
          let itemElement = { id: `${obj.id}`, name: `${obj.name}` };
          items.push(itemElement);
        });
        this.setState({
          interests: items
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  getGenresOrStyles = () => {
    fetch(`http://localhost:8000/api/${this.genreOrStyle}/`, {
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
      .then(info => {
        this.setState({
          success: true
        });
        let items = [];
        let genresOrStylesNames = info.filter(data => {
          let obj = data;
          let itemElement = { id: `${obj.id}`, name: `${obj.name}` };
          items.push(itemElement);
        });
        this.setState({
          genresOrStyles: items
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  updateUser = event => {
    console.log(this.state.interests[1].name);
    let temp = [];
    let interestsNum = this.state.selectedInterests;
    for (i = 0; i < this.state.selectedInterests.length; i++) {
      temp.push(
        this.state.interests[parseInt(this.state.selectedInterests[i])].name
      );
    }
    this.setState({
      usersInterests: temp.toString()
    });
    temp = [];
    let genresOrStylesNum = this.state.selectedGenresOrStyles;
    for (i = 0; i < this.state.selectedGenresOrStyles.length; i++) {
      temp.push(
        this.state.genresOrStyles[
          parseInt(this.state.selectedGenresOrStyles[i])
        ].name
      );
    }
    this.setState({
      usersGenresOrStyles: temp.toString()
    });
    console.log(`Updating user ${this.state.id}`);
    console.log(this.state.usersGenresOrStyles);
    console.log(this.state.usersInterests);
    console.log(this.state.bio);
    fetch(`http://localhost:8000/api/${this.type}s/${this.state.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        genre: `${this.state.usersGenresOrStyles}`,
        bio: `${this.state.bio}`,
        interests: `${this.state.usersInterests}`
      })
    })
      .then(res => {
        console.log(`Updated user ${this.state.id}`);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Content validation");
      })
      .then(artist => {
        this.setState({
          success: true
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  render() {
    let { photo } = this.state;
    const { selectedInterests, selectedGenresOrStyles } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
              {/* <TextInput
                placeholder="Genre/Style"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.interestInput.focus()}
                style={styleCreateProfile.textProfileInputs}
              /> */}
              <View>
                <MultiSelect
                  // hideTags
                  items={this.state.genresOrStyles}
                  uniqueKey="id"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={this.onSelectedGenresOrStylesChange}
                  selectedItems={selectedGenresOrStyles}
                  selectText="Pick Genres or Styles"
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
              {/* <TextInput
              placeholder="Interest"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.bioInputs.focus()}
              keyboardType="email-address"
              style={styleCreateProfile.textProfileInputs}
              ref={interests => (this.interestInput = interests)}
            /> */}
              <View>
                <MultiSelect
                  // hideTags
                  items={this.state.interests}
                  uniqueKey="id"
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={this.onSelectedInterestsChange}
                  selectedItems={selectedInterests}
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

              <TextInput
                placeholder="Bio"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                style={styleCreateProfile.textProfileInputs}
                ref={bio => (this.bioInputs = bio)}
                onChangeText={bio => this.setState({ bio })}
                value={this.state.bio}
              />
            </View>

            <TouchableOpacity>
              <View style={styleCreateProfile.editProfileButton}>
                <AwesomeButton
                  textColor="#000000"
                  backgroundColor="#5ce1e6"
                  onPress={() => {
                    this.updateUser();
                    this.props.navigation.navigate("DisplayProfile", {
                      id: this.state.id
                    });
                  }}
                >
                  <Text>Next</Text>
                </AwesomeButton>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <AwesomeButton
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={this.signOut}
              >
                <Text style={styleCreateProfile.editProfileButton}>Logout</Text>
              </AwesomeButton>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
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
    paddingHorizontal: 70
  },

  editProfileButton: {
    alignItems: "center",
    textAlign: "right"
  },

  textContainer: {
    padding: 20
  },

  photoTxt: {
    color: "#FFF",
    alignItems: "center"
  }
});
