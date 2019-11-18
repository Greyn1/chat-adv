import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from './Homepage';
import { observer } from 'mobx-react';
import GroupChat from './GroupChat';
import AddMem from './AddMem';
import './App.css';
import ParticleComponent from './ParticleComponent';

@observer
class App extends Component {
    render() {
        return (
            <Router>
              <div className="App">
                <ParticleComponent/>
                <div className="App">
                  <Route exact path='/' component={Homepage} />
                  <Route exact path='/chat/:id' component={GroupChat} />
                  <Route exact path='/chat/:id/invite' component={AddMem} />
                </div>
              </div>
            </Router>
        );
    }
}

export default App;