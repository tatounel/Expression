import React from 'react';
import { View, Text, StyleSheet, 
        ActivityIndicator} from "react-native";
import * as firebase from "firebase";
//import { styles } from "react-native-really-awesome-button/src/styles";

export default class LoadingScreen extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=> {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render(){
        return (
            <View style = {loading.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const loading = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});