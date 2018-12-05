import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, withRouter} from 'react-router-dom'
import {Routes} from './components'
import axios from 'axios'


class App extends Component{
    constructor(props) {
        super(props) 
        this.state ={
            isLoading: true,
            isLoggedIn: false,
            user:{}
        }

        this.logOut = this.logOut.bind(this)
        this.logIn = this.logIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }
    async componentDidMount() {
        try{   
            let {data} = await axios.get('auth/me')
            this.setState({
                isLoading: false,
                isLoggedIn: !!data.id, 
                user: data || {}, 
            })
        }catch(error) {
            console.log(error)
        }
    }

    async logIn(email, password) {
        try {
            let {data} =  await axios.post('/auth/login', {email,password})
            this.setState({
                isLoggedIn:!!data.id, 
                user: data, 
            })
        } catch(error) {
            console.log(error)
        }
    }

    async signUp(email, password) {
        try {
            let {data} =  await axios.post('/auth/signup', {email,password})
            this.setState({
                isLoggedIn:!!data.id, 
                user: data,
            })
        }catch(erro) {
            console.log(error)
        }
    }

    async logOut() {
        await axios.post('/auth/logout')
        this.setState({
            isLoggedIn: false,
            user : {},
        })
        this.props.history.push('/')
    }

    render() {
        let props = {...this.state, logOut: this.logOut, logIn:this.logIn,signUp:this.signUp}
        return(
            <React.Fragment>
                <Routes {...props}/>
            </React.Fragment>
        )
    }
}

const Main = withRouter(App)

ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>,
     document.getElementById('app'));
