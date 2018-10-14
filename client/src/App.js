import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  { Provider} from 'react-redux';
import './App.css'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile} from './actions/profileActions'
import Profile from './component/profile/Profile';

import Navbar from './component/Layout/Navbar';
import Footer from './component/Layout/Footer';
import Profiles from './component/Profiles/Profile'
import Landing from './component/Layout/Landing'
import AddExperive from './component/dashboard/AddExperience';
import AddEduction from './component/dashboard/AddEduction';
import NotFound from './component/not-found/NotFound';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login'
import Dashboard from './component/dashboard/dashboard'
import CreateProfile from './component/createProfile/CreateProfile';
import store from '../src/store';


import PrivateRoute from './comman/PrivateRoute'
import EditProfile from './component/editProfile/EditProfile';
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
store.dispatch(clearCurrentProfile())
    // Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <Router>
      <div>
     
        <Navbar/>
       <Route exact path="/" component={Landing} />
       <Route exact  path="/register" component={Register}/>
       <Route exact path='/login' component={Login} />
       <Switch>
       <PrivateRoute exact path='/dashboard' component={Dashboard} />
       </Switch>
       <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperive}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEduction}
                />
              </Switch>
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />
              <Route exact payh="/not-found" component={NotFound}/>
              
        <Footer />
      </div>
      </Router>
      </Provider>
     
     
    );
  }
}

export default App;
