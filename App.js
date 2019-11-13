import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './welcome.js';
import loginScreen from './login';
import signUpScreen from './signup';
import profileScreen from './profile';

//Calling in the files for it to stack and work as a moving screen

const MainNavigator = createStackNavigator({
  Welcome: {screen: WelcomeScreen,
    navigationOptions: () => ({
    title: `Welcome`,
    headerBackTitle: null,
  })
},
  Login: {screen: loginScreen,
    navigationOptions: () => ({
    title: `Login Page`,
    headerBackTitle: null,
    })
  },
  Signup: {screen: signUpScreen,
    navigationOptions: () => ({
    title: `Sign Up Page`,
    headerBackTitle: null,
    })},

  Profile: {screen: profileScreen,
    navigationOptions: () => ({
      title: `Edit Profile`,
      headerBackTitle: null,
    })},

  //ArtistContent: {screen: artistContentScreen},

  //AuthorContent: {screen: authorContentScreen}
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render(){
    return <AppContainer/>;
  }
}