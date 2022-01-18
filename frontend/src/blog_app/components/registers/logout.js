import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useHistory } from 'react-router-dom';

export default function LogOut() {
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('users/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('author_user');
		localStorage.removeItem('author');
		localStorage.removeItem('username');
		localStorage.removeItem('username_id');
		localStorage.clear()
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/register/signin');
	});
	return <div>Logout</div>;
}