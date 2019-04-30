import React, { Component } from "react";
import Articles from "./components/Articles.js";
import Article from "./components/Article.js";
import Culdesac from "./components/Culdesac.js";
import currentUserId from "./components/UserContext.js";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <currentUserId.Provider value="5b2bcaee3c8d14366003c34e">
          <div>
            <nav className="centering-box">
              <Link className="navs" to="/articles/">
                All Articles
              </Link>
              <Link className="navs" to="/topics/coding/articles">
                Coding
              </Link>
              <Link className="navs" to="/topics/cooking/articles">
                Cooking
              </Link>
              <Link className="navs" to="/topics/football/articles">
                Football
              </Link>
            </nav>
            <Route exact path="/articles" component={Articles} />
            <Route
              exact
              path="/topics/:topic_slug/articles"
              component={Articles}
            />
            <Route exact path="/articles/:article_id" component={Article} />
            <Route exact path="/404" component={Culdesac} />
          </div>

          <div className="errorWrapper">We are very sorry but articles are not loading at the moment</div>
        </currentUserId.Provider>
      </Router>
    );
  }
}

export default App;
