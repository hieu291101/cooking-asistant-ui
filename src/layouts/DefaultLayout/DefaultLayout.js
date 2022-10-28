import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import '../Layout.css';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Container fluid className='layout-container'>
                <Row className='inner-layout'>
                    <Col>{children}</Col>
                </Row>
            </Container>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
