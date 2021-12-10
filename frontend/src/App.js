import Signup from './pages/Signup'
import Login from './pages/Login'
import Front from './pages/Front'
import Navbar from './components/Navbar'
import './App.css'
import { useState } from 'react';
import {BrowserRouter as Router , Route, Switch, Redirect } from 'react-router-dom';


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  const setAuth = (bool) => {
    setAuthenticated(bool);
  }

  return (
    <div>
    <Router>
    
    <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth}/>
    <Switch>
      <Route exact path="/" render={() => !isAuthenticated? <Redirect to='/login' /> : <Redirect to='/front' setAuth={setAuth}/>} />
      <Route exact path="/login" render={props => !isAuthenticated? <Login {...props} setAuth={setAuth} /> : <Redirect to='/front' setAuth={setAuth} />}/>
      <Route exact path="/signup" render={props => !isAuthenticated? <Signup {...props} setAuth={setAuth} /> : <Redirect to='/front' setAuth={setAuth} />}/>
      <Route exact path="/front" render={props => isAuthenticated? <Front {...props} setAuth={setAuth} /> : <Redirect to='/login' setAuth={setAuth} />} />
    </Switch>
    
    {/*
    <Post post={post} /> 
    */}
    
    </Router>
    </div>
    );
  };

export default App;
