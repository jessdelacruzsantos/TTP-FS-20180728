import React, { Component} from 'react'

class SignIn extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            email:'',
            password:'',
            returning: true,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()    
        this.props.logIn(this.state.email, this.state.password)
    }
    handleSignUp(event) {
        if(this.state.email !== '' && this.state.password !== '') {
            this.props.signUp(this.state.email, this.state.password)
        } else {
            alert('NotValid')
        }
        
    }

    render() {
        return (
            <React.Fragment>
            <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection:'column'}}>
                <label> 
                    {'Email: '}
                    <input name={'email'} onChange={this.handleChange}></input>
                </label>
                <label>
                    {'Password: '}
                    <input name={'password'} onChange={this.handleChange}></input>
                </label>
                    <button name='LogIn' type='submit'></button>
                    <button name='SignUp' type='button' onClick={this.handleSignUp}></button>
            </form>
            </React.Fragment>
        )
    }
}

export default SignIn