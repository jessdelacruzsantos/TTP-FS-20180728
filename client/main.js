import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import SignIn from './signIn'
import Portfolio from './portfolio'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user : {},
        }

        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    async logIn(email, password) {
        try {
            let {data} =  await axios.post('/auth/login', {email,password})
            this.setState({isLoggedIn:true, user:data})
        } catch(error) {
            console.log(error)
        }
    }

    async signUp(email, password) {
        try {
            let {data} =  await axios.post('/auth/signup', {email,password})
            console.log(data)
            this.setState({isLoggedIn:true, user:data})
        }catch(erro) {
            console.log(error)
        }
    }


    render() {
        return (<Switch>
            {this.state.isLoggedIn && (
                <Switch>
                    <Route path={'/portfolio'} component={Portfolio}/>
                    <Redirect to={'/portfolio'}/>
                </Switch>
            )}
            <Route render={ (props) => (<SignIn logIn={this.logIn} signUp={this.signUp} {...props} />) }/>
        </Switch>)
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
     document.getElementById('app'));
