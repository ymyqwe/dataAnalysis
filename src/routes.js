import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './pages/Home';
// import Euro from './pages/Euro';
import RuralLove from './pages/RuralLove';
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
            {/* <Route exact path="/euro" component={Euro} /> */}
            <Route exact path="/rural/love" component={RuralLove} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default routes;
