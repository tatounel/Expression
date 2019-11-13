import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

class profileScreen extends React.Component{
    render(){
        return(
            <View style = {StyleProfile.container}>
                <Text>Please Create Your Profile</Text>
                <Image style = {{width: 300, height: 200}}
                source = {require("./assets/xpression.png")}/>
                

            </View>
        );
    }
}

export default profileScreen;

const StyleProfile = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ff0080",
        alignItems: "center",
        justifyContent: "center",
    },
})