import React, {Component} from 'react'
import axios from 'axios'

const styles = {
    div:{
        display:'flex', 
        flexDirection:'column'
    },
    form:{
        display:'flex', 
        flexDirection:'column',
        width:'80%',
         margin:'auto'
        }
}

class BuyForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            ticker:'',
            quantity:0,

        }
        this.handleChange = this.handleChange.bind(this)
        this.purchaseStock = this.purchaseStock.bind(this);
    }
    async purchaseStock(event){
        event.preventDefault()

        try{
            let {ticker,quantity} = this.state
            let {data} = await axios.post(`/api/user/${this.props.userId}/purchase`, {ticker,quantity})
            this.props.updateBalance(data)
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
            <div style={styles.div}>
                <form style={styles.form} onSubmit={this.purchaseStock}>
                    <input name={'ticker'} placeholder={'Ticker'} onChange={this.handleChange}></input>
                    <input name={'quantity'} placeholder={'Quantity'} onChange={this.handleChange}></input>
                    <button type ='submit' name='buy' placeholder='buy'>Buy</button>
                </form>
            </div>
        )
    }
}

export default BuyForm