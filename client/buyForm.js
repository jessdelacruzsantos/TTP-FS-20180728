import React, {Component} from 'react'
import axios from 'axios'
import { Button, Form, Statistic}from 'semantic-ui-react'

class BuyForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            ticker:'',
            quantity:'',

        }
        this.handleChange = this.handleChange.bind(this)
        this.purchaseStock = this.purchaseStock.bind(this);
    }

    async purchaseStock(event){
        event.preventDefault()
        try{
            let {ticker,quantity} = this.state
            console.log({ticker,quantity})
            let {data} = await axios.post(`/api/user/${this.props.userId}/purchase`, {ticker,quantity})
            this.props.updateBalance(data)
            this.setState({
                ticker:'',
                quantity:''
            })
        }catch(error){
            console.log(error)
        }
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Statistic horizontal>
                    <Statistic.Label>Account Balance:</Statistic.Label>
                    <Statistic.Value>{`$${this.props.balance}`} </Statistic.Value>
                 </Statistic>
                <Form onSubmit={this.purchaseStock}>
                <Form.Field>
                    <input placeholder='Ticker Symbol' name='ticker' value={this.state.ticker} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Whole Number of Shares' name='quantity' value={this.state.quantity} onChange={this.handleChange}/>
                </Form.Field>
                <Button type='submit'>Buy</Button>
                </Form>
            </React.Fragment>
          )
    }
}

export default BuyForm