import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import { Redirect } from 'react-router-dom';


function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      {!user &&
        <Route path='/' exact={true}>
          <NavBar />
        </Route>

      }
      <Switch>
        {!user ?
          <Route path='/' exact={true}>
            <LandingPage />
          </Route> :
          <Route path='/'>
            <Home />
          </Route>
        }
        <ProtectedRoute path='/home' >
          <Home />
        </ProtectedRoute>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
