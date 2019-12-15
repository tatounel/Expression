import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
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
      name: "",
      bio: "",
      genreOrStyle: "",
      interests: "",
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
        // this.init(this.state.data);
        this.findUserMatch();
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
    // wma
    //   .match(this.state.matchOne)
    //   .then(response => {
    //     console.log(response.json());
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // console.log("Above is match output");
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

  findUserMatch = () => {
    let defaultId = 3;
    return fetch(
      `http://localhost:8000/api/${this.oppositeType}s/${defaultId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        console.log(`Got match 4`);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Content validation");
      })
      .then(artistOrAuthor => {
        this.setState({
          success: true,
          name: artistOrAuthor.name,
          bio: artistOrAuthor.bio,
          genreOrStyle: artistOrAuthor[`${this.interests.slice(0, -1)}`],
          interests: artistOrAuthor.interests
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  };

  render() {
    return (
      <View style={matchStyleSheet.container}>
        <Image
          style={{ width: 300, height: 200, resizeMode: "contain" }}
          source={require("./assets/findmatch.png")}
        />
        <Text>Name: {this.state.name}</Text>
        <Text>Bio: {this.state.bio}</Text>
        <Text>Genre or Style: {this.state.genreOrStyle}</Text>
        <Text>Interests: {this.state.interests}</Text>
        <View style={matchStyleSheet.buttonContainer}>
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
        </View>

        <View style={matchStyleSheet.buttonContainer}>
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
        </View>
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
