import React from 'react';
import { StyleSheet, Text, View, Image, 
        TextInput, StatusBar, FlatList,
        KeyboardAvoidingView, AsyncStorage,
        TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import User from '../User';
import firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button";

// export default class HomeScreen extends React.Component{
//     static navigationOptions = {
//         header: null
//     }
    
//     state = {
//         users: [],
//         dbRef: firebase.database().ref('users')
//     }

//     componentDidMount(){
//         this.state.dbRef.on('child_added'), (val) => {
//             let person = val.val();
//             person.email = val.key;
//             if(person.email === User.email){
//                 User.name = person.name;
//             }else{
//                 this.setState( (prevState) => {
//                     return {
//                         users: [...prevState.users, person]
//                     }
//                 })
//             }
//         }
//     }


//     signOut = async () => {
//         await AsyncStorage.clear();
//         this.props.navigation.navigate('Auth');
//     }

//     renderRow = ({item}) => {
//         return(
//             <TouchableOpacity>
//                 onPress={()=> this.props.navigation.navigate('Chat', item)}
//                 <Text>{item.name}</Text>
//             </TouchableOpacity>
//         )
//     }

//     render(){
//         const {height} = Dimensions.get('window');
//         return(
//             <SafeAreaView>

//                 <FlatList 
//                     data={this.state.users}
//                     renderItem={this.renderRow}
//                     keyExtractor={(item) => item.email} 
//                     ListHeaderComponent = { () => <Text> Chat List </Text>} />

//                 <TouchableOpacity onPress={this.signOut}>
//                     <Text style = {home.logout}>Logout</Text>
//                 </TouchableOpacity>

//             </SafeAreaView>
//         )
//     }
//     // state = {
//     //     name: ""
//     // }
//     // contine = () => {
//     //     this.props.navigation.navigate("Chat", {name: this.state.name})
//     // }
//     // render(){
//     //     return(
//     //         <View style={styles.container}>
//     //             <View style = {styles.circle} /> 

//     //             <View style={{ marginHorizontal: 32}}>
//     //                 <Text style={styles.header}>Username</Text>
//     //             </View>
//     //         </View>
//     //     );
//     // }//end of render
// }

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
                style={{ padding:10, borderBottomColor:'#ccc', borderBottomWidth: 1}} > 
                <Text style = {{fontSize: 20}}> {item.username} </Text>
            </TouchableOpacity>
        )
    }
    render(){
        return(
            <SafeAreaView style = {home.backgrd}>
                <FlatList 
                    ListHeaderComponent = { () => <Text style={home.listStart}> Users Chat List </Text>} 
                    data={this.state.users} 
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.email} 
                />

                {/* <TouchableOpacity onPress={this.signOut}>
                    <Text style = {home.signout}> Logout </Text>
                </TouchableOpacity> */}

            <View style = {home.signout} >
                <AwesomeButton
                textColor= "#000000"
                backgroundColor= "#5ce1e6"
                onPress = {() => this.props.navigation.navigate('DisplayProfile')}
                >Go to Profile
                </AwesomeButton>



                <TouchableOpacity >
                    <View style = {home.signout}>
                        <AwesomeButton
                            textColor= "#000000"
                            backgroundColor= "#5ce1e6"
                            onPress={this.signOut}
                        >Logout
                        </AwesomeButton>
                    </View>
                </TouchableOpacity>
                
                </View>


            </SafeAreaView>
        )
    }
}
const home = StyleSheet.create({
    backgrd:{
        backgroundColor: "#f285b2"
    },
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
    signout: {
        textAlign: "center",
        fontSize: 20,
        color: 'blue',
        margin: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
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