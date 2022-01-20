import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../axios';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';
import { MenuItem, Select } from '@material-ui/core';

export default function Create() {
	function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}


	const useStyles = makeStyles((theme) => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(3),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const loading = useSelector((state) => state.post.loading)
	const history = useHistory();
	const initialFormData = Object.freeze({
		author_user: '',
		title: '',
		slug: '',
		category: '',
		body: '',
		thumbnail: null,
	});
//	const [formData, updateFormData] = useState(initialFormData);
	const [postData, updateFormData] = useState(initialFormData);
	const [postthumbnail, setPostthumbnail] = useState(null)

	
	const handleChange = (e) => {
		if ([e.target.name] == 'thumbnail') {
			setPostthumbnail({
				thumbnail: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'title') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
				['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

	const config = { Headers: {'Content-Type': 'multipart/form-data'} }

	const handleSubmit = (e) => {
		e.preventDefault();
		const slug_x = 'fff'
		let formData = new FormData();
		formData.append('author_user', localStorage.getItem('username_id'),);
		formData.append('title', postData.title);
		formData.append('slug', postData.slug_x);
		formData.append('category', postData.category);
		formData.append('body', postData.body);
		formData.append('thumbnail', postthumbnail.thumbnail[0]);
		axiosInstance
			.post(`posts/admin/create/`, formData)//, config)
			.then((res) => {
				history.push('/admin/create');
				alert(`以下の内容で投稿しました\nタイトル：${res.data.title}\nスラグ：${res.data.slug}\nカテゴリー：${res.data.category}\n本文${res.data.body}}\nサムネイル：${res.data.thumbnail}`)
			});
	};
	

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="title"
								label="Post Title"
								name="title"
								autoComplete="title"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Select required fullWidth
								id="category" label="Select category" name="category"
								autoComplete="category" value={postData.category}
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
							<div className="form-element">
								<input type="file" accept="image/*" id="thumbnail" label="Select thumbnail" name="thumbnail" required
								autoComplete="thumbnail" multiple onChange={handleChange} />
            	</div>
						</Grid>
						<Grid item xs={12}>
							<TextField variant="outlined" required fullWidth
								id="body" label="body" name="body" autoComplete="body"
								onChange={e => handleChange(e)} multiline rows={4} />
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
						Create Post
					</Button>
				</form>
			</div>
		</Container>
	);
}