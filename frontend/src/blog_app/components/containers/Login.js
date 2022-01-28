import React, { useState, Fragment } from 'react';
import { Box, TextField, Button, Typography, FormGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

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
  }
  }));

const Logins = ({ login, isAuthenticated }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({email: '', password: ''});

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        alert(`以下のメールアドレスでログインをリクエストをします。\n${email}`)
        login(email, password);

        if (isAuthenticated) {
          console.log('isAuthenticated ---> ok in Login.js')
          return <Redirect to='/toppage' />;
        } else{
          console.log('isAuthenticated ---> else in Login.js')
          return <Redirect to="/toppage"/>
        }
    };
    return (
      <Fragment>
          <div className={classes.content}>
          <Box width={350} p={6} border={1} >
          <Typography component="h1" variant="h5" style={{textAlign:'center', color:'blue'}}>ログイン</Typography>
            <form noValidate onSubmit={e => onSubmit(e)} style={{textAlign:'center'}}>
                <FormGroup>
                    <TextField
                        className='form-control'
                        type='email'
                        label="Email"
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
                        type='text'
                        label="Password"
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormGroup>
                <br/>
                <Button className={classes.button} type='submit'>Login</Button>
            </form>
            <p className='mt-3 text-center'>
              <Link to='/signup'><small>アカウントをお持ちでない方</small></Link>
            </p>
            <p className='text-center'>
              <Link to='/reset-password'><small>パスワードをお忘れですか？</small></Link>
            </p>
            </Box>
          </div>
      </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Logins);