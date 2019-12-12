//CHAT #Latest https://www.youtube.com/watch?v=SAOdQRK5K20 
import React, {Component} from 'react';
import { StyleSheet, Text,  View, Image, StatusBar, 
        TextInput, ListView, Button, AsyncStorage, 
        TouchableOpacity, KeyboardAvoidingView,
        TouchableWithoutFeedback} from "react-native";
import {StackNavigator} from "react-navigation";
import firebase from "firebase";

import Chat from './Chat';
// import { styles } from 'react-native-really-awesome-button/src/styles';

var name, uid, email;
export default class FriendsList extends React.Component{
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#16a085",
            elevation: null
        }
    }
    state={
        name: "",
        uid: null,
        email: ""
    };
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: true
        };
        this.friendsRef= this.getRef().child("friends");
    }
    getRef(){
        return firebase.database().ref();
    }
    listenforItems(friendsRef){
        var user = firebase.auth().currentUser;
        friendsRef.on("value", snap => {
            //get children as an array
            var items=[];
            snap.forEach(child => {
                if(child.val().email != user.email)
                    items.push({
                        name: child.val().name,
                        uid: child.val().uid,
                        email: child.val().email
                    });
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                loading: false
            });
        });
    }//end of listenforitems
    componentDidMount(){
        this.listenforItems(this.friendsRef);
    }
    renderRow = rowData => {
        return (
            <TouchableOpacity onPress= {()=> {
                name = rowData.name;
                email = rowData.email;
                uid = rowData.uid;
                this.props.navigation.navigate("Chat", {
                    name: name,
                    email: email,
                    uid: uid
                });
            }} >

            </TouchableOpacity>
        )
    }
    render(){
        return (
            <View style = {styles.container}>
                <View style = {styles.topGroup}>
                    <Text style = {styles.myFriends}> My Friends </Text>
                </View>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        marginRight: 10,
        marginLeft: 10
    },
    topGroup:{
        flexDirection: "row",
        margin: 10
    },
    myFriends:{
        flex: 1,
        color: "#3A5BB1",
        tintColor: "#fff",
        fontSize: 16,
        padding: 5
    }
})