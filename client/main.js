import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import SignIn from './signIn'
import PortfolioPage from './portfolioPage'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user : {
                balance:0,
                id:0,
                stocks:[],
                transactions:[],
            },
        }

        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
    }

    updateBalance(transaction){
        let {type,quantity,stockPrice} = transaction

        let cost = stockPrice * quantity * 100
        let balance = this.state.user.balance - cost
        console.log(balance, cost, stockPrice)
        this.setState({user:{
            balance,
            transactions:[...this.state.user.transactions, transaction]
        }})
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
        console.log(this.state)
        return (<Switch>
            {this.state.isLoggedIn && (
                <Switch>
                    <Route path={'/portfolio'} render={ (props) => (<PortfolioPage user={this.state.user} updateBalance={this.updateBalance}{...props}/>)}/>
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
