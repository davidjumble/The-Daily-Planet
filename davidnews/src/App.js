import React, { Component } from "react";
import Articles from "./components/Articles.js";
import Article from "./components/Article.js";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/articles/"> All Articles</Link>
          <Link to="/topics/coding/articles">Coding</Link>
          <Link to="/topics/cooking/articles">Cooking</Link>
          <Link to="/topics/football/articles">Football</Link>

          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/:article_id" component={Article} />
        </div>
      </Router>
    );
  }
}

export default App;
