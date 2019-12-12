import React from 'react';
import { StyleSheet, Text, View, Image, 
        TextInput, StatusBar, FlatList,
        KeyboardAvoidingView, AsyncStorage,
        TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import User from '../User';
import firebase from 'firebase';

export default class HomeScreen extends React.Component{
    static navigationOptions = {
        title: 'Chat List'
    }

    state = {
        users: [],
        dbRef: firebase.database().ref('Users')
    }
    componentDidMount(){
        let dbRef = firebase.database().ref('Users');
        this.state.dbRef.on('child_added', (val)=> {
            let person = val.val();
            person.email = val.key;
                this.setState((prevState)=> {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            
        })
    }
    componentWillUnmount(){
        this.state.dbRef.off();
    }

    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    renderRow = ({item}) => {
        return(
            <TouchableOpacity 
                onPress={ () => this.props.navigation.navigate('Chat', item)}
                style={{padding:10, borderBottomColor:'#ccc', borderBottomWidth: 1}} > 
                <Text style = {{fontSize: 20}}> {item.username} </Text>
            </TouchableOpacity>
        )
    }
    render(){
        return(
            <SafeAreaView>
                <FlatList 
                    ListHeaderComponent = { () => <Text style={home.listStart}> Users Chat List </Text>} 
                    data={this.state.users} 
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.email} 
                />

                <TouchableOpacity onPress={this.signOut}>
                    <Text style = {home.logout}> Logout </Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}
const home = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F7"
    },
    circle:{
        width: 500,
        height: 500,
        borderRadius: 500/2,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        left: -120,
        top: -20
    },
    logout: {
        textAlign: "center",
        fontSize: 20,
        color: 'blue'
    },
    welcome: {
        textAlign: "center",
        fontSize: 20,
        color: "green",
        margin: 10
    },
    listStart: {
        textAlign: "center",
        margin: 10
    }
})
