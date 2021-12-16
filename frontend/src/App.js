import Signup from './pages/Signup'
import Login from './pages/Login'
import Front from './pages/Front'
import Navbar from './components/Navbar'
import CreatePage from './pages/CreatePost'
import PostPage from './pages/PostPage'
import Bookmarks from './pages/Bookmarks'
import Administrator from './pages/Administrator'
import Profile from './pages/Profile'
import './App.css'
import { useEffect, useState } from 'react';
import {BrowserRouter as Router , Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios'


const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(localStorage.Authorization);

  const setAuth = (bool) => {
    setAuthenticated(bool);
  }

  const getInfo = async () => {
    axios.get('/api/user/info', {
        headers: {
            'Authorization': localStorage.Authorization
        }
    })
    .then(() => {
        setAuth(true);
    })
    .catch(() => {
        setAuth(false)
    })
  }
  useEffect(() => {
        getInfo();
  });

  return (
    <div>
    <Router>
    
    <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth}/>
    <Switch>
      <Route exact path="/" render={() => !isAuthenticated? <Redirect to='/login' /> : <Redirect to='/front' setAuth={setAuth}/>} />
      <Route exact path="/login" render={props => !isAuthenticated? <Login {...props} setAuth={setAuth} /> : <Redirect to='/front' />}/>
      <Route exact path="/signup" render={props => !isAuthenticated? <Signup {...props} setAuth={setAuth} /> : <Redirect to='/front' />}/>
      <Route exact path="/front" render={props => isAuthenticated? <Front {...props} /> : <Redirect to='/login' setAuth={setAuth} />} />
      <Route exact path="/create-post" render={props =>  isAuthenticated? <CreatePage {...props} /> : <Redirect to='/login' setAuth={setAuth} /> } />
      <Route exact path="/posts/:id" render={props =>  isAuthenticated? <PostPage {...props} /> : <Redirect to='/login' setAuth={setAuth} /> } />
      <Route exact path="/bookmarked" render={props =>  isAuthenticated? <Bookmarks {...props} /> : <Redirect to='/login' setAuth={setAuth} /> } />
      <Route exact path="/administrator" render={props =>  isAuthenticated? <Administrator {...props} /> : <Redirect to='/login' setAuth={setAuth} /> } />
      <Route exact path="/profile" render={props =>  isAuthenticated? <Profile {...props} /> : <Redirect to='/login' setAuth={setAuth} /> } />
    </Switch>
    
    </Router>
    </div>
    );
  };

export default App;
