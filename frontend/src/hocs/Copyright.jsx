import React from 'react'
import { Typography } from '@material-ui/core';
import { copyright } from '../App';

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {copyright}
    </Typography>
);

export default Copyright;
