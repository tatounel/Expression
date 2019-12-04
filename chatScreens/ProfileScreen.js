import React from 'react';
import { SafeAreaView, StyleSheet, Image, 
        TouchableOpacity, AsyncStorage, Text } from 'react-native';
import User from './User';


import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {
    //For Top of page Details
    static navigationOptions = ({ navigation }) => {
        return{ 
          title: 'Chat_Profile',
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
        emal:"",
        password: "",
    };
    componentDidMount(){
        const {email, password} = firebase.auth().currentUser;
        this.setState({email, password});
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
                <Text style={{ fontSize: 20 }}>
                    {/* {User.email} */}
                    Hi {this.state.email}!
                </Text>

                <Text style={{ fontSize: 20 }}>
                    {/* {User.name} */}
                    {/* Hi {this.state.null} */}
                </Text>

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
        alignItems: "center",
        justifyContent: "center"
    },
    greeting: {
        fontSize: 25,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    logout: {
        textAlign: 'center',
        fontSize: 20,
        color: 'blue',
    }
})
