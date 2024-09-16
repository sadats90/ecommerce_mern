import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Products from '../components/Products'
import Loader from '../components/Loader'
import Message  from '../components/Message'



const HomeScreen = () => {
  const { data : products,isLoading,error} = useGetProductsQuery()
  

  
  return (
   <>
   

{ isLoading ? (<Loader/>) : error ? ( <Message variant='danger'>{error?.data?.message || error.error}</Message> ) : ( <>  <h1>Lates Products</h1>
  <Row>
   {products.map((product)=>(
     
       <Col sm={12} md={6} lg={4} xl={3}>
          <Products product={product}/>
       </Col>
   ))}
  </Row> </>  ) }
   </>
  )
}

export default HomeScreen