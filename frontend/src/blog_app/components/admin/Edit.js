import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useHistory, useParams } from 'react-router-dom';
import { Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MenuItem } from '@material-ui/core';
import { categories } from './category/categories';
import SelectBox from './category/SelectBox';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Edit(props) {
	const history = useHistory();
	const { id } = useParams();
  const slug = props.match.params.id;
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		slug: '',
		body: '',
    category: '',
    excerpt: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
  //const [category, setCategory] = useState("");
	useEffect(() => {
		axiosInstance.get('posts/admin/edit/postdetail/' + id + '/')
    .then((res) => {
			updateFormData({
				...formData,
        ['author_user']: localStorage.getItem('username_id'),
        ['id']: localStorage.getItem(`blog_id${slug}`),//res.data.id,//
				['title']: res.data.title,
				['slug']: res.data.slug,
				['body']: res.data.body,
        ['category']: res.data.category,
        ['excerpt']: res.data.excerpt,
			});
			console.log(res.data);
      //alert(`${res.data.category}`)
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e, props) => {
		e.preventDefault();
		console.log(formData);
    const blog_id = localStorage.getItem(`blog_id&${slug}`);
		axiosInstance.put(`posts/admin/edit/${slug}/`, {
      id: localStorage.getItem(`blog_id${slug}`),
			title: formData.title,
			slug: formData.slug,
			author_user: localStorage.getItem('username_id'),
			body: formData.body,
      category: formData.category,
      excerpt: formData.excerpt,
		});
    //alert(`blog_id:${blog_id}`)
    //alert(`category:${formData.category}`)
		history.push({
			pathname: `/`,
		});
    //alert(`slug:${slug},\n id:${id}`)
    alert(`編集しました`);
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField variant="outlined" required fullWidth
								id="title" label="Post Title" name="title"
								autoComplete="title" value={formData.title}
								onChange={handleChange} />
						</Grid>
						<Grid item xs={12} >
            <Select required fullWidth
								id="category" label="Select category" name="category"
								autoComplete="category" value={formData.category}
								onChange={handleChange} multiline rows={8} >
                  <MenuItem value="カテゴリーなし">カテゴリーなし</MenuItem>
                  <MenuItem value="テクノロジー">テクノロジー</MenuItem>
                  <MenuItem value="文化">文化</MenuItem>
                  <MenuItem value="ビジネス">ビジネス</MenuItem>
                  <MenuItem value="サイエンス">サイエンス</MenuItem>
                  <MenuItem value="生活">生活</MenuItem>
                  <MenuItem value="旅行">旅行</MenuItem>
              </Select>
						</Grid>
						<Grid item xs={12}>
							<TextField variant="outlined" required fullWidth
								id="slug" label="slug" name="slug" autoComplete="slug"
								value={formData.slug} onChange={handleChange} />
						</Grid>
						<Grid item xs={12}>
							<TextField variant="outlined" required fullWidth
								id="body" label="body" name="body" autoComplete="body" value={formData.body}
								onChange={handleChange} multiline rows={8} />
						</Grid>
						<Grid item xs={12}>
							<TextField variant="outlined" required fullWidth
								id="excerpt" label="Post Excerpt" name="excerpt"
								autoComplete="excerpt" value={formData.excerpt}
								onChange={handleChange} multiline rows={8} />
						</Grid>
					</Grid>
					<Button type="submit" fullWidth
						variant="contained" color="primary" className={classes.submit}
						onClick={handleSubmit} >
						Update Post
					</Button>
				</form>
			</div>
		</Container>
	);
}