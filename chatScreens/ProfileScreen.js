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
                    Hi {this.state.null}
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
        flex: 1
    },
    logout: {
        textAlign: 'center',
        fontSize: 20,
        color: 'blue'
    }
})
