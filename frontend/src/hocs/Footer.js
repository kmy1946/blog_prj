import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

import { BLOG_TITLE } from '../components/constants';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}{BLOG_TITLE}{' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}))

const Footer = () => {
    const classes = useStyles();
    return(
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}
export default Footer;