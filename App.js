import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WelcomeScreen from "./welcome.js";
import loginScreen from "./login";
import signUpScreen from "./signup";
import createProfileScreen from "./profile";
import profileDisplayScreen from "./displayprofile";
import artistContentScreen from "./artistcontent";
import authorContentScreen from "./authorcontent";
//Calling in the files for it to stack and work as a moving screen

const MainNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome`,
      headerBackTitle: null
    })
  },
  Login: {
    screen: loginScreen,
    navigationOptions: () => ({
      title: `Login Page`,
      headerBackTitle: null
    })
  },
  Signup: {
    screen: signUpScreen,
    navigationOptions: () => ({
      title: `Sign Up Page`,
      headerBackTitle: null
    })
  },

  EditProfile: {
    screen: createProfileScreen,
    navigationOptions: () => ({
      title: `Edit Profile`,
      headerBackTitle: null
    })
  },
  DisplayProfile: {
    screen: profileDisplayScreen,
    navigationOptions: () => ({
      title: "Profile",
      headerBackTitle: null,
      headerLeft: null
    })
  },

  ArtistContent: {
    screen: artistContentScreen,
    navigationOptions: () => ({
      title: `Artist`,
      headerBackTitle: null
    })
  },

  AuthorContent: {
    screen: authorContentScreen,
    navigationOptions: () => ({
      title: `Author`,
      headerBackTitle: null
    })
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
