import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Home from './components/Home/Home';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const history = useHistory();
  const dispatch = useDispatch()

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
        <Redirect to='/login' />}
      <NavBar />
      <Route path='/signup' exact={true}>
        <SignUpForm />
      </Route>
      <Route path='/login' exact={true}>
        <LoginForm />
      </Route>

      <Switch>
        <ProtectedRoute path='/home' >
          <Home />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
