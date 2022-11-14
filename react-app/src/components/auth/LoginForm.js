import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { login } from '../../store/session';
import './Auth.css'
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch();


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/')
    }
  };

  const redirect = () => history.push('/signup')

  const handleDemo = async (e) => {
    e.preventDefault()

    const demo = {
      email: 'demo@aa.io',
      password: 'password'
    }
    await dispatch(login(demo.email, demo.password))
    history.push('/home')
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className="login auth">
      <form onSubmit={onLogin} className='login__form auth__form'>
        <header className='auth__header login__header'>Log In</header>

        <div className="login__container auth__container">
          <div>
            {errors.map((error, ind) => (
              <div key={ind} style={{ color: 'red' }}>{error}</div>
            ))}
          </div>
          <div className='login__inputs auth__inputs'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Enter your email address...'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div className='login__inputs auth__inputs'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Enter your password... '
              value={password}
              onChange={updatePassword}
              required
            />
          </div>

          <div className="divider" />

          <button className='login_loginButton auth__buttons login__buttons' type='submit' disabled={errors.length > 0}>Login</button>
          <button className='login__demoButton auth__buttons login__buttons' type='button' onClick={handleDemo}>Demo</button>
          {/* </div> */}

          <div className="login__redirect auth__redirect">
            <p className='login__none'>Don't have an account?<span
              onClick={redirect}
              className='redirect' >Sign up</span></p>
          </div>
        </div>
      </form>
    </div >

  );
};

export default LoginForm;
