import React, {Component} from 'react'

import {Portfolio,Loader, BuyForm} from './index'
import axios from 'axios'

class PortfolioPage extends Component {
    constructor(props) {
        super(props) 
        this.state={
            stockQuotes:{},
        }
      this.updatePrices = this.updatePrices.bind(this)
    }
    
    componentDidMount() {
        // Navigating back to the page
        if(this.props.hasLoaded) {
            this.updatePrices()
            this.getPrices = setInterval(()=> {
                this.updatePrices()
            }, 1000)
        }
    }

    componentDidUpdate(prevProps) {
        // Initial load of Portfolio
        if( (prevProps.hasLoaded !== this.props.hasLoaded) ) {
            this.updatePrices()

            this.getPrices = setInterval(()=> {
                this.updatePrices()
            }, 1000)
        }
    }

    componentWillUnmount(){
        // Clears the setInterval once the component unmounts
        clearInterval(this.getPrices)
    }

    async updatePrices() {
        let symbols = Object.keys(this.props.stocks)
        if(symbols.length){
            let {data} = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote&filter=open,latestPrice`)
            this.setState({
                stockQuotes:data,
            })
        } else if (!this.state.hasLoaded){
            this.setState({hasLoaded: true})
        }
    }

    render() {
  
        let totalValue = Object.keys(this.props.stocks).reduce((acc, stockSymbol) => {
            if(this.state.stockQuotes[stockSymbol]) {
                return acc + (this.props.stocks[stockSymbol] * this.state.stockQuotes[stockSymbol].quote.latestPrice * 100)
            } else {
                return acc
            }
            
        },0)
        return (
            <React.Fragment>
                <div style={{display:'flex', marginTop:'10vh'}}>
                    <div style={{overflow:'hidden',height: '75vh', width:'40vw',marginLeft:'5vw',marginRight:'2.5vw'}}>
                    {
                        this.props.hasLoaded ? 
                            <Portfolio 
                                stocks={this.props.stocks} 
                                stockQuotes={this.state.stockQuotes} 
                                totalValue={Math.round(totalValue) / 100}
                            /> 
                            : <Loader height={'100vh'}/>
                        }
                    </div>
                    <div style={{overflow:'hidden',height: '90vh', width:'40vw', marginLeft:'2.5vw', marginRight:'5vw'}}>
                        <BuyForm 
                            validInput={this.props.validInput}
                            userId={this.props.user.id} 
                            makeTransaction={this.props.makeTransaction} 
                            balance={Math.round(this.props.balance) / 100.00}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



export default PortfolioPage