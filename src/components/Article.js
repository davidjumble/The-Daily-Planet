import React, { Component } from "react";
import * as api from "../api";
import Comments from "../components/Comments";
import { Redirect } from "react-router-dom";

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
    try {
      article = await api.fetchOneArticle(id);
      this.setState({ article });
    } catch (err) {
      this.setState({ invalidURL: true });
    }
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
    if (this.state.invalidURL) {
      return (
        <Redirect
          to={{
            pathname: "/404",
            state: { from: "articles" }
          }}
        />
      );
    }

    return (
      <div>
        <div className="centering-box">
          <div className="article" />
          <div className="article ">
            {article.title}
            <br />
            <br />
            {article.body}
          </div>
          <div className="article" />
          <p className="votes">votes{article.votes}</p>

          {article.confirming && (
            <p className="votes"> Thank you for voting democracy works!</p>
          )}
          {article.errMsg && <p>{article.errMsg}</p>}
          <div className="votes">
            <button onClick={() => this.vote("up", article._id)}>up</button>
            <button onClick={() => this.vote("down", article._id)}>down</button>
          </div>
        </div>
        <Comments id={this.props.match.params.article_id} />
      </div>
    );
  }
}

export default Article;
