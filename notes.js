import React from "react";
import PT from "prop-types";
import * as api from "./api";
import Article from "./Article";
import { Link } from "react-router-dom";

class Articles extends React.Component {
  state = {
    articles: []
  };

  // componentDidMount() {
  //   api.fetchArticles().then(res => {
  //     this.setState({articles})
  //   })
  // }

  componentDidMount = async () => {
    this.fetchArticles();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.fetchArticles();
    }
  };

  fetchArticles = async () => {
    let articles;
    if (this.props.match.params.topic) {
      articles = await api.fetchArticlesByTopic(this.props.match.params.topic);
    } else {
      articles = await api.fetchArticles();
    }
    this.setState({ articles });
  };

  render() {
    const { articles } = this.state;
    return (
      <div>
        {articles.map(article => {
          return (
            <Link to={`/articles/${article._id}`} key={article._id}>
              <p>{article.title}</p>
            </Link>
          );
        })}
      </div>
    );
  }

  static propTypes = {};
}

export default Articles;
