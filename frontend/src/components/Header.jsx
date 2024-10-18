import React from 'react'
import { Badge, Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux'

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    const logoutHandler = () =>{
        console.log('ss')
    }

    const { s } = useSelector((state) => state.cart)
    const { ssf } = useSelector((state) => state.auth)
    const logoutHandler3 = () =>{
        console.log('ss')
    }


    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href="/">FLL</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><FaShoppingCart />Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}

                                        </Badge>
                                    )}

                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (<>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item as={Link} to='/profile'>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><FaUser /></Nav.Link>
                                </LinkContainer>
                            )}


                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </header>
    )
}

export default Header