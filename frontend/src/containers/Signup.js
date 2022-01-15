import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Input, FormGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { signup } from '../actions/auth';


const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    button: {
        width: '70%',
        marginTop: theme.spacing(3),
        color:'white',
        backgroundColor:'blue',
        borderRadius:'15px',
    },
    checkbox: {
        float: 'right',
    },
    login_link: {
      whiteSpace: 'nowrap',
    }
    }));

const Signups = ({ signup, isAuthenticated }) => {
  const classes = useStyles();
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === password2) {
            signup(username, email, password, password2 );
            setAccountCreated(true);
        }
        alert(`${email}宛に本登録用リンクを送信しました。\nご確認下さい。`)
    };


    if (isAuthenticated) {
        return <Redirect to='/blog' />
    }
    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
      <Fragment>
          <div className={classes.content}>
          <Box width={350} p={6} border={1}>

          <Typography component="h1" variant="h5" style={{textAlign:'center', color:'blue'}}>サインアップ</Typography>
          <br/>
            <form noValidate onSubmit={e => onSubmit(e)} style={{textAlign:'center'}}>
                <FormGroup>
                    <TextField
                        className='form-control'
                        type='text'
                        label='Name'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormGroup>
                <br/>
                <FormGroup>
                    <TextField
                        className='form-control'
                        type='email'
                        label='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormGroup>
                <br/>
                <FormGroup>
                    <TextField
                        className='form-control'
                        type='password'
                        label='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </FormGroup>
                <br/>
                <FormGroup>
                    <TextField
                        className='form-control'
                        type='password'
                        label='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </FormGroup>
                <Button className={classes.button} type='submit'>Register</Button>
            </form>
            <p className='mt-3 text-center'>
                <Link to='/login' className={classes.login_link}><small>アカウントをお持ちの方はログイン</small></Link>
            </p>

        </Box>
        </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signups);