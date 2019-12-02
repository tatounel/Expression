import React from "react";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { creatStackNavigator, createStackNavigator } from "react-navigation-stack";

import WelcomeScreen from "./welcome.js";
import loginScreen from "./login";
import signUpScreen from "./signup";
import createProfileScreen from "./profile";
import profileDisplayScreen from "./displayprofile";
import artistContentScreen from "./artistcontent";
import authorContentScreen from "./authorcontent";

// import AuthLoadingScreen from "./chatScreens/AuthLoadingScreen";
import chatScreen from "./chatScreens/chatScreen";
import ProfileScreen from "./chatScreens/ProfileScreen";

import LoadingScreen from "./chatScreens/LoadingScreen";
/* YT authentication tutorial https://www.youtube.com/watch?v=TkuQAjnaSbM&t=128s */
import * as firebase from 'firebase';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAO19aZCQkjfLSIuMdLx1hiLcaLTrioVQ0",
    authDomain: "expression-266df.firebaseapp.com",
    databaseURL: "https://expression-266df.firebaseio.com",
    projectId: "expression-266df",
    storageBucket: "expression-266df.appspot.com",
    messagingSenderId: "775498698408",
    appId: "1:775498698408:web:9232c6f6778146cd557c9d",
    measurementId: "G-0RCR4RTM7L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const AppStack = createStackNavigator({
  //FIRST PAGE HERE IS THE PAGE YOU SEE AFTER SIGNUP
  Profile: ProfileScreen,
  EditProfile: createProfileScreen,
  //GOES HERE WHEN YOU LOGIN
  DisplayProfile: profileDisplayScreen,
  ArtistContent: artistContentScreen,
  AuthorContent: authorContentScreen,
  Chat: chatScreen,
});
const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  Login: loginScreen,
  Signup: signUpScreen,
});

export default createAppContainer(
  createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    },
    {
      // initialRouteName: 'AuthLoading',
      initialRouteName: "Loading",
    }
  )
);
