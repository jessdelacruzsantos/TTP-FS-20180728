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
            hasLoaded:false,
            validInput:true
        }

        this.makeTransaction = this.makeTransaction.bind(this)
        this.stocksObject = this.stocksObject.bind(this)
    }
    async componentDidUpdate(prevProps) {
        if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
            // Loads data after user has signed in
            let {data} = await axios.get('/api/user/transactions')
            let transactions = Array.isArray(data) ? data : []
            let stocks = this.stocksObject(data)

            this.setState({
                transactions,
                stocks,
                balance: this.props.user.balance,
                hasLoaded: true
            }) 
        } 
    }

    stocksObject(transactions) {
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
        try{
            let prevStocks = this.state.stocks
            let prevTrans = this.state.transactions
            let {data} = await axios.post(`/api/user/transactions`, {ticker,quantity})
            let {balance, transaction} = data
            let newQuantity = (prevStocks[transaction.ticker] || 0) + transaction.quantity
    
            this.setState({
                balance,
                transactions:[...prevTrans,transaction],
                stocks:{...prevStocks, [transaction.ticker]:newQuantity},
                validInput: true
            })
        } catch(error) {
            console.log(error, 'Something went wrong')
            this.setState({validInput:false})
        }   
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
                                        validInput={this.state.validInput}
                                        updatePrices={this.updatePrices} 
                                        stocks={this.state.stocks} 
                                        makeTransaction={this.makeTransaction}
                                        user={this.props.user}
                                        balance={this.state.balance}
                                        hasLoaded={this.state.hasLoaded}
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
