import Singnup from './components/signup'
import Login from './components/login'
import {BrowserRouter as Router , Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={Singnup}/>
        </Switch>
    </Router>
    </div>
    );
  };

export default App;
