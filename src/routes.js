import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import React, {Component} from "react";
import Home from "./pages/Home";

class routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/"> Home </Link>{" "}
            </li>{" "}
          </ul>
          <hr />
          <Route exact path="/" component={Home} />{" "}
        </div>
      </Router>
    );
  }
}

export default routes;
