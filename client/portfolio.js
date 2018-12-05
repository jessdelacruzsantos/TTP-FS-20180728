import React from 'react'
import { Table, Statistic,Loader} from 'semantic-ui-react'

const Portfolio= (props) => {
    let symbols = Object.keys(props.stocks)
    return  (
        <React.Fragment>
            <Statistic horizontal size='small'> 
                <Statistic.Label>Portfolio</Statistic.Label>
                <Statistic.Value>{`($${props.totalValue})`}</Statistic.Value>
            </Statistic>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell  style={{color:'#009c95'}}>Stock</Table.HeaderCell>
                        <Table.HeaderCell  style={{color:'#009c95'}}>Quantity</Table.HeaderCell>
                        <Table.HeaderCell  style={{color:'#009c95'}}>Current Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            
                <Table.Body>
                    {symbols.map( symbol => {
                        let {open, latestPrice} = 
                        props.stockQuotes[symbol] ? 
                        props.stockQuotes[symbol].quote : {open:0, latestPrice:0}
                        return (
                            <Table.Row key={symbol}>
                                <Table.Cell>{symbol}</Table.Cell>
                                <Table.Cell>{props.stocks[symbol]}</Table.Cell>
                                <Table.Cell 
                                    positive={latestPrice > open } 
                                    negative={latestPrice < open }
                                >
                                    {latestPrice ? (latestPrice * props.stocks[symbol]).toFixed(2) : <Loader size='small' active inline />}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </React.Fragment>
    )
    
}

export default Portfolio