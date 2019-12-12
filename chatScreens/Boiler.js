//CHAT #Latest https://www.youtube.com/watch?v=SAOdQRK5K20 
import React from 'react';
import { StyleSheet, Text,  View, Image, StatusBar, 
        TextInput, AppRegistry, TouchableOpacity, 
        TouchableWithoutFeedback, AsyncStorage } from "react-native";

export default class Boiler extends React.Component{

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#16a085",
            elevation: null
        },
        headerLeft: null
    };
    state = {
        firstName: "",
        lastName: ""
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#00796B" />
                <Text style = {styles.title}> Enter your Name: </Text>
                <TextInput style = {styles.nameInput}
                    placeholder = {this.state.firstName}
                    onChangeText = { text => {
                        this.setState({
                            firstName: text
                        });
                    }}
                    value = {this.state.firstName} />

                <TextInput style = {styles.nameInput}
                    placeholder = {this.state.lastName}
                    onChangeText = { text => {
                        this.setState({
                            lastName: text
                        });
                    }}
                    value = {this.state.lastName} />

                <TouchableOpacity>
                    <Text style={styles.buttonStyle}
                        onPress = { () => 
                            this.props.navigation.navigate("globalChat", {
                                name: (this.state.firstName + " " + this.state.lastName)
                            })}> Chat Room 
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style = {styles.buttonStyle}
                    onPress = { () => this.props.nvaigation.navigate("FriendList")} >
                        Friend List
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}//end of export default class

const styles = StyleSheet.create({
    title: {
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20
    },
    nameInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "black",
        margin: 20
    },
    buttonStyle: {
        marginLeft: 20,
        margin: 20
    },
    container:{
        flex: 1
    }
});

AppRegistry.registerComponent("Boiler", () => Boiler )