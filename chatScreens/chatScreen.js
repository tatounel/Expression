import React from "react";
import {
    Platform, AsyncStorage,
    KeyboardAvoidingView,
    SafeAreaView, Text, TextInput,
    TouchableOpacity, StyleSheet,
    Dimensions, View } from "react-native";
//import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import User from "./User"
import { FlatList } from "react-native-gesture-handler";

class chatScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name', null)
    });

    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                email: props.navigation.getParam('email')
            },
            messages: ''
        }
    }

    componentWillMount(){
        firebase.database().ref('messages').child(User.email).child(this.state.person.email)
            .on('child_add', (value)=>{
                this.setState((prevState)=>{
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    //gets time from timestamp
    convertTime = (time) => {
        let date = new Date(time);
        let day = new Date();
        let result = ( date.getHours() < 10 ? '0' : '' ) + d.getHours() + ':';
        result += ( d.getMinutes() < 10 ? '0' : '' ) + d.getMinutes();
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
        if (this.state.messages.length > 0) {
            let msgID = firebase.database().ref('messages').child(User.name).child(this.state.person.name).push().key;
            let updates = {};
            let message = {
                message: this.state.messages,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.email
            }
            updates['messages/' + User.email + '/' + this.state.person.email + '/' + msgID] = message;
            updates['messages/' + this.state.person.email + '/' + User.email + '/' + msgID] = message;
            firebase.database().ref().update(updates);
            this.setState({ messages: '' });
        }
    }

    //old chat
    get user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.uid
        };
    }

    //old chat
    componentDidMount() {
        Fire.get(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        );
    }

    //old chat
    componentWillUnmount() {
        Fire.off();
    }

    // render() {
    //     const chat = < GiftedChat messages = {this.state.messages} 
    //                                 onSend = {Fire.send} 
    //                                 user = {this.user} />;
    //     if (Platform.OS === "android") {
    //         return (
    //             <KeyboardAvoidingView style={{ flex: 1 }} 
    //                                     behavior = "padding" 
    //                                     keyboardVerticalOffset = {30} 
    //                                     enabled> {chat}
    //             </KeyboardAvoidingView>
    //         );
    //     }
    //     return <SafeAreaView style = {{ flex: 1 }}> {chat} </SafeAreaView>;
    // }//closes render()

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === User.email ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.email ? '#00897b' : '#7cb342',
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

    render() {
        let {height, weight} = Dimensions.get('window');
        return (
            <SafeAreaView>
                <FlatList style={{padding:10, height: height * 0.8}}
                    data={this.state.messages}
                    renderItem={this.renderRow}
                    KeyExtractor={(item, index) => index.toString()} />

                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5}}>
                <TextInput
                    style={chatstyles.inputs}
                    value={this.state.messages}
                    placeholder="Type message..."
                    onChangeText={this.handleChange('messages')}  />

                <TouchableOpacity onPress={this.sendMessage}
                    style={{paddingBottom: 10, marginLeft:5}}>
                    <Text style={chatstyles.sendB}> Send </Text>
                </TouchableOpacity>
                </View>


            </SafeAreaView>
        )
    }
}

export default chatScreen;

const chatstyles = StyleSheet.create({
    sendB:{

    }
})