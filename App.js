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
    apiKey: "AIzaSyC-0GWVdziaKE2oKpEFG4GuByJ-ncyfFo4",
    authDomain: "xpression-83251.firebaseapp.com",
    databaseURL: "https://xpression-83251.firebaseio.com",
    projectId: "xpression-83251",
    storageBucket: "xpression-83251.appspot.com",
    messagingSenderId: "930392001728",
    appId: "1:930392001728:web:8038f5b123ce1d48b1b125",
    measurementId: "G-MN8017QVQZ"
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