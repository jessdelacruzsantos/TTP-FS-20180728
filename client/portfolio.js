import React, {Component} from 'react'

class Portfolio extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let symbols = Object.keys(this.props.stocks)
        return(
            <ul> 
                {symbols.map( symbol => {
                    let {open, latestPrice} = this.props.stockQuotes[symbol] ? this.props.stockQuotes[symbol].quote : {open:0, latestPrice:0}
                    let color = latestPrice === open ? 'gray' : latestPrice > open ? 'green' : 'red'

                    return (
                        <li key={symbol} style={{display:'flex'}}>
                            <h3>Stock: {symbol} Quantity: {this.props.stocks[symbol]} Price: </h3> <h3 style={{color}}> {latestPrice}</h3>
                        </li>)
                })}
            </ul>
        )
    }
}

export default Portfolio