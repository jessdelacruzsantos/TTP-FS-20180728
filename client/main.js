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
                transactions:[],
            },
            stocks:{},
            stockQuotes:{},
        }

        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.updateBalance = this.updateBalance.bind(this)
        this.stocksObject = this.stocksObject.bind(this)
        this.longPollingQuotes = this.longPollingQuotes.bind(this);
    }
    async longPollingQuotes() {
        let symbols = Object.keys(this.state.stocks)


        if(symbols.length) {
            let {data} = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote&filter=open,latestPrice`)
            this.setState({
                stockQuotes: data 
            }, () => {
                setTimeout(()=> {
                    this.longPollingQuotes()
                })
            }, 10000)
        } else {
            setTimeout(()=> {
                this.longPollingQuotes()
            }, 10000)
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
                <Switch>
                    <Route path={'/portfolio'} render={ (props) => (<PortfolioPage longPoll={this.longPollingQuotes} stocks={this.state.stocks}user={this.state.user} stockQuotes={this.state.stockQuotes}updateBalance={this.updateBalance}{...props}/>)}/>
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
