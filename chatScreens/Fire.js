import firebase from 'firebase';

class Fire {
    constuctor() {
        this.init();
        this.checkAuth();
    }

    init = () => {
        //initializes app
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyAHRc_frl-Xsl-tDSA1OIzPI8XAr-3Ktuw",
                authDomain: "expression-7b3be.firebaseapp.com",
                databaseURL: "https://expression-7b3be.firebaseio.com",
                projectId: "expression-7b3be",
                storageBucket: "expression-7b3be.appspot.com",
                messagingSenderId: "464293562691",
                appId: "1:464293562691:web:cf42e840966fad87af87f6",
                measurementId: "G-JKW903VLLG"
            });
        }
    };

    // checkAuth = () => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if(!user){
    //             firebase.auth().signInWithPhoneNumber();
    //         }
    //     });
    // };

    checkAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().sign
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                user: item.user,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            this.db.push(message);
        })
    };

    parse = message => {
        const { user, text, timestamp } = message.val()
        const { key: _id } = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref('messages');
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();

