import React from 'react'
import { Icon, Table } from 'semantic-ui-react'

const Portfolio= (props) => {
    let symbols = Object.keys(props.stocks)
    return  (
        <Table>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='12' >Total Value: ${props.totalValue}</Table.HeaderCell>
             </Table.Row>
        </Table.Header>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Current Price</Table.HeaderCell>
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
                        <Table.Cell>{
                            props.stocks[symbol]}</Table.Cell>
                        <Table.Cell positive={latestPrice > open } negative={latestPrice < open }>{latestPrice}</Table.Cell>
                    </Table.Row>
                )
            })}
          </Table.Body>
        </Table>
    )
    
}

export default Portfolio