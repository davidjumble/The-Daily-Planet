import React, { Component } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";

class Topic extends Component {
  state = {
    articles: []
  };

  componentDidMount = async () => {
    this.fetchArticles();
  };

  componentDidUpdate = async prevProps => {
    if (this.props !== prevProps) {
      this.fetchArticles();
    }
  };

  fetchArticles = async () => {
    let articles;
    let topic = this.props.match.params.topic_slug;
    console.log(topic);

    articles = await api.fetchArticlesByTopic(topic);

    this.setState({ articles });
  };

  render() {
    const { articles } = this.state;

    return (
      <div>
        {articles.map(article => {
          return (
            <div>
              <Link to={`/articles/${article._id}`} key={article._id}>
                <p>This article is broadly related to {article.belongs_to}</p>
                <p>{article.title}</p>
                <div>{article.body}</div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Topic;
