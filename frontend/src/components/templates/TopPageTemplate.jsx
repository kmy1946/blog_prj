import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PostTileGrid from '../organisms/PostTileGrid';

const useStyles = makeStyles(theme => ({
    postTileGrid: {
        margin: theme.spacing(4),
    }
}));
const TopPageTemplate = (props) =>{
    const classes = useStyles();
    return (
    <Fragment>
        <div className={classes.postTileGrid}>
            <PostTileGrid posts={props.posts}/>
        </div>
    </Fragment>
);
}

export default TopPageTemplate;