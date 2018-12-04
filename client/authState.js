import React, { Component} from 'react'


export default (Form) => (

  class FormControls extends Component {
      constructor(props) {
          super(props) 
          this.state ={
              email:'',
              password:'',
          }
  
          this.handleChange = this.handleChange.bind(this)
          this.handleSubmit = this.handleSubmit.bind(this)
      }
      
  
      handleChange(event) {
          this.setState({
              [event.target.name]: event.target.value
          })
      }
      handleSubmit(event) {
          event.preventDefault()    
          if(this.state.email !== '' && this.state.password !== '') {
            this.props.onSubmission(this.state.email, this.state.password)
        } else {
            alert('NotValid')
        }
      }
      render() {
          return (
            <Form 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit}
              {...this.props}
            />
          )
      }
  }
)
