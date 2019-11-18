import React, { Component } from 'react';
import fire from './fire';

class AddMem extends Component {
    constructor(props){
        super(props);
        this.state={
            members:[]
        }
    }

    componentDidMount(){
        var id = this.props.match.params.id
        fire.database().ref('users').once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData=childSnapshot.val().name
                console.log(childKey);
                fire.database().ref('groups/' + id + '/members')
                .orderByChild('person').equalTo(childKey).on("value", (snap) => {
                    if (snap.val() == null) {
                        this.setState(prevState => ({
                            members: [...prevState.members, {
                                "key":childKey,
                                "name":childData
                            }]
                        }))
                    }
                }); 
            })
        })
    }

    handleclick(e){
        console.log(e)
    }

    _addMember(e){
        var id = this.props.match.params.id
        fire.database().ref('groups/' + id + '/members').push().set({
            person:e
        }).then(()=>{
            alert('member added successfully')
        })
    }
   
    render() {
        return (
            <div>
                {
                    (this.state.members.length != 0) ?
                        <div>
                            {
                                this.state.members.map((v) =>
                                    <div>
                                        <h2 style={{width:'30%'}} onClick={()=>this.handleclick(v.key)}>{v.name}</h2>
                                        <a href="#" onClick={()=>this._addMember(v.key)}>Add Member</a>
                                        <hr />
                                    </div>
                                )
                            }
                        </div>
                        :
                        null
                }           
             </div>
        );
    }
}

export default AddMem;