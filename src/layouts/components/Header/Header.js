import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faKitchenSet,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import AuthService from '~/services/auth.service';
import { useEffect, useState } from 'react';
import { logOut } from '~/actions/auth';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/',
            onclick: () => currentUser === undefined ? '' : logOut(currentUser.refreshToken),
            separate: true,
        },
    ];

    return (
        <Container fluid className={cx('wrapper')}>
            <Row className={[cx('inner'), 'inner-layout'].join(' ')}>
                <Col>
                    <div>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <FontAwesomeIcon icon={faKitchenSet} />
                    </Link>
                    </div>
                </Col>

                <Col>
                    <Search placeholder="Search recipe.." />
                </Col>

                <Col className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Your recipe" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    {/* <span className={cx('badge')}>12</span> */}
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text to={config.routes.register}>
                                Sign up
                            </Button>
                            <Button primary to={config.routes.login}>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={userMenu} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src={currentUser.email} alt="Nguyen Van A" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </Col>
            </Row>
            <div className={cx('inner-bottom')}>
                <Nav className={cx('inner-bottom-nav')} activeKey="/home" collapseOnSelect expand="sm">
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.home}>Home</Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.filter}>Recipes</Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.planner}>Planner</Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.storage}>Storage</Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.shopping}>Shopping</Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.recipedetail}>About</Link>
                    </Nav.Item>
                </Nav>
                <div className={cx('social-link')}>
                    <Link to={config.routes.login} className={cx('logo-link')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to={config.routes.login} className={cx('logo-link')}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default Header;
