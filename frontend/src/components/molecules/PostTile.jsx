import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    maxWidth: 345,
  },
  media: {
    height: 345
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  title: {
    fontSize: '2rem',
    whiteSpace:'nowrap',
  },
  excerpt: {
      marginRight: 30,
  },
  created_at:{
    marginTop:'4px',
    fontSize:'9px',
    textAlign:'right',
  }
});

const PostTile = props => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
          <CardActionArea>
            <Link to={`/blog/${props.slug}`} className="text-white">
              <CardMedia
                className={classes.media}
                image={props.thumbnail}
                title={props.title}
              />
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  {props.title}
                </Typography>
                <Typography variant="body2" component="p" className={classes.excerpt} noWrap>
                  {props.body}
                </Typography>
                <Typography variant="body2" component="p" className={classes.created_at} noWrap>
                  {props.created_at}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      );
}

export default PostTile;
