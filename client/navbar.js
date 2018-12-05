import React from 'react'
import {Link} from 'react-router-dom'
import {
  Container,
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const Navbar = (props) => (
  <div>
    <Menu fixed='top' >
      <Container style={{display:'flex', justifyContent:'space-between'}}>
        <Menu.Item as='a' header style={{color:'#009c95'}}>
          Trackr
        </Menu.Item>
        <Dropdown item simple text='Menu'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={'/transactions'}>Transactions</Link>
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
