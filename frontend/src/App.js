import Signup from './components/Signup'
import Login from './components/Login'
import {BrowserRouter as Router , Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
        </Switch>
    </Router>
    </div>
    );
  };

export default App;
