import React from 'react'
// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';

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
      </Switch>
    </Router>
  );
}

export default App;
