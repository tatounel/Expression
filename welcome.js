import React from "react";
import { Text, View, Image, StyleSheet, 
        TouchableOpacity } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
//import Image from "react-native-scalable-image";

/* building a class that includes the touchability to move forward 
    to the next page for each button */
class WelcomeScreen extends React.Component {

  //For Top Page Details
  static navigationOptions = ({ navigation }) => {
    return{ 
      title: 'Welcome',
    }
  }   
    
    render(){
        return(
            <View style = {styleWelcome.container}>
                <Text>Welcome To</Text>
                <Image style = {{width: 300, height: 200}}
                    source = {require("./assets/xpression.png")}/>
                <Text>Where Artists and Authors Unite</Text>

                    <TouchableOpacity style = {styleWelcome.buttoncontainer} >
                    <View style = {styleWelcome.button1}>
                        <AwesomeButton
                        textColor= "#000000"
                        backgroundColor= "#5ce1e6"
                        onPress = {() => this.props.navigation.navigate('Login')}
                        >Log In
                        </AwesomeButton>
                    </View>
                    
                    <View>
                        <AwesomeButton
                        textColor= "#000000"
                        backgroundColor= "#5ce1e6"
                        onPress = {() => this.props.navigation.navigate('Signup')}
                        >Sign Up
                        </AwesomeButton>
                    </View>
                    </TouchableOpacity>
            </View>
        )
    }

}

export default WelcomeScreen;

const styleWelcome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0080",
    alignItems: "center",
    justifyContent: "center"
  },
  buttoncontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button1: {
    marginRight: 20
  }
});
