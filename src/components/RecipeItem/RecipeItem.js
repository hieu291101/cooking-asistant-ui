import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './RecipeItem.module.scss';

const cx = classNames.bind(styles);

function RecipeItem({ data }) {
    return (
        <Link to={`/@${data.account.username}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.account.first.username} alt={data.account.first.username} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.account.first.username}</span>
                    {data.account.activated && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{data.account.username}</span>
            </div>
        </Link>
    );
}

RecipeItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default RecipeItem;
