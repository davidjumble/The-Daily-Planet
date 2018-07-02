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

  componentDidUpdate = async prevProps => {
    console.log(this.props, "single article props");
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

  vote = (ballot, id) => {
    api
      .voteOnArticle(ballot, id)
      .then(article => {
        this.setState({
          article: {
            ...this.state.article,
            votes: this.state.article.votes + (ballot === "up" ? +1 : -1),
            confirming: false
          }
        });
      })
      .catch(err => {
        this.setState({
          article: {
            ...this.state.article,
            confirming: false,
            errMsg: "Democracy has failed try Full Speed Socialism"
          }
        });
      });
    this.setState({
      article: {
        ...this.state.article,
        confirming: true
      }
    });
  };

  render() {
    const article = this.state.article;

    return (
      <div>
        <div>{article.body}</div>
        <p>votes{article.votes}</p>
        {article.confirming && <p> Thank you for voting democracy works!</p>}
        {article.errMsg && <p>{article.errMsg}</p>}

        <button onClick={() => this.vote("up", article._id)}>up</button>
        <button onClick={() => this.vote("down", article._id)}>down</button>
        <Comments id={this.props.match.params.article_id} />
      </div>
    );
  }
}

export default Article;
