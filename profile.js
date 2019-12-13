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
    console.log(this.type);
    if (this.type == "Author") {
      this.genreOrStyle = "genres";
      this.interests = "styles";
    } else if (this.type == "Artist") {
      this.genreOrStyle = "styles";
      this.interests = "genres";
    }

    this.state = {
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
  }

  //For Top Page Details
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Profile"
    };
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        const { email, password } = user;
        this.setState({ email, password });
        console.log(email + " got user on profile.js");
      } else {
        console.log("User not created");
      }
    });
    // const { email, password } = firebase.auth().currentUser;
    // this.setState({ email, password });
    this.getUserByEmail()
      .then(() => {
        return this.getInterests();
      })
      .then(() => {
        return this.getGenresOrStyles();
      })
      .then(() => {
        console.log("Finished all profile async functions");
      });

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
  signOut = async () => {
    firebase.auth().signOut();
    await AsyncStorage.clear();
    this.props.navigation.navigate("Welcome");
  };

  getUserByEmail = () => {
    // console.log(`${params}`);
    return fetch(`http://localhost:8000/api/${this.type}s/`, {
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
        console.log(authorsOrArtists);
        let currentUser = null;
        console.log(authorsOrArtists.length);
        authorsOrArtists.filter(authorOrArtist => {
          let obj = authorOrArtist;
          if (obj.email == this.state.email) {
            console.log("FOUND MATCH EMAIL");
            currentUser = obj;
          } else {
            console.log(obj.email + " NOT A MATCH FOR " + this.state.email);
          }
        });
        this.setState(
          {
            id: currentUser.id
          },
          () => {
            console.log(currentUser.id);
            console.log(this.state.id);
          }
        );
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };
  getInterests = () => {
    return fetch(`http://localhost:8000/api/${this.interests}/`, {
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
        // console.log(this.state.interests);
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  getGenresOrStyles = () => {
    return fetch(`http://localhost:8000/api/${this.genreOrStyle}/`, {
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
        // console.log(this.state.genresOrStyles);
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  updateUser = async event => {
    // console.log(this.state.interests[1].name);
    // console.log(this.state.genresOrStyles[1].name);

    let temp = [];
    let interestsNum = this.state.selectedInterests.length;
    let num = 0;
    console.log(interestsNum + "interest num value");
    for (i = 0; i < interestsNum; i++) {
      num = parseInt(this.state.selectedInterests[i]) - 1;
      console.log(num + " Num of interests" + this.state.selectedInterests[i]);
      temp.push(this.state.interests[num].name);
      console.log(this.state.interests[num].name);
    }
    console.log(temp + "temp before set state of users interests");
    await this.setState({
      usersInterests: temp.toString()
    });
    console.log(
      temp.toString() +
        " temp as string" +
        this.state.usersInterests +
        " just checking if set state works"
    );
    temp = [];
    let genresOrStylesNum = this.state.selectedGenresOrStyles.length;
    console.log(
      this.state.selectedGenresOrStyles +
        "value assigned to genreorstyles length"
    );
    num = 0;
    console.log(genresOrStylesNum + "length of genres or styles");
    for (i = 0; i < genresOrStylesNum; i++) {
      num = parseInt(this.state.selectedGenresOrStyles[i]) - 1;
      console.log(
        num + " Num of genres or styles" + this.state.genresOrStyles[num].name
      );
      temp.push(this.state.genresOrStyles[num].name);
    }
    console.log(temp + "temp before set state of users genres or styles");
    await this.setState({
      usersGenresOrStyles: temp.toString()
    });
    console.log(temp.toString() + " temp as string");

    console.log(`Updating user ${this.state.id}`);
    console.log(`${this.state.usersGenresOrStyles}`);
    console.log(`${this.state.bio}`);
    console.log(`${this.state.usersInterests}`);
    let temp2 = this.genreOrStyle.slice(0, -1);
    return fetch(`http://localhost:8000/api/${this.type}s/${this.state.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        [`${temp2}`]: `${this.state.usersGenresOrStyles}`,
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
      .then(artistOrAuthor => {
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
                  progress={true}
                  progressLoadingTime={3000}
                  width={100}
                  textColor="#000000"
                  backgroundColor="#5ce1e6"
                  alignItems="center"
                  onPress={() => {
                    console.log("button pressed in profile");
                    this.updateUser().then(() => {
                      console.log(
                        "update user function has been called, now going to display profile"
                      );
                      this.props.navigation.navigate("DisplayProfile", {
                        id: this.state.id,
                        type: this.type
                      });
                    });
                  }}
                >
                  <Text>Next</Text>
                </AwesomeButton>
              </View>

              <AwesomeButton
                progress={true}
                progressLoadingTime={3000}
                width={100}
                textColor="#000000"
                backgroundColor="#5ce1e6"
                alignItems="center"
                onPress={() => {
                  this.signOut();
                  this.props.navigation.navigate("Welcome");
                }}
              >
                <Text>Logout</Text>
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
    paddingHorizontal: 70,
    borderWidth: 1
  },

  editProfileButton: {
    alignItems: "center",
    textAlign: "right"
  },

  textContainer: {
    padding: 20
  },

  onebutton: {
    marginBottom: 20,
    alignItems: "center",
    textAlign: "right"
  },

  photoTxt: {
    color: "#FFF",
    alignItems: "center"
  }
});
