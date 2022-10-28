import { faClock, faPeopleGroup, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Table } from 'react-bootstrap';
import Button from '~/components/Button';
import styles from './RecipeDetail.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function RecipeDetail() {
    return (
        <>
            <Card className={cx('recipe-detail-card')}>
                <Card.Header>
                    <Row>
                        <Col className={cx('recipe-detail-heading')}>Title</Col>
                    </Row>
                    <Row className={cx('recipe-content')}>
                        <Col>
                            <Button primary href="#review">
                                Review this recipe
                            </Button>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faStar} />
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faClock} />
                            <span>Ready </span>
                            <span>min</span>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faPeopleGroup} />
                            <span>Serving</span>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className={cx('recipe-image')}>
                    <Image src={images.noImage} />
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row className={cx('recipe-more')}>
                        <Col md={6}>
                            <Image src={images.noImage} />
                            <span>Ready </span>
                        </Col>

                        <Col className={cx('recipe-more-item')}>
                            <FontAwesomeIcon icon={faClock} />
                            <FontAwesomeIcon icon={faPeopleGroup} />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
            <div className={cx('recipe-detail-wrapper')}>
                <div className={cx('recipe-detail-container')}>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ingredient</th>
                                <th>Unit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>Note</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className={cx('serving')}>
                    <div className={cx('serving-input')}>
                        <input type="number" min="1"></input>
                        <span> Serving</span>
                    </div>
                    <Button primary>Edit</Button>
                </div>
            </div>
            <div className={cx('recipe-instruction')}>
                <div className={cx('recipe-instruction-heading')}>
                    <h2>Instructrions</h2>
                </div>
                <div className={cx('recipe-instruction-content')}></div>
            </div>

            <div className={cx('recipe-instruction', 'recipe-review')} id="review">
                <div className={cx('recipe-instruction-heading')}>
                    <h2>Review this recipe</h2>
                </div>
                <textarea></textarea>
                <div className={cx('recipe-instruction-button')}>
                    <Button primary>Add my review</Button>
                </div>
            </div>
            <div className={cx('recipe-instruction')}>
                <div className={cx('recipe-instruction-heading')}>
                    <h2>Reviews</h2>
                </div>
                <div className={cx('recipe-addreview')}></div>
            </div>
        </>
    );
}

export default RecipeDetail;
