import React, {Component} from 'react'

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
        this.handleBuy = this.handleBuy.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleBuy(event) {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div style={styles.div}>
                <form style={styles.form} onSubmit={this.handleBuy}>
                    <input name={'ticker'} placeholder={'Ticker'} onChange={this.handleChange}></input>
                    <input name={'quantity'} placeholder={'Quantity'} onChange={this.handleChange}></input>
                    <button name='buy' placeholder='buy'>Buy</button>
                </form>
            </div>
        )
    }
}

export default BuyForm