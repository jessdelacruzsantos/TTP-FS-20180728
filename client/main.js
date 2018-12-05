import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import Navbar from './navbar'
import AuthState from './authState';
import AuthForm from './authForm'
import PortfolioPage from './portfolioPage'
import Transactions from './transactions';

const SignUp = AuthState(AuthForm)
const LogIn = AuthState(AuthForm)


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user : {
                balance:0,
                id:0,
                transactions:[],
            },
            stocks:{},
            stockQuotes:{},
        }

        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
        this.stocksObject = this.stocksObject.bind(this)
        this.updatePrices = this.updatePrices.bind(this);
    }

    async componentDidMount() {
        try{   
            let {data} = await axios.get('auth/me')
            let stocks = this.stocksObject(data.transactions)
            let symbols = Object.keys(stocks)
            let quotes = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote&filter=open,latestPrice`)
            this.setState({
                isLoggedIn:true, 
                user:data, 
                stocks,
                stockQuotes: quotes.data})
            
        }catch(error) {
            console.log(error)
        }
        

    }
    async updatePrices() {
        let symbols = Object.keys(this.state.stocks)

        if(symbols.length) {
            let {data} = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote&filter=open,latestPrice`)
            this.setState({
                stockQuotes: data 
            })
        } 
    }

    stocksObject(transactions) {
        let stocks = {}

        transactions.forEach((tran) => {
            if(!stocks[tran.ticker]) {
                stocks[tran.ticker] = tran.quantity
            } else {
                stocks[tran.ticker] += tran.quantity
            }
        })
        return stocks
    }

    async updateBalance(transaction){
        let {ticker,quantity,stockPrice} = transaction

        let cost = stockPrice * quantity * 100
        let balance = this.state.user.balance - cost
        let newQuantity = this.state.stocks[transaction.ticker]? this.state.stocks[transaction.ticker]  + transaction.quantity : transaction.quantity

        let {data} = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote&filter=open,latestPrice`)
        this.setState(
            {
                user:{
                    ...this.state.user,
                    balance,
                    transactions:[...this.state.user.transactions, transaction],
                },
                stocks:{...this.state.stocks, [ticker]: newQuantity},
                stockQuotes: {...this.state.stockQuotes, [ticker]: data[ticker]}
            }
        )
    }

    async logIn(email, password) {
        try {
            let {data} =  await axios.post('/auth/login', {email,password})
            let stocks = this.stocksObject(data.transactions)
            let symbols = Object.keys(stocks)
            let quotes = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote&filter=open,latestPrice`)
            this.setState({
                isLoggedIn:true, 
                user:data, stocks,
                stockQuotes: quotes.data})
        } catch(error) {
            console.log(error)
        }
    }

    async signUp(email, password) {
        try {
            let {data} =  await axios.post('/auth/signup', {email,password})
            this.setState({
                isLoggedIn:true, 
                user: {...data, transactions: []},
            })
        }catch(erro) {
            console.log(error)
        }
    }

    render() {
        return (<Switch>
            {this.state.isLoggedIn && (
                <React.Fragment>
                    <Navbar/>
                    <Switch>
                        <Route path={'/portfolio'} render={ (props) => (<PortfolioPage updatePrices={this.updatePrices} stocks={this.state.stocks}user={this.state.user} stockQuotes={this.state.stockQuotes}updateBalance={this.updateBalance}{...props}/>)}/>
                        <Route path={'/transactions'} render={(props)=> <Transactions transactions={this.state.user.transactions} {...props}/>}/>
                        <Redirect to={'/portfolio'}/>
                    </Switch>
                </React.Fragment>
            )}
            <Route path={'/signup'} render={ (props) => (
                <SignUp 
                    instruct={'Create an Account With Us!'} 
                    buttName={'Sign Up'}
                    message={'Already have an account with us?'}
                    link={'/login'}
                    linkName={'Log In'}
                    onSubmission={this.signUp}
                    {...props}
                 />
            )} />
            <Route render={ (props) => (
                <LogIn 
                    instruct={'Log In to your Account!'} 
                    buttName={'Log In'}
                    message={'Create an account with us?'}
                    link={'/signup'}
                    linkName={'Sign UP'}
                    onSubmission={this.logIn} 
                    {...props} 
                />) 
            }/>
        </Switch>)
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
     document.getElementById('app'));
