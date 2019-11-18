import React, { Component } from 'react';
import { observer } from 'mobx-react';
import fire from './fire';
import firebase, { app } from 'firebase';
import store from './Store';
import './Loginpage.css';

@observer
class Loginbtn extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log('loginBtn component mounted')
        // console.log(store.id)
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                store.isLoggedin=true;
                store.curuser=user; 
                fire.database().ref('users').orderByKey().equalTo(store.curuser.uid).on("value", (snapshot) => {                   
                    if (snapshot.val() == null) {
                        fire.database().ref('/users/').child(store.curuser.uid).set({
                            name: store.curuser.displayName,
                            email: store.curuser.email                      
                        });
                    }
                });                
                
            } else {
                store.isLoggedin=false;
                store.curuser=null;
            }        
        })
    }

    _signIn() {
        
        var provider = new firebase.auth.GoogleAuthProvider();
        fire.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token)
            var user = result.user;
            console.log(user)
        }).catch(function (error) {
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });   
    }
    
    render() {
        return (
            <div className="login">
                <h1 className="heading">Chat-X</h1>
                <br />
                <button onClick={() => this._signIn()}>Sign In</button>
            </div>
        );
    }
}
export default Loginbtn;