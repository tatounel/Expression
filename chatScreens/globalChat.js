//CHAT #Latest https://www.youtube.com/watch?v=SAOdQRK5K20 
import React, {Component, PropTypes} from 'react';
import { StyleSheet, Text,  View, Image, StatusBar, 
        TextInput, AppRegistry, TouchableOpacity, 
        TouchableWithoutFeedback, AsyncStorage } from "react-native";

import Backend from "./Backend";
import {GiftedChat} from "react-native-gifted-chat";
//import { styles } from 'react-native-really-awesome-button/src/styles';

class globalChat extends React.Component{
    constructor(props){
        super(props);
        this.state = { name: false };
    }
    state = {
        message: []
    };

    componentWillMount() {}

    componentDidMount(){
        Backend.loadMessages(message => {
            this.setState(previousState => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
        });
    }//end of componentdidmount

    render(){
        return (
            <View style={styles.container}>
                <GiftedChat 
                    messages = {this.state.messages}
                    onSend = {message => {
                        Backend.sendMessage (message);
                    }}
                    user = { {
                        id: Backend.getUid(),
                        name: this.props.name
                    }} />
            </View>
        );
    }
    componentWillUnmount(){
        Backend.closeChat();
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "gray",
    }
});

export default globalChat;