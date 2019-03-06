import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './pages/Home';
import Euro from './pages/Euro';
import App from './App';

class routes extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
          </ul> */}
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/app" component={App} />
            <Route exact path="/euro" component={Euro} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default routes;
