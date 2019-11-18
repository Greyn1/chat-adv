import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import firebase, { app } from 'firebase';
import fire from './fire';
import store from './Store';
import './Groups.css';

@observer
class Groups extends Component {
    constructor(props){
        super(props);
        this.state={
            key:null,
            isLoading:false
        }
    }

    componentDidMount(){
        this.setState({isLoading:true})
        console.log(this.state.isLoading)
        console.log('group component mounted')
        fire.database().ref("groups").on("value", (snapshot) => {
             // let val = snapshot.val();
             // console.log(val)
            store.groupNames.length=0;
            console.log('length made zero')
            snapshot.forEach((childSnapshot)=>{   
                var childKey = childSnapshot.key;
                console.log(childKey);            
                var childData = childSnapshot.val().GrpName;
                fire.database().ref('groups/' + childKey + '/members').once('value',(snap)=>{
                    snap.forEach((childsnap)=>{
                        var per = childsnap.val().person
                        if(per == store.curuser.uid){
                            store.groupNames.push({
                                name: childData,
                                id: childKey
                            })
                        }
                    })
                })
                // store.groupNames.push({
                //     name: childData,
                //     id: childKey
                // })
                console.log('pushed in array from firebase')       
            })
            console.log('inside snapshot')
            this.setState({ isLoading: false })
            console.log('state changed')
            console.log(this.state.isLoading)
        })
    }

    _saveGrp() {
        console.log('group sent to firebase')
        var placehol = document.getElementById('inputbox').value;
        var myRef = fire.database().ref('/groups').push();
        var key = myRef.key;
        myRef.set({
            // owner: store.curuser.uid,
            GrpName: placehol
        })
       fire.database().ref('groups/' + key + '/members').push({
        person:store.curuser.uid
       })
        store.addGrp = false;
        // console.log(this.state.key)
    }

    render() {
        const {isLoading} = this.state
        
        return (
            <div className="maindiv">
                <div className="divone">
                    {
                        store.addGrp ?
                            <div>
                                <input type="text" placeholder="enter group name" id='inputbox'></input>
                                <button onClick={() => this._saveGrp()}>Save</button>
                            </div>
                            :
                            <button onClick={() => store.addGrp = true}>Add Group</button>
                    }
                </div>
                <div>
                    {
                        isLoading ? <p>Loading....</p>
                        :
                            <div>
                                {
                                    (store.groupNames.length != 0) ?
                                        <div>
                                            {
                                                store.groupNames.map((v) =>
                                                    <div className="groupnames">
                                                        <Link className="links" to={`/chat/${v.id}`}>{v.name}</Link>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default Groups;