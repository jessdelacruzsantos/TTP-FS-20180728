import React from 'react'
import { Table } from 'semantic-ui-react'

const Transactions = ({transactions}) => {
    return (
        <Table striped style={{marginTop:'10vh'}}>
            <Table.Header >
                <Table.Row>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Stock</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {transactions.map(createRows)}
            </Table.Body>
        </Table>
    )
}
function createRows(transaction) {
    return (
        <Table.Row key={transaction.id}>
            <Table.Cell>{transaction.type}</Table.Cell>
            <Table.Cell>{transaction.ticker}</Table.Cell>
            <Table.Cell>{transaction.quantity}</Table.Cell>
            <Table.Cell>{transaction.stockPrice}</Table.Cell>
            <Table.Cell>{transaction.createdAt.substring(0,10)}</Table.Cell>
        </Table.Row>
    )
}

export default Transactions

    