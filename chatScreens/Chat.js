//CHAT #Latest https://www.youtube.com/watch?v=SAOdQRK5K20 
import React, {Component} from 'react';
import { StyleSheet, Text,  View, Image, StatusBar, 
        TextInput,  ListView, Button, AsyncStorage,
        TouchableOpacity, AppRegistry, 
        TouchableWithoutFeedback} from "react-native";
import {StackNavigator} from "react-navigation";
import {GiftedChat} from "react-native-gifted-chat";
import firebase from "firebase";

var name, uid, email;

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            messages: []
        };
        this.user = firebase.auth().currentUser;
        console.log("User: " + this.user.uid);

        const {params} = this.props.navigation.state;
        uid = params.uid;
        name = params.name;
        email = params.email;
        console.log("User: " + uid);

        this.chatRef = this.getRef().child("chat/" + this.generateChatId());
        this.chatRefData=this.chatRef.orderByChild("orders");
        this.onSend = this.onSend.bind(this);
    }//end of constructor
    generateChatId(){
        if(this.user.uid > uid) return `${this.user.uid}-${uid}`;
        else return `${uid}-${this.user.uid}`;
    }
    getRef(){
        return firebase.database().ref();
    }
    listenForItems(chatRef){
        chatRef.on("value", snap => {
            //get children as array
            var items= [];
            snap.forEach(child => {
                items.push({
                    id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user:  {
                        id: child.val().uid
                    }
                });
            });
        })
    }//end of listenforitems
    componentDidMount(){
        this.listenForItems(this.chatRefData);
    }
    componentWillMount(){
        this.chatRefData.off();
    }
    onSend(messages = []){
        messages.forEach(message => {
            var now = new Date.getTime();
            this.chatRef.push({
                id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,
                order: -1 * now
            });
        });
    }
    render(){
        return(
            <GiftedChat messages = { this.state.messages}
                onSend = {this.onSend.bind(this)} 
                user = {{
                    id:this.user.uid
                }} 
            />
        )
    }//end of render
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        marginRight: 10,
        marginLeft: 10
    }
})