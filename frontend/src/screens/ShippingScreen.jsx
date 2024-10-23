import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

import { saveShippingAddress } from '../slices/cartSlice';



const ShippingScreen = () => {

    const [address, setAddress] = useState( '');
    const [city, setCity] = useState('');
    // const [postalCode, setPostalCode] = useState(
    //   shippingAddress.postalCode || ''
    // );
    const [country, setCountry] = useState('');

  return (
    <div>ShippingScreen</div>
  )
}

export default ShippingScreen