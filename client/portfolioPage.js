import React, {Component} from 'react'
import BuyForm from './buyForm'
import Portfolio from './portfolio'

class PortfolioPage extends Component {
    constructor(props) {
        super(props) 
    }
    componentDidMount() {
        this.props.longPoll()
    }

    render() {
        let totalValue = Object.keys(this.props.stocks).reduce((acc, stockSymbol) => {
            return acc + (this.props.stocks[stockSymbol] * this.props.stockQuotes[stockSymbol].quote.latestPrice)
        },0)
        return (
            <React.Fragment>
            <h1 style={{height: '10vh', width:'100vw'}}>Portfolio! {totalValue}</h1>
            <div style={{display:'flex'}}>
                <div style={{overflow:'hidden',height: '90vh', width:'100vw'}}>
                    <Portfolio stocks={this.props.stocks} stockQuotes={this.props.stockQuotes}/>
                </div>
                <div style={{overflow:'hidden',height: '90vh', width:'100vw'}}>
                    <h1 style={{margin: 'auto'}}>Balance: ${this.props.user.balance / 100.00}</h1>
                    <BuyForm userId={this.props.user.id} updateBalance={this.props.updateBalance}/>
                </div>
            </div>

            </React.Fragment>
            
        )
    }
}

export default PortfolioPage