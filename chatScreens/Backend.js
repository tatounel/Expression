//CHAT #Latest https://www.youtube.com/watch?v=SAOdQRK5K20

/* Links with globalChat */

import firebase from 'firebase';

class Backend{
    uid = "";
    messagesRef = null;
    constructor(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setUid(user.uid);
            }else{
                firebase.auth().signInAnonymously()
                .catch(error => {
                    alert (error.message);
                });
            }
        });
    }//end of constructor

    setUid(value){
        this.uid=value;
    }
    getUid(){
        return this.uid;
    }
    //retrieve msgs from Backend
    loadMessages(callback){
        this.messagesRef = firebase.database().ref("messages");
        this.messagesRef.off();
        const onReceive = data => {
            const message = data.val();
            callback({
                id:data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    id: message.user.id,
                    name:message.user.name
                }
            });
        };
        this.messagesRef.limitToLast(20).on("child_added", onReceive);
    }
    //send msgs to Backend
    sendMessage(message){
        for( let i = 0; i < message.length; i++){
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
    }//end of sendmsg
    //close connection to Backend
    closeChat(){
        if(this.messagesRef){
            this.messagesRef.iff();
        }
    }
}

export default new Backend();