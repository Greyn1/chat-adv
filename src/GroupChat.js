import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from './Store'; 
import fire from './fire';
import './Homepage.css';

@observer
class GroupChat extends Component {
    constructor(props){
        super(props);
        this.state={
            Gname:null,
            message:null
        }
    }

    componentDidMount(){
        var id = this.props.match.params.id
        fire.database().ref('groups/' + id).once('value')
            .then(snapshot => {
                this.setState({
                     Gname:snapshot.val().GrpName     
                })
            })
            .catch(err => {
                console.log('could not find user', err)
            })

        var chatBox = document.getElementById('chatBox');
        fire.database().ref('groups/' + id + '/messages').on('child_added', (snapshot) => {
            var chat = snapshot.val();
            chatBox.innerHTML += `<p>${chat.body} -by ${chat.author}</p>`
        })
    }

    _sendMsg(){
        var id = this.props.match.params.id
        var msg=document.getElementById("inputmsg").value
        fire.database().ref('groups/' + id + '/messages').push().set({
            body: msg,
            author: store.curuser.displayName
        })
        // this.setState({
        //     message:msg
        // })
        inputmsg.value='';
    }

    render() {
        var id = this.props.match.params.id
        return (
            <div>
                <div className='header'>
                    <h1 style={{ margin: 'auto 0' }}>{this.state.Gname}</h1>
                    <Link id="link" to="/">Home</Link>
                    <Link id="link" to={`/chat/${id}/invite`}>Invite</Link>
                </div>
                <div id="chatBox"></div>
                <div id="btm">
                    <input type="text" placeholder="enter your message" id='inputmsg'></input>
                    <button onClick={() => this._sendMsg()}>Send</button>
                </div>
            </div>
        );
    }
}

export default GroupChat;