import React, {Component} from 'react'
import { Button, Form, Statistic, Message}from 'semantic-ui-react'

class BuyForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            ticker:'',
            quantity:'',

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault()
        try{
            let {ticker,quantity} = this.state
            this.props.makeTransaction(ticker,quantity)
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
                <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <input placeholder='Ticker Symbol' name='ticker' value={this.state.ticker} onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <input placeholder='Whole Number of Shares' name='quantity' value={this.state.quantity} onChange={this.handleChange}/>
                </Form.Field>
                {
                    !this.props.validInput && 
                    (<Message negative>
                        <Message.Header>Your Input is invalid</Message.Header>
                    </Message>)
                }
                <Button type='submit'>Buy</Button>
                </Form>
            </React.Fragment>
          )
    }
}

export default BuyForm