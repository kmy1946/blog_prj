import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';

const Category = (props) => {
    const BASE_URL = 'http://127.0.0.1:8000'
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [image, setImage] = useState()
    useEffect(() => {
        const category = props.match.params.id;
        setCurrentCategory(capitalizeFirstLetter(category));

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts/category`, { category }, config);
                setBlogs(res.data);
            }
            catch (err) {
            }
        };

        fetchData();
    }, [props.match.params.id]);
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };
    const getCategoryBlogs = () => {
        let list = [];
        let result = [];
        blogs.map(blogPost => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                        <h3 className="blog_title mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.created_at}</div>
                        <p className="card-text mb-auto">{blogPost.excerpt}　</p>
                        <Link to={`/blog/${blogPost.slug}`} className="stretched-link" style={{ textDecoration: 'none' }}>
                          <Box 
                            style={{borderRadius: 15, color:'white', backgroundColor: "rgb(30, 61, 305)", width:'50px',
                          }} variant="contained"
                          >
                            詳細へ
                          </Box>
                        </Link>
                    </div>
                    <div className="blog_thumbnail col-auto d-none d-lg-block">
                        <img width='200' height='250' src={`${BASE_URL}${blogPost.thumbnail}`} alt='thumbnail' />
                    </div>
                </div>
            );
        });
        for (let i = 0; i < list.length; i += 2 ) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
        return result;
    };
    return (
        <div className='container mt-3'>
            <h3 className='display-6'>{currentCategory}</h3>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-end">
                    <Link className="p-2 text-muted" to='/category/カテゴリーなし'>カテゴリーなし</Link>
                    <Link className="p-2 text-muted" to='/category/テクノロジー'>テクノロジー</Link>
                    <Link className="p-2 text-muted" to='/category/文化'>文化</Link>
                    <Link className="p-2 text-muted" to='/category/ビジネス'>ビジネス</Link>
                    <Link className="p-2 text-muted" to='/category/サイエンス'>サイエンス</Link>
                    <Link className="p-2 text-muted" to='/category/生活'>生活</Link>
                    <Link className="p-2 text-muted" to='/category/旅行'>旅行</Link>
                </nav>
            </div>
            {getCategoryBlogs()}
        </div>
    );
};
export default Category;