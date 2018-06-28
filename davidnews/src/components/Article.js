import React, { Component } from "react";
import * as api from "../api";
import Comments from "../components/Comments";

//do seperate api call in this guy

class Article extends Component {
  state = { article: {} };

  componentDidMount = async () => {
    let id = this.props.match.params.article_id;
    this.fetchArticleById(id);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props !== prevProps) {
      let id = this.props.match.params.article_id;
      this.fetchArticleById(id);
    }
  };

  fetchArticleById = async () => {
    let id = this.props.match.params.article_id;
    let article;

    article = await api.fetchOneArticle(id);
    this.setState({ article });
  };

  render() {
    const article = this.state.article;

    return (
      <div>
        <div>{article.body}</div>
        <Comments id={this.props.match.params.article_id} />
      </div>
    );
  }
}

export default Article;
