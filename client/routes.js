import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import {NavBar,AuthForm,AuthState,PortfolioPage,Transactions, Loader} from './index'
const Auth= AuthState(AuthForm)



class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stocks:{},
            transactions: [],
            balance:0,
        }

        this.makeTransaction = this.makeTransaction.bind(this)
        this.stocksObject = this.stocksObject.bind(this)
    }

    async componentDidMount() {
        // Loads user's info
        let {data} = await axios.get('/api/user/transactions')
        let transactions = Array.isArray(data) ? data : []
 
        let stocks = this.stocksObject(data)

        this.setState({
            transactions,
            stocks,
        })
    }

    stocksObject(transactions) {
        console.log(transactions)
        let stocks = {}

        if(Array.isArray(transactions)) {
            transactions.forEach((tran) => {
                if(!stocks[tran.ticker]) {
                    stocks[tran.ticker] = tran.quantity
                } else {
                    stocks[tran.ticker] += tran.quantity
                }
            })
        }

        return stocks
    }

    async makeTransaction(ticker,quantity){
        let prevStocks = this.state.stocks
        let prevTrans = this.state.transactions
        let {data} = await axios.post(`/api/user/transactions`, {ticker,quantity})
        let {balance, transaction} = data
        let newQuantity = prevStocks[transaction.ticker] + transaction.quantity

        this.setState({
            balance,
            transactions:[...prevTrans,transaction],
            stocks:{...prevStocks, [transaction.ticker]:newQuantity}

        })
    }

    
    render() {
        if(this.props.isLoading) {
            return <Loader height={'100vh'}/>
        } else {
            return (
                <Switch>
                    {this.props.isLoggedIn && (
                        <React.Fragment>
                            <NavBar logOut={this.props.logOut}/>
                            <Switch>
                                <Route path={'/portfolio'} render={ (props) => (
                                    <PortfolioPage 
                                        updatePrices={this.updatePrices} 
                                        stocks={this.state.stocks} 
                                        makeTransaction={this.makeTransaction}
                                        user={this.props.user}
                                        {...props}
                                    />)}
                                />
                                <Route path={'/transactions'} render={(props)=> (
                                    <Transactions 
                                        transactions={this.state.transactions} 
                                        {...props}
                                    />)}
                                />
                                <Redirect to={'/portfolio'}/>
                            </Switch>
                        </React.Fragment>
                    )}
                    <Route path={'/signup'} render={ (props) => (
                        <Auth
                            instruct={'Create an Account With Us!'} 
                            buttName={'Sign Up'}
                            message={'Already have an account with us?'}
                            link={'/login'}
                            linkName={'Log In'}
                            onSubmission={this.props.signUp}
                            {...props}
                        />
                    )} />
                    <Route render={ (props) => (
                        <Auth
                            instruct={'Log In to your Account!'} 
                            buttName={'Log In'}
                            message={'Create an account with us?'}
                            link={'/signup'}
                            linkName={'Sign UP'}
                            onSubmission={this.props.logIn} 
                            {...props} 
                        />) 
                    }/>
                </Switch>)
        }
    }
}

export default Routes
