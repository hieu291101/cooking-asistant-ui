import { faFileExport, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, Modal, Row, Table } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Shopping.module.scss';
import Button from '~/components/Button';
import { useState, useEffect } from 'react';
import AuthService from '~/services/auth.service';
import ShoppingService from '~/services/shoppingService';

const cx = classNames.bind(styles);

function Shopping() {
    const [shoppingData, setShoppingData] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [show, setShow] = useState(false);
    const [buttonContent, setButtonContent] = useState('');

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        const fetchApi = async () => {
            const result = await ShoppingService.getAllShopping(user.id);
            setShoppingData(result);
        };

        fetchApi();
    }, []);

    const handleDelete = (ingredientName) => {
        setButtonContent('Delete');
        handleShow();
    };

    const handleActionDelete = (ingredientName) => {
        ShoppingService.deleteStorage(currentUser.id, ingredientName);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const shoppingRows = shoppingData.map((info, index) => {
        return (
            <tr key={index}>
                <td>{index}</td>
                <td>{info.ingredientName}</td>
                <td>{info.quantity + ' ' + info.measure}</td>
                <td>{info.note}</td>
                <td className={cx('btn-wrapper')}>
                    <div className={cx('btn-attach')}>
                        <FontAwesomeIcon icon={faPen} />
                        <Button onClick={handleDelete(info.ingredientName)} className={cx('shopping-tb-button')}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className={cx('storage-wrapper')}>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            <th>Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{shoppingRows}</tbody>
                </Table>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('shopping-export')}>
                    <Button>
                        <FontAwesomeIcon icon={faFileExport} />
                        Export
                    </Button>
                </div>
                <div className={cx('shopping-button')}>
                    <Button primary>Invite people</Button>
                    <Button primary>Clear list</Button>
                </div>
            </div>
            <Modal
                show={show}
                handleClose={handleClose}
                handleAction={handleActionDelete}
                buttonContent={buttonContent}
            ></Modal>
        </>
    );
}

export default Shopping;
