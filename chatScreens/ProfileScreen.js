import React from 'react';
import { SafeAreaView, StyleSheet, Image, 
        TouchableOpacity, AsyncStorage, Text } from 'react-native';
import User from '../User';

import * as firebase from "firebase";

/* This is the Screen it shows when the USER STAYS LOGGED INTO APP */
export default class ProfileScreen extends React.Component {
    //For Top of page Details
    static navigationOptions = ({ navigation }) => {
        return{ 
          title: 'chatProfile Screen',
          headerRight: (
              //Profile Icon on the TopRight Side of Bar
            <TouchableOpacity onPress = {() => navigation.navigate('Profile')} >
                <Image style= {{ width:32, height: 32, marginRight: 5}}
                source={require('./usercircle.png')}/>
            </TouchableOpacity>
          )
        }
      }
      
    state = {
        email:"",
        password: "",
        name: ""
    };
    //uses const to login for firebase
    componentDidMount(){
        const {email, password, name} = firebase.auth().currentUser;
        this.setState({email, password, name});
    }
    signOut = () => {
        firebase.auth().signOut();
    }
    //logout Button
    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <SafeAreaView style={profileStyle.container}>
                <Text style={profileStyle.greeting}>
                    Greetings, {this.state.email}! Or is it ...
                    {this.state.name}
                    {/* {User.email} */}
                </Text>

                <TouchableOpacity 
                    onPress = {() => this.props.navigation.navigate('Chat', {name: this.state.name})} >
                    <Text style={profileStyle.links}> 
                        CHAT HERE </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={this.logOut}> */}
                <TouchableOpacity onPress={this.signOut}>
                    <Text style = {profileStyle.logout}>Logout</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}

const profileStyle = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: "#ff0080",
        //alignItems: "center",
        //justifyContent: "center"
    },
    greeting: {
        fontSize: 25,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        marginTop: 25
        //alignItems: "center",
        //justifyContent: "center"
    },
    logout: {
        textAlign: 'center',
        fontSize: 20,
        color: 'blue',
        //alignItems: "center",
        //justifyContent: "center"
    },
    links: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        margin: 125
    }
})
