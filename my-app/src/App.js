import React from 'react'
// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import MakeAccount from './Components/makeAccount/makeAccount';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Main">
          <Main />
        </Route>
        <Route exact path="/createAccount">
          <MakeAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
