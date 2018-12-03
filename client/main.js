import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
        }
    }

    render() {
        if(this.state.isLoggedIn) {
            return (<h1>Welcome back</h1>)
        } else {
            return (<h1>I don't know you</h1>)
        }
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
