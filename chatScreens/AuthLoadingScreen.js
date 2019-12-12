// import React from "react";
// import {
//   ActivityIndicator,
//   AsyncStorage,
//   StatusBar,
//   StyleSheet,
//   View
// } from "react-native";
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import AwesomeButton from "react-native-really-awesome-button";

// import firebase from 'firebase';

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }

//   componentWillMount() {
//     var firebaseConfig = {
//       apiKey: "AIzaSyCEL1u3MX1XfH2Rymh3Q5-lE7hcW3owYos",
//       authDomain: "xpression-c98fe.firebaseapp.com",
//       databaseURL: "https://xpression-c98fe.firebaseio.com",
//       projectId: "xpression-c98fe",
//       storageBucket: "xpression-c98fe.appspot.com",
//       messagingSenderId: "692112100837",
//       appId: "1:692112100837:web:a2c3453990a69ac716b30c",
//       measurementId: "G-XG8D6YBXVT"
//     };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }

// export default AuthLoadingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }
// );

import React from "react";
import { StatusBar, StyleSheet,
        View, AsyncStorage,
        ActivityIndicator} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

import firebase from 'firebase';
import User from '../User';

/* THIS IS FOR CHAT SCREEN */
export default class AuthLoadingScreen extends React.Component {
  static KEY_LOGGED_IN_USER = 'loggedInUser';

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    
    this.navigateAsync = this.navigateAsync.bind(this);
    this.navigateAsync();
  }

  componentWillMount() {
    var config = {
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
    firebase.initializeApp(config);
  }

  /* Fetch the token from storage then navigate to our appropriate place
      FOR CHAT */
  _bootstrapAsync = async () => {
    User.email = await AsyncStorage.getItem('email');
    /* This will switch to the App screen or Auth screen and this loading
        screen will be unmounted and thrown away. */
    this.props.navigation.navigate(User.email ? 'App' : 'Auth');
  };


  async navigateAsync() {
    AuthLoadingScreen.isLoggedIn().then(() => {
      this.props.navigation.navigate('App');
    }, () => {
      this.props.navigation.navigate('Auth');
    });
  }

  static isLoggedIn() {
    return new Promise(((resolve, reject) => {
      AsyncStorage.getItem(AuthLoadingScreen.KEY_LOGGED_IN_USER, (exception, userObj) => {
        if (userObj) {
          resolve(userObj);
        }
        reject(userObj);
      });
    }));
  }


  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

//export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}
);