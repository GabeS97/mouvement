import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../store/session';
import '../BoardSection/BoardSection.css'
const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button onClick={onLogout} className='logout__button'>Logout</button>;
};

export default LogoutButton;
