import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import Image from "react-native-scalable-image";
import MultipleTags from "react-native-multiple-tags";

import User from "./chatScreens/User";
import * as firebase from "firebase";

export default class profileDisplayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.navigation.state.params.id;
    this.type = props.navigation.state.params.type;
    if (this.type == "Author") {
      this.genreOrStyle = "genre";
    } else if (this.type == "Artist") {
      this.genreOrStyle = "style";
    }
  }

  state = {
    bio: "",
    interests: [],
    genreOrStyle: []
  };
  getCurrentUserInfo = () => {
    console.log(
      "get current user function called with " + this.type + " and " + this.id
    );
    return fetch(`http://localhost:8000/api/${this.type}s/${this.id}`, {
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
      .then(user => {
        // let temp = this.genreOrStyle
        this.setState({
          success: true,
          bio: user.bio,
          interests: user.interests,
          genreOrStyle: user[`${this.genreOrStyle}`]
        });

        console.log(user[`${this.genreOrStyle}`]);
        console.log(this.state.interests);
        console.log(this.state.genreOrStyle);
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  //this is so You can't press back on the hardware for any device once you Login
  componentDidMount() {
    console.log("Component did mount on display profile called");
    this.getCurrentUserInfo().then(() =>
      console.log("User gotten successfully")
    );
    // BackHandler.addEventListener("hardwareBackPress", function() {
    //   return true;
    // });
  }
  //logout Button
  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  //For Top Page Details
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerRight: (
        //Profile Icon on the TopRight Side of Bar
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={{ width: 32, height: 32, marginRight: 5 }}
            source={require("./assets/usercircle.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  //for Chat
  state = {
    users: []
  };

  //for Chat
  componentWillMount() {
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", val => {
      let person = val.val();
      person.email = val.key;
      //if it's the same person, just display name
      if (person.email === User.email) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });
      }

      this.setState(prevState => {
        return {
          users: [...prevState.users, person]
        };
      });
    });
  }

  //for Chat
  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styleDisplayProfile.chatName}
        onPress={() => this.props.navigation.navigate("Chat", item)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styleDisplayProfile.container}
      >
        <View style={styleDisplayProfile.container}>
          <Text>Welcome back!</Text>
          <Image
            width={200}
            source={require("./assets/faceicon.png")}
            style={styleDisplayProfile.facePic}
          />
          <Text>Upload Your First Image</Text>
          {/* <MultipleTags
            tags={this.state.genreOrStyle}
            // search
            onChangeItem={content => {
              this.setState({ content });
            }}
            title="Genres Or Styles"
          /> */}
          {/* <MultipleTags
            tags={this.state.interests}
            // search
            onChangeItem={content => {
              this.setState({ content });
            }}
            title="Interests"
          /> */}
          <Text>Bio: {this.state.bio}</Text>
          <Text>Genre or Style: {this.state.genreOrStyle}</Text>
          <Text>Interests: {this.state.interests}</Text>

          <TouchableOpacity style={styleDisplayProfile.buttonPosition}>
            <View style={styleDisplayProfile.onebuttonPosition}>
              <AwesomeButton
                width={120}
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={() => this.props.navigation.navigate("ArtistContent")}
              >
                <Text>See XPression</Text>
              </AwesomeButton>
            </View>
            <View>
              <AwesomeButton
                width={120}
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={() => this.props.navigation.navigate("MatchContent")}
              >
               <Text>Find A Match</Text>
              </AwesomeButton>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.logOut}>
            <Text style={styleDisplayProfile.logout}>Logout</Text>
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
  },
  buttonPosition: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  onebuttonPosition: {
    marginRight: 20
  },
  logout: {
    textAlign: "center",
    fontSize: 20,
    color: "blue"
  }
});
