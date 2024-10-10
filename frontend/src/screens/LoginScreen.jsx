import { useState,useEffect } from "react";
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice'
import {toast} from 'react-toastify'



const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation();
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
            if(userInfo)
            {
                navigate(redirect)
            }
    },[userInfo,redirect,navigate])

   



    const submitHandler =  async (e) => {
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials({...res,}))
            navigate(redirect)

        } catch (err) {
            toast.error(err?.data?.message || err.error) 
        }
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

                <Button type="submit" variant='primary' className='mt-2' disabled={isLoading}>Sign In</Button>

                {isLoading && <Loader />}


            </Form>

            <Row>
                <Col>
                    New Customer ? <Link to= {redirect ? `/register?redirect=${redirect}`: `/register`}>Register</Link>
                </Col>
            </Row>



        </FormContainer>
    )
}

export default LoginScreen