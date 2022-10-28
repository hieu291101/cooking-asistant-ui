import classNames from 'classnames/bind';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Image from '~/components/Image';
import images from '~/assets/images/';
import styles from './Home.module.scss';
import './Home.css';
import { useEffect, useState } from 'react';
import RecipeCard from '~/components/RecipeCard';
import Button from '~/components/Button';
import RecipeService from '~/services/recipesService';

const cx = classNames.bind(styles);

function Home() {
    const [pageValue, setPageValue] = useState(1);
    const [result, setResult] = useState([]);

    useEffect(() => {
        // let rs = RecipeService.recipes(pageValue);
        // setResult(rs);
    }, [pageValue]);

    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <Image className="d-block w-100" src={images.carousel1} alt="First slide" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src={images.carousel2} alt="First slide" />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src={images.carousel3} alt="First slide" />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container>
                <Row>
                    {/* {result.recipe.map(rc => {
                        <Col>
                            <RecipeCard md={3} data={rc} />
                        </Col>;
                    })} */}
                </Row>
                <Row>
                    <Col className={cx('btn-wrapper')}>
                        <Button to="/filter" primary className={cx('btn-more')}>
                            More
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
