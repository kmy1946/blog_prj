import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Button, } from '@material-ui/core';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/posts/featured`);
                setFeaturedBlog(res.data[0]);
                console.log(`Axios Runned \n ${res.data}`)
            }
            catch (err) {
              console.log(`Error Occured!!\n${err}`)
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/posts/`);
                setBlogs(res.data);
                console.log(`Axios Runned \n ${res.data}`)
            }
            catch (err) {
              console.log(`Error Occured!!\n${err}`)
            }
        }
        fetchBlogs();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getBlogs = () => {
        let list = [];
        let result = [];
        
        blogs.map(blogPost => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" >
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                        <h3 className="blog_title mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.created_at}</div>
                        <p className="card-text mb-auto">{blogPost.excerpt}</p>
                        <Link to={`/blog/${blogPost.slug}`} className="stretched-link">詳細へ</Link>
                    </div>
                    <div className="blog_thumbnail col-auto d-none d-lg-block">
                        <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' />
                    </div>
                    <p className='blog_author'>{blogPost.author.username}　さん　</p>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
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
            <Box className="jumbotron top_jumbotron p-4 p-md-5 text-white">
                <p className='text-success'>Being Featured ↓　:　{featuredBlog.category}</p>
                <div className="d-flex px-0">
                    <h1 className="featured_blog_title display-4 font-italic">{featuredBlog.title}</h1>
                    <div className="col-auto d-none d-lg-block">
                      <img src={featuredBlog.thumbnail} className='featured_thumbnail' alt='thumbnail' />
                    </div>
                    <p className='featured_author'>{ featuredBlog.author && featuredBlog.author.username }　さん</p>
                </div>
                <p className="pt-4">
                  <Link to={`/blog/${featuredBlog.slug}`} className="text-white">
                    詳細へ
                  </Link>
                </p>
            </Box>

            {getBlogs()}
        </div>
    );
};

export default Blog;