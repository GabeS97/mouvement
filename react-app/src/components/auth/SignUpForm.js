import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import './Auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showErrors, setShowError] = useState(false)
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, fName, lName));
      console.log(data);
      if (data) {
        setErrors(data)
      } else {
        history.push('/')
      }
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault()

    const demo = {
      email: 'demo@aa.io',
      password: 'password'
    }
    await dispatch(login(demo.email, demo.password))
    history.push('/')
  }

  const redirect = () => history.push('/login')

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const updateFirstName = (e) => setFName(e.target.value);
  const updateLastName = (e) => setLName(e.target.value);
  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className="signup auth">
      <form className='signUp__form auth__form' onSubmit={onSignUp}>
        <header className='auth__header'>Sign Up</header>
        <div className="signup__container auth__container">

          <div>
            {errors.map((error, ind) => (
              <div key={ind} style={{ color: 'red', fontSize: '10px', textDecoration: 'underline black', width: '100%' }}>{error} </div>
            ))}
          </div>

          <div className='auth__inputs'>
            <label>First Name</label>
            <input
              type='text'
              name='first_name'
              placeholder='Enter your first name...'
              onChange={updateFirstName}
              value={fName}
              required
            ></input>
          </div>
          <div className='auth__inputs'>
            <label>Last Name</label>
            <input
              type='text'
              name='last_name'
              placeholder='Enter your last name ...'
              onChange={updateLastName}
              value={lName}
              required
            ></input>
          </div>
          <div className='auth__inputs'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter your email...'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className='auth__inputs'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password...'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className='auth__inputs'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm your password...'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required
            ></input>
          </div>

          <div className="divider" />

          <button type='submit' className='signup_signupButton auth__buttons' disabled={errors.length > 0}>Sign Up</button>
          <button type='button' onClick={handleDemo} className='signup__demoButton auth__buttons'>Demo</button>

          <div className="auth__redirect">
            <p>Already have an account?</p>
            <span className='redirect' onClick={redirect}>Log in</span>
          </div>

        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
