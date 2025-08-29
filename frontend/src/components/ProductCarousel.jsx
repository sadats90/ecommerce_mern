import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="hero-carousel">
      <Carousel 
        pause='hover' 
        className='hero-carousel-component'
        indicators={false}
        controls={true}
        interval={5000}
      >
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`} className="carousel-link">
              <div className="carousel-image-container">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <div className="carousel-content">
                    <h3 className="carousel-title">{product.name}</h3>
                    <p className="carousel-price">${product.price}</p>
                    <span className="carousel-cta">View Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
