import React, {Component} from 'react'
import {BrowserRouter, withRouter} from 'react-router-dom'
import {Routes} from './index'

class App extends Component{
    component(props) {
        super(props) 
        this.state ={
            isLoading: true,
            isLoggedIn: false,
            user:{}
        }
    }
    

    render() {
        return(
            <React.Fragment>
                <Routes/>
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
