import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const AuthForm = (props) => (
    <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {props.instruct}
        </Header>
        <Form size='large' onSubmit={props.handleSubmit}>
          <Segment name='box' stacked>
            <Form.Input 
              fluid name='email' 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address'  
              onChange={props.handleChange}
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={props.handleChange}
            />

            <Button color='teal' fluid size='large' type={'submit'}>
              {props.buttName}
            </Button>
          </Segment>
        </Form>
        <Message>
          {props.message} <Link to={props.link}>{props.linkName}</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default AuthForm