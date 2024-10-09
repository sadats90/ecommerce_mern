import { useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer";




const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e)
    }


    return (
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant='primary' className='mt-2'>Sign In</Button>


            </Form>

            <Row>
                <Col>
                    New Customer ? <Link to='/register'>Register</Link>
                </Col>
            </Row>



        </FormContainer>
    )
}

export default LoginScreen