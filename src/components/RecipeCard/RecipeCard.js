import { Card } from 'react-bootstrap';
import classNames from 'classnames/bind';
import images from '~/assets/images/';
import styles from './RecipeCard.module.scss';
import Image from '~/components/Image';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function RecipeCard({ data }) {
    return (
        <Card className={cx('recipe-card')}>
            <Card.Img variant="top" src={images.noImage} />
            <Card.Body>
                <Card.Title className={cx('recipe-card-title')}>{ 'title' || data.title}</Card.Title>
                <Card.Text className={cx('recipe-card-description')}>
                    {'description' || data.briefDescription}
                </Card.Text>
                <div className={cx('recipe-card-bottom')}>
                    <div className={cx('recipe-card-owner')}>
                        <Image src={images.noImage} />
                        <span className={cx('owner-name')}>owner name</span>
                    </div>

                    <div className={cx('recipe-card-button')}>
                        <Button rounded>
                            <FontAwesomeIcon icon={faKitchenSet} />
                        </Button>
                        <Button rounded>
                            <FontAwesomeIcon icon={faKitchenSet} />
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;
