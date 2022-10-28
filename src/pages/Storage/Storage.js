import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Form, Row, Table } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Storage.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import StorageService from '~/services/storageService';
import AuthService from '~/services/auth.service';
import ModalCustom from '~/components/Modal';

const cx = classNames.bind(styles);

function Storage({ sidebar }) {
    const [storageData, setStorageData] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [show, setShow] = useState(false);
    const [buttonContent, setButtonContent] = useState('');
    const [ingredientName, setIngredientName] = useState('');

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        const fetchApi = async () => {
            const result = await StorageService.getAllStorage(user.id);
            setStorageData(result);
        };

        fetchApi();
    }, []);

    const handleDelete = (ingredientName) => {
        setButtonContent('Delete');
        setIngredientName(ingredientName);
        handleShow();
    };

    const handleActionDelete = (ingredientName) => {
        StorageService.deleteStorage(currentUser.id, ingredientName);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const storageRows = storageData.map((info, index) => {
        return (
            <tr key={index} className={cx('storage-tb-row')}>
                <td>{index}</td>
                <td>
                    <input disabled type="text" value={info.ingredientName} />
                </td>
                <td>{info.quantity + ' ' + info.measure}</td>
                <td>{Intl.DateTimeFormat('sv-SE').format(new Date(info.bestBefore))}</td>
                <td className={cx('btn-wrapper')}>
                    <div className={cx('btn-attach')}>
                        <Button className={cx('storage-button')}>
                            <FontAwesomeIcon icon={faPen} />
                        </Button>

                        <Button onClick={() => handleDelete(info.ingredientName)} className={cx('storage-button')}>
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
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            <th>Best before</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{storageRows}</tbody>
                </Table>
            </div>
            <div className={cx('suggest-wrapper')}>
                <div className={cx('suggest-description')}>
                    <h2>Suggestion</h2>
                    <p>
                        Assistant will try to generate a list of recipes for each course by ingredients you already have
                        in your food storage. Please select the couses you want to have in your meal and then click
                        "Generate"
                    </p>
                </div>
                <Form.Group className={cx('form-group', 'mb-3')} controlId="formBasicEmail">
                    <span>How much time do you have?</span>
                    <div className={cx('form-input')}>
                        <Form.Control type="number" className="" placeholder="Enter minutes..." min="0" />
                        <span>minutes</span>
                    </div>

                    <Button primary type="submit">
                        Generate
                    </Button>

                    {/* <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback> */}
                </Form.Group>
            </div>
            <ModalCustom
                show={show}
                handleClose={() => handleClose()}
                handleAction={() => handleActionDelete(ingredientName)}
                buttonContent={buttonContent}
                message="Are you sure you want to delete"
                title="Delete"
            ></ModalCustom>
        </>
    );
}

export default Storage;
