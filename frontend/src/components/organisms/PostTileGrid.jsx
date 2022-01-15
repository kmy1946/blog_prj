import React from 'react';
import { Grid } from '@material-ui/core'
import PostTile from '../molecules/PostTile';

const PostTileGrid = props => (
  <Grid container spacing={4}>
      {props.posts.map(post => (
          <Grid key={post.id} item xs={4}>
              <PostTile title={post.title} body={post.body} created_at={post.created_at} thumbnail={post.thumbnail} slug={post.slug}/>
          </Grid>
      ))}
  </Grid>
);
export default PostTileGrid;