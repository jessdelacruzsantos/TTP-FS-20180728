import React, {Component} from 'react'
import BuyForm from './buyForm'

class PortfolioPage extends Component {
    constructor(props) {
        super(props) 
    }

    render() {
        console.log(this.props.user.balance)
        return (
            <React.Fragment>
            <h1 style={{height: '10vh', width:'100vw'}}>Portfolio! (Value)</h1>
            <div style={{display:'flex'}}>
                <div style={{overflow:'hidden',height: '90vh', width:'100vw', background:'blue'}}>
                </div>
                <div style={{overflow:'hidden',height: '90vh', width:'100vw'}}>
                    <h1 style={{margin: 'auto'}}>Balance: ${this.props.user.balance / 100.00}</h1>
                    <BuyForm userId={this.props.user.id} updateBalance={this.props.updateBalance}/>
                </div>
            </div>

            </React.Fragment>
            
        )
    }
}

export default PortfolioPage