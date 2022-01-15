import React, { useState, Fragment } from 'react';
import { Typography, Box } from "@material-ui/core";

function NotFound() {
  return (
      <Fragment>
      <div>
      <Box width={350} m='30%' p={6} border={1}>
      <Typography  variant="h5" style={{textAlign:'center', color:'blue'}}>
        Page Not Found
      </Typography>
      </Box>
      </div>
  </Fragment>
  )
}
export default NotFound