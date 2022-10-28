import Button from '~/components/Button';
import { SearchIcon } from '~/components/Icons';
import Search from '../Search';
import styles from './PlannerSidebar.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import RecipeItem from '~/components/RecipeItem';
import config from '~/config';

const cx = classNames.bind(styles);

function PlannerSidebar() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <>
            <h2 className={cx('heading')}>Find recipe</h2>
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Enter recipe name"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </div>
            <div className={cx('result-search')}>{/* <RecipeItem/> */}</div>
            <div className={cx('search-suggest')}>
                <p>Click filter to choose recipe more easy</p>
                <Button to={config.routes.filter} primary className={cx('btn-more')}>
                    Filter
                </Button>
            </div>
        </>
    );
}

export default PlannerSidebar;
