import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native";
import Image from "react-native-scalable-image";
import WMA from "wma-matching-algorithm";

class matchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.type = props.navigation.state.params.type;
    this.id = props.navigation.state.params.id;
    console.log(this.type);
    if (this.type == "Author") {
      this.genreOrStyle = "genres";
      this.interests = "styles";
      this.oppositeType = "Artist";
    } else if (this.type == "Artist") {
      this.genreOrStyle = "styles";
      this.interests = "genres";
      this.oppositeType = "Author";
    }

    this.state = {
      success: true,
      error: false,
      photo: null,
      email: "",
      password: "",
      id: "",
      bio: "",
      usersInterests: "",
      matchGenresOrStyles: "",
      data: null,
      matchOne: null
    };
  }

  componentDidMount() {
    this.getCurrentUserInfo()
      .then(() => {
        return this.findAllTypeUsers();
      })
      .then(() => {
        this.init(this.state.data);
      });
  }

  init = ({ data }) => {
    const wma = new WMA({
      source: data,
      matchIndex: 10,
      showOriginal: true,
      verbose: 1,
      keys: [
        // { key: `ebu`, m: 20 },
        // { key: `alc`, m: 50 },
        // { key: `cdex`, m: 10 },
        // { key: `color`, m: 2 },
        { key: `matchGenresOrStyles`, m: 100 }
      ]
    });
    console.log(this.state.matchOne);
    wma
      .match(this.state.matchOne)
      .then(response => {
        console.log(response.json());
      })
      .catch(err => {
        console.log(err);
      });
    console.log("Above is match output");
  };

  getCurrentUserInfo = async () => {
    console.log(
      "get current user function called in finding match with " +
        this.type +
        " and " +
        this.id
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
      .then(async user => {
        // let temp = this.genreOrStyle
        let temp = this.interests.slice(0, -1);
        const itemElement = {
          id: `${user.id}`,
          name: `${user.name}`,
          matchGenresOrStyles: `${user.interests}`
        };
        console.log(itemElement);
        console.log("Above is match one");
        await this.setState({
          success: true,
          bio: user.bio,
          usersInterests: user.interests,
          // matchGenresOrStyles: user[`${temp}`],
          matchOne: itemElement
        });

        // console.log(user[`${this.genreOrStyle}`]);
        // console.log(this.state.interests);
        // console.log(this.state.genreOrStyle);
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err);
      });
  };

  findAllTypeUsers = async event => {
    console.log(`Getting all ${this.oppositeType}s please work`);
    return fetch(`http://localhost:8000/api/${this.oppositeType}s/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(`Got all ${this.type}s`);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Content validation");
      })
      .then(async artistsOrAuthors => {
        this.setState({
          success: true
        });
        let items = [];
        let temp = this.interests.slice(0, -1);
        // console.log(temp);
        artistsOrAuthors.filter(user => {
          console.log(user);
          let obj = user;
          let itemElement = {
            id: `${obj.id}`,
            name: `${obj.name}`,
            matchGenresOrStyles: `${obj[`${temp}`]}`
          };
          items.push(itemElement);
          console.log(itemElement);
          // console.log(`${obj[temp]}`);
          console.log(`${obj[`${temp}`]}`);
        });
        await this.setState({
          data: { items }
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err);
      });
  };

  render() {
    return (
      <View style={matchStyleSheet.container}>
        <Image
          width={Dimensions.get("window").width}
          source={require("./assets/findmatch.png")}
        />

        <TouchableOpacity style={matchStyleSheet.buttonContainer}>
          <View style={matchStyleSheet.shiftButton}>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              <Text>XPressions</Text>
            </AwesomeButton>
          </View>

          <View>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              <Text>Message</Text>
            </AwesomeButton>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={matchStyleSheet.buttonContainer}>
          <View style={matchStyleSheet.shiftButton}>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              <Text>Accept</Text>
            </AwesomeButton>
          </View>

          <View>
            <AwesomeButton
              width={90}
              textColor="#000000"
              backgroundColor="#5ce1e6"
              onPress={() => this.props.navigation.navigate("null")}
            >
              <Text>Deny</Text>
            </AwesomeButton>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default matchScreen;

const matchStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  shiftButton: {
    marginRight: 20
  }
});
