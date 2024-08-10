import React from 'react'
import {Row,Col} from 'react-bootstrap'

import Products from '../components/Products'
import {useEffect, useState} from 'react'
import axios from 'axios'

const HomeScreen = () => {

 const [products,setProducts] = useState([])

 useEffect(()=>{
  const fetchProducts = async () => {
    const {data} = await axios.get("http://localhost:5000/api/products")
    setProducts(data)
  }

  fetchProducts()
 } , []

)
  
  return (
   <>
   <h1>Lates Products</h1>
   <Row>
    {products.map((product)=>(
      
        <Col sm={12} md={6} lg={4} xl={3}>
           <Products product={product}/>
        </Col>
    ))}
   </Row>
   </>
  )
}

export default HomeScreen