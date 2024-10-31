import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Form, Image, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from "../components/Message";
import { addToCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-4">Shopping Bag</h1>
        {cartItems.length === 0 ? (
          <Message>
            Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className="d-flex align-items-center">
                <Col md={2}>
                  <Image src={item.image} fluid alt={item.name} rounded />
                </Col>
                <Col md={6}>
                  <Link to={`/product/${item._id}`} className="text-dark">
                  <strong className='ms-2'>{item.name}</strong>

                  </Link>
                  <div className='ms-2'>Sku: {item.sku}</div>
                  <div className='ms-2'>Size: {item.size}</div>
                </Col>
                <Col md={2} className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => addToCartHandler(item, item.qty - 1)}
                    disabled={item.qty === 1}
                  >-</Button>
                  <span className="mx-2">{item.qty}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => addToCartHandler(item, item.qty + 1)}
                    disabled={item.qty === item.countInStock}
                  >+</Button>
                </Col>
                <Col md={2} className="text-end">
                  <strong>{item.price} TK</strong>
                </Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Bag totals</h2>
              <p className="mb-3">Calculate Shipping</p>
              <Form>
                <Form.Group controlId="region">
                  <Form.Label>Select Region</Form.Label>
                  <Form.Control as="select">
                    <option>Mymensingh</option>
                    <option>Dhaka</option>
                    <option>Chattogram</option>
                    {/* Add more regions as needed */}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="city" className="mt-2">
                  <Form.Label>Select City</Form.Label>
                  <Form.Control as="select">
                    <option>Netrakona</option>
                    <option>Dhaka</option>
                    <option>Chattogram</option>
                    {/* Add more cities as needed */}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="area" className="mt-2">
                  <Form.Label>Select Area</Form.Label>
                  <Form.Control as="select">
                    <option>Area 1</option>
                    <option>Area 2</option>
                    {/* Add more areas as needed */}
                  </Form.Control>
                </Form.Group>
              </Form>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} TK</strong>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Shipping</span>
              <strong>120 TK</strong>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Discount</span>
              <strong>0 TK</strong>
            </ListGroup.Item>
            
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Total</span>
              <strong>
                {(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + 120).toFixed(2)} TK
              </strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block btn-dark w-100'
                disabled={cartItems.length === 0}
                onClick={() => navigate('/shipping')}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
