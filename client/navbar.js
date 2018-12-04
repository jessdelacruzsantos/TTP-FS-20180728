import React from 'react'
import {Link} from 'react-router-dom'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
} from 'semantic-ui-react'

const Navbar = () => (
  <div>
    <Menu fixed='top' >
      <Container style={{display:'flex', justifyContent:'space-between'}}>
        <Menu.Item as='a' header>
          Project Name
        </Menu.Item>


        <Dropdown item simple text='Menu'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={'/works'}>Transactions</Link>
            </Dropdown.Item>

            <Dropdown.Divider/>

            <Dropdown.Item>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  </div>
)

export default Navbar
