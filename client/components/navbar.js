import React from 'react'
import {NavLink} from 'react-router-dom'
import {
  Container,
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const Navbar = (props) => (
  <div>
    <Menu fixed='top' >
      <Container style={{display:'flex', justifyContent:'space-between'}}>
        <Menu.Item as='span'  header style={{color:'#009c95'}}>
          Trackr
        </Menu.Item>
        <Dropdown item simple text='Menu'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <NavLink style={{color:'black'}} activeStyle={{color:'#009c95'}} to={'/transactions'}>Transactions</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
            <NavLink style={{color:'black'}} activeStyle={{color:'#009c95'}} to={'/portfolio'}>Portfolio</NavLink>
          </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={props.logOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  </div>
)

export default Navbar
