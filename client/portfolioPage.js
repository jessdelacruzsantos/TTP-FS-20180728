import React, {Component} from 'react'
import BuyForm from './buyForm'
import Portfolio from './portfolio'

class PortfolioPage extends Component {
    constructor(props) {
        super(props) 
    }
    
    componentDidMount() {
        this.getPrices = setInterval(()=> {
            this.props.updatePrices()
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.getPrices)
    }

    render() {
        let totalValue = Object.keys(this.props.stocks).reduce((acc, stockSymbol) => {
            return acc + (this.props.stocks[stockSymbol] * this.props.stockQuotes[stockSymbol].quote.latestPrice)
        },0)
        // let totalOpening = Object.keys(this.props.stocks).reduce((acc, stockSymbol) => {
        //     return acc + (this.props.stocks[stockSymbol] * this.props.stockQuotes[stockSymbol].quote.open)
        // },0)
        return (
            <React.Fragment>
                <div style={{display:'flex', marginTop:'10vh'}}>
                    <div style={{overflow:'hidden',height: '90vh', width:'40vw',marginLeft:'5vw',marginRight:'2.5vw'}}>
                        <Portfolio stocks={this.props.stocks} stockQuotes={this.props.stockQuotes} totalValue={Math.round(totalValue)}/>
                    </div>
                    <div style={{overflow:'hidden',height: '90vh', width:'40vw', marginLeft:'2.5vw', marginRight:'5vw'}}>
                        <BuyForm userId={this.props.user.id} updateBalance={this.props.updateBalance} balance={Math.round(this.props.user.balance) / 100.00}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



export default PortfolioPage