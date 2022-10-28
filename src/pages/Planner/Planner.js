import { useEffect, useState } from 'react';
import { Accordion, Tab, Tabs } from 'react-bootstrap';
import styles from './Planner.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import AuthService from '~/services/auth.service';

const cx = classNames.bind(styles);

const dayOfWeek = [
    { key: 'monday', value: 'Monday' },
    { key: 'tuesday', value: 'Tuesday' },
    { key: 'wednesday', value: 'Wednesday' },
    { key: 'thusday', value: 'Thusday' },
    { key: 'friday', value: 'Friday' },
    { key: 'saturday', value: 'Saturday' },
    { key: 'sunday', value: 'Sunday' },
];

const meal = [
    { key: 'breakfast', value: 'Breakfast' },
    { key: 'lunch', value: 'Lunch' },
    { key: 'dinner', value: 'Dinner' },
];

function Planner() {
    const [key, setKey] = useState('monday');

    return (
        <>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                {dayOfWeek.map((day) => (
                    <Tab eventKey={day.key} title={day.value}>
                        <Accordion className={cx('accourdion')} flush>
                            {meal.map((m) => (
                                <Accordion.Item eventKey={m.key}>
                                    <Accordion.Header>{m.value}</Accordion.Header>
                                    <Accordion.Body></Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Tab>
                ))}
            </Tabs>
            <div className={cx('btn-group')}>
                <Button primary>Auto complete</Button>
                <Button primary>Show detail</Button>
            </div>
        </>
    );
}

export default Planner;
