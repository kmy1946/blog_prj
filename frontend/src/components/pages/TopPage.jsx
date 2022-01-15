import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TopPageTemplate from '../templates/TopPageTemplate';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    page: {
        margin : 60,
    }
}));

const TopPage = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + '/posts/', )
            .then(res=>{setPosts(res.data);})
            .catch(err=>{console.log(err);});
    }, []);

    return(
        <Container>
            <TopPageTemplate className={classes.page} posts={posts} />
        </Container>
    );
}
export default TopPage;