import React from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Image from "react-native-scalable-image";

export default class profileDisplayScreen extends React.Component {
  //this is so You can't press back on the hardware for any device once you Login
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", function () {
      return true;
    });
  }

  //logout Button
  logOut = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
  }

  //For Top Page Details
  static navigationOptions = ({ navigation }) => {
    return{ 
      title: 'Profile',
      headerRight: (
        //Profile Icon on the TopRight Side of Bar
          <TouchableOpacity onPress={()=>navigation.navigate('Profile')} >
            <Image style= {{ width:32, height: 32, marginRight: 5}}
              source={require('./assets/usercircle.png')}/>
          </TouchableOpacity>
          )
    }
  }

  //for Chat
  state = {
    users: []
  }

  //for Chat
  componentWillMount() {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', (val) => {
      let person = val.val();
      person.email = val.key;
      //if it's the same person, just display name
      if (person.email === User.email){
        User.name = person.name
      }else{
        this.setState( (prevState) => {
          return {
            users: [...prevState.users, person]
          }
        })
      }

      this.setState((prevState) => {
        return {
          users: [...prevState.users, person]
        }
      })
    })
  }

  //for Chat
  renderRow = ({ item }) => {
    return (
      <TouchableOpacity style={styleDisplayProfile.chatName}
        onPress={() => this.props.navigation.navigate('Chat', item)} >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
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
            width={200}
            source={require("./assets/faceicon.png")}
            style = {styleDisplayProfile.facePic} />
            <Text>Upload Your First Image</Text>
          />

          <TouchableOpacity style={styleDisplayProfile.buttonPosition}>
            <View style={styleDisplayProfile.onebuttonPosition}>
              <AwesomeButton
                width={120}
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={() => this.props.navigation.navigate("ArtistContent")}
              >
                See XPression
              </AwesomeButton>
            </View>
            <View>
              <AwesomeButton
                width={120}
                textColor="#000000"
                backgroundColor="#5ce1e6"
                onPress={() => this.props.navigation.navigate("MatchContent")}
              >
                Find Match
              </AwesomeButton>
            </View>

          </TouchableOpacity>

          <SafeAreaView>
            <FlatList data={this.state.users}
              renderItem={this.renderRow}
              keyExtractor={(item) => item.email} />
          </SafeAreaView>


          <TouchableOpacity onPress={this.logOut}>
            <Text style = {styleDisplayProfile.logout}>Logout</Text>
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
    textAlign: 'center',
    fontSize: 20,
    color: 'blue'
}
});

