import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Products = ({ product }) => {
  return (
    <div className="product-container">
      {/* Product Image Card */}
      <Card className="mb-2 rounded product-card" style={{ border: 'none', position: 'relative' }}>
        {/* New Arrival Badge */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: '1'
        }}>
          New Arrival
        </div>

        <Link to={`/product/${product._id}`}>
          <Card.Img 
            src={product.image} 
            variant="top" 
            style={{
              height: '400px',
              objectFit: 'cover',
              backgroundColor: '#f8f9fa'
            }}
          />
        </Link>
      </Card>

      {/* Product Details Outside Card */}
      <div style={{ padding: '0 0.5rem' }}>
        <Link 
          to={`/product/${product._id}`} 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <h5 style={{ 
              fontSize: '1rem', 
              fontWeight: '500',
              marginBottom: '0.25rem',
              color: '#333'
            }}>
              {product.name}
            </h5>
            <div style={{ 
              fontSize: '0.9rem', 
              color: '#666',
              fontStyle: 'italic'
            }}>
              {/* Assuming there's a subtitle in your product data */}
              {product.subtitle || 'Product Subtitle'}
            </div>
          </div>
        </Link>

        <div style={{ 
          fontSize: '1rem', 
          fontWeight: '500',
          color: '#333',
          marginBottom: '0.5rem'
        }}>
          TK {product.price}
        </div>

        {/* Thumbnail image */}
        <div style={{ 
          width: '40px', 
          height: '40px', 
          overflow: 'hidden',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          <img 
            src={product.image} 
            alt="thumbnail" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;


import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Products = ({ product }) => {

//   return (
//     <Card className="my-3 p-3 rounded">
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} variant="top" />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title className='product-title'>
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>
//         <Card.Text as="div">
//           <Rating value = {product.rating} text = {`${product.numReviews} Reviews`}/>
//         </Card.Text>

//         <Card.Text as="h3">
//         ${product.price}
//       </Card.Text>
//       </Card.Body>

     
//     </Card>

//   )
// }

// export default Products