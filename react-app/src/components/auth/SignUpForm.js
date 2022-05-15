import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = []
    if (fName.length === 0) validationErrors.push("Please provide a first name.")
    if (lName.length === 0) validationErrors.push("Please provide a last name.")
    if (username.length === 0) validationErrors.push("Please provide a username.")
    if (email.length === 0) validationErrors.push("Please provide an email address.")
    if (!email.includes('@')) validationErrors.push("Please provide a valid email.")
    if (password.length === 0) validationErrors.push("Please provide a password.")
    if (password !== repeatPassword) validationErrors.push("Passwords do not match.")

    setErrors(validationErrors)
  }, [fName, lName, username, email, password, repeatPassword])

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
    <div className="signup">
      <div className="signup__navBar">
        <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <div className="navBar__logo">
            <svg height="30" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="12 0.18999999999999906 487.619 510.941"><path d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" fill-rule="evenodd" /></svg>
            Mouvement
          </div>
        </NavLink>
      </div>

      <form className='signUp__form' onSubmit={onSignUp}>
        <header>Sign Up</header>
        <div className="signup__container">

          <div>
            {errors.map((error, ind) => (
              <div key={ind} style={{ color: 'red', fontSize: 'smaller' }}>{error} </div>
            ))}
          </div>
          <div>
            <label>First Name</label>
            <input
              type='text'
              name='username'
              placeholder='Enter your first name...'
              onChange={updateFirstName}
              value={fName}
            ></input>
          </div>
          <div>
            <label>Last Name</label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username...'
              onChange={updateLastName}
              value={lName}
            ></input>
          </div>
          <div>
            <label>User Name</label>
            <input
              type='text'
              name='username'
              placeholder='Enter your username...'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter your email...'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password...'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm your password...'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit' className='signup_signupButton' disabled={errors.length > 0}>Sign Up</button>
          <button type='button' onClick={handleDemo} className='signup__demoButton'>Demo</button>

          <NavLink to='/login' className='signup__login'>
            Already have an account?
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
