import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { FaRocket, FaStar, FaShippingFast, FaHeadset } from 'react-icons/fa';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const features = [
    { icon: <FaRocket />, title: 'Fast Delivery', desc: 'Free shipping on orders over $50' },
    { icon: <FaStar />, title: 'Premium Quality', desc: 'Curated selection of top brands' },
    { icon: <FaShippingFast />, title: 'Easy Returns', desc: '30-day hassle-free returns' },
    { icon: <FaHeadset />, title: '24/7 Support', desc: 'Round the clock customer service' },
  ];

  return (
    <>
      {!keyword ? (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <Container fluid className="hero-container">
              <Row className="align-items-center min-vh-75">
                <Col lg={6} className="hero-content">
                  <div className="hero-text">
                    <h1 className="hero-title">
                      Discover Amazing Products
                      <span className="text-accent"> at Unbeatable Prices</span>
                    </h1>
                    <p className="hero-subtitle">
                      Shop the latest trends with confidence. Quality products, competitive prices, and exceptional service.
                    </p>
                    <div className="hero-buttons">
                      <Button variant="primary" size="lg" className="me-3">
                        Shop Now
                      </Button>
                      <Button variant="outline-primary" size="lg">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg={6} className="hero-visual">
                  <ProductCarousel />
                </Col>
              </Row>
            </Container>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <Container>
              <Row className="g-4">
                {features.map((feature, index) => (
                  <Col key={index} xs={12} sm={6} lg={3}>
                    <Card className="feature-card h-100">
                      <Card.Body className="text-center">
                        <div className="feature-icon">
                          {feature.icon}
                        </div>
                        <Card.Title className="feature-title">{feature.title}</Card.Title>
                        <Card.Text className="feature-text">{feature.desc}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>

          {/* Latest Products Section */}
          <section className="products-section">
            <Container>
              <div className="section-header text-center mb-5">
                <h2 className="section-title">Latest Products</h2>
                <p className="section-subtitle">Fresh arrivals you don't want to miss</p>
              </div>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>
                  {error?.data?.message || error.error}
                </Message>
              ) : (
                <>
                  <Meta />
                  <Row className="g-4">
                    {data.products.map((product) => (
                      <Col key={product._id} xs={12} sm={6} lg={4} xl={3}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                  <div className="text-center mt-5">
                    <Paginate
                      pages={data.pages}
                      page={data.page}
                      keyword={keyword ? keyword : ''}
                    />
                  </div>
                </>
              )}
            </Container>
          </section>
        </>
      ) : (
        <Container>
          <Link to='/' className='btn btn-light mb-4'>
            ← Go Back
          </Link>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              <Meta />
              <div className="search-results-header mb-4">
                <h1>Search Results for "{keyword}"</h1>
                <p className="text-muted">Found {data.products.length} products</p>
              </div>
              <Row className="g-4">
                {data.products.map((product) => (
                  <Col key={product._id} xs={12} sm={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-5">
                <Paginate
                  pages={data.pages}
                  page={data.page}
                  keyword={keyword ? keyword : ''}
                />
              </div>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
