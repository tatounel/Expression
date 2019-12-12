import React from "react";
import { View, Text, TextInput, Platform, 
        Animated, StyleSheet, Dimensions,
        KeyboardAvoidingView, SafeAreaView, 
        AsyncStorage, TouchableOpacity } from "react-native";
//import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import User from "../User"
import { FlatList } from "react-native-gesture-handler";
import { StackGestureContext } from "react-navigation-stack";

export default class chatScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return{
            title: navigation.getParam('username', null)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            person: {
                username: props.navigation.getParam('username'),
                email: props.navigation.getParam('email')
            },
            textMessage: '',
            messageList: [],
            dbRef: firebase.database().ref('messages')
        }
        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(60);
    }
    componentDidMount(){
        firebase.database().ref('messages').child(User.username).child(this.state.person.username)
            .on('child_added', (value) => {
                this.setState( (prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }
    // componentDidMount(){
    //     firebase.database().ref('messages/Users').child(this.state.person.username)
    //         .on('child_added', (value) => {
    //             this.setState( (prevState) => {
    //                 return {
    //                     messageList: [...prevState.messageList, value.val()]
    //                 }
    //             })
    //         })
    // }

    componentWillUnmount(){
        this.state.dbRef.off()
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    //gets time from timestamp
    convertTime = (time) => {
        let date = new Date(time);
        let day = new Date();
        let result = ( date.getHours() < 10 ? '0' : '' ) + date.getHours() + ':';
        result += ( date.getMinutes() < 10 ? '0' : '' ) + date.getMinutes();
        //12 hour timeframe
        if(result < 12){
            result += ' AM';
        }
        else if(result >= 12){
            result -= 12;
            result += ' PM';
        }
        //if the days are different
        if(day.getDay() !== date.getDay()){
            result = date.getDay() + ' ' + date.getMonth() + ' ' + result;
        }
        return result;
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgID = firebase.database().ref('messages').child(User.username)
                        .child(this.state.person.username).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.username
            }
            updates[User.username + '/' + this.state.person.username + '/' + msgID] = message;
            updates[this.state.person.username + '/' + User.username + '/' + msgID] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' });
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style = { {
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === User.username ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.username ? '#ea357f' : '#f491ba',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
                    {item.message}
                </Text>
                <Text style={{ color:'#eee', padding:3, fontSize:12 }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    render(){
        let {height, weight} = Dimensions.get('window');
        return(
            <KeyboardAvoidingView>
                <FlatList 
                    style = { {padding:10, height: height * 0.8} } 
                    data = {this.state.messageList}
                    renderItem = {this.renderRow} 
                    keyExtractor = { (item, index) => index.toString() } />
                <View style = { { flexDirection: 'row', alignItems: 'center'} }>
                    <TextInput 
                        style = {chatstyles.input}
                        value = {this.state.textMessage}
                        placeholder = "Type message..."
                        onChangeText = {this.handleChange('textMessage')} />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text style = {chatstyles.sendB}> Send </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const chatstyles = StyleSheet.create({
    sendB:{
    },
    input:{
        width: '85%',
        marginLeft: 10
    },
})
