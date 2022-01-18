import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
      //marginTop: theme.spacing(4),
  },
  detail_group: {
    position:'relative',
  },
  detail_title: {
    fontFamily:'cursive',
    fontSize:'25px',
    color:'blue'
  },
  detail_category: {
    fontSize:'15px',
  },
  detail_content_group: {
    marginTop:'200px',
  },
  detail_body_name: {
    position:'absolute',
    backgroundColor:'blue',
    color: 'white',
    width:'40px',
    height:'40px',
    borderRadius:'40px',
    padding:'4px',
    paddingTop:'8px',
    marginLeft:'6px',
    top: '100px',
  },
  detail_body_box: {
    position:'absolute',
    width:'70%',
    paddingTop:'20px',
    marginLeft:'25px',
    top: '100px',
  },
  detail_body: {
    inlineSize: '100%',
    overflowWrap: 'break-word',
  },
  detail_thumbnail: {
    position:'absolute',
    top:'0px',
    right:'0px'
  },
  link_back_to_top: {
    fontSize:'17px'
  }
  }));

const BlogDetail = (props) => {
    const classes = useStyles();
    const [blog, setBlog] = useState({});
    const blog_id = localStorage.setItem(`blog_id&${blog.slug}`, blog.id);//localStorage.setItem(`${blog.id}`)
    const blog_slug = localStorage.setItem(`blog_slug&${blog.id}`, blog.slug);

    useEffect(() => {
        const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${slug}`);
                setBlog(res.data);
            }
            catch (err) {
            }
        };

        fetchData();
    }, [props.match.params.id]);

    const createBlog = () => {
        return {__html: blog.content}
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
      <Fragment>
      <div className={classes.content}>
      <Box border={1} width='80%' m={7} padding={2}>
        <div className={classes.detail_group}>
            <p className={classes.detail_title}>{blog.title}</p>
            <h2 className={classes.detail_category}>　カテゴリー : {capitalizeFirstLetter(blog.category)}</h2>
            <div className={classes.detail_content_group}>
              <Box className={classes.detail_body_name}>内容</Box>
              <Box border={1} padding={3} margin={2} className={classes.detail_body_box}>
                <p className={classes.detail_body}>{blog.body}</p>
              </Box>
              <div className={classes.detail_thumbnail}>
                  <img width='200' height='250' src={blog.thumbnail} alt='thumbnail' />
              </div>
              <div className='text-left'>
                <Link color="textPrimary" to={`/admin/edit/${blog.slug}`}
									className={classes.link} >
									<EditIcon></EditIcon>
								</Link>
                <Link color="textPrimary" to={'/admin/delete/' + blog.slug} className={classes.link} >
									<DeleteForeverIcon></DeleteForeverIcon>
								</Link>
              </div>
              <div className='text-right'>
                <small>{blog.created_at}</small>
                <br />
                <small>{blog.updated_at}</small>
              </div>
              <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
              <hr />
            </div>
        </div>
        <p className='text-right'>
          <Link to='/blog' className={classes.link_back_to_top}>
            一覧に戻る
          </Link>
        </p>
      </Box>
      </div>
      </Fragment>
    );
};

export default BlogDetail;