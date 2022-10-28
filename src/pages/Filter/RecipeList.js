import { Col, Container, Row } from 'react-bootstrap';
import Button from '~/components/Button';
import CustomPagination from '~/components/CustomPagination';
import RecipeCard from '~/components/RecipeCard';
import classNames from 'classnames/bind';
import styles from './RecipeList.module.scss';
import { useEffect, useState } from 'react';
import RecipeService from '~/services/recipesService';


const cx = classNames.bind(styles);

function RecipeList({sidebar}) {
    const [recipeData, setRecipeData] = useState([]);

    const Sidebar = sidebar;
    console.log(sidebar);
    useEffect(() => {
        <Sidebar func={handleFilter}/>
        const fetchApi = async () => {
            const result = await RecipeService.filter();
            setRecipeData(result);
        };

        fetchApi();
    }, []) 
        
    
    const recipeCols = recipeData.map((info, index) => {
        return (
            <Col md={4} key={index}>
                <RecipeCard data={info} />
            </Col>
        );
    });
    
    function handleFilter(page = 1, totaltime, cuisine) {
        setRecipeData(RecipeService.filter(page, totaltime, cuisine));
    }


    return (
        <Container>
            <Row>{recipeCols}</Row>
            <Row>
                <Col className={cx('recipe-pagination')}>
                    <CustomPagination />
                </Col>
            </Row>
            <Sidebar func={handleFilter}/> 
        </Container>
    );
}

export default RecipeList;
