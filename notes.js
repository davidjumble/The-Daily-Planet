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

/*optimistic rendering
//

//errror handlong can push message to props
<Redirect to = "set a route with a /404 page here"

articleVotes

//do api vote call then chain state setting so it has a false condition set with success after a catch error block

this.setState{
  article:{...this.state.article
  votes: this.state.article.votes +1 }
}*/

import React from 'react';
import PT from 'prop-types';
import * as api from './api';
import { Redirect } from 'react-router-dom';

class Article extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    console.log(this.props.history);
    api
      .fetchArticle(this.props.match.params.articleId)
      .then(article => {
        console.log(article);
        this.setState({ article });
      })
      .catch(err => {
        // this.props.history.push('/404');
        this.setState({
          invalidUrl: true
        });
      });
  }

  render() {
    //if no article
    const { article, errMessage } = this.state;
    if (this.state.invalidUrl) return <Redirect to="/404" />;
    return (
      <div>
        <p>{article.title}</p>
        <p>{article.votes}</p>
        {article.confirming && <p>Registering your vote!</p>}
        {article.errMsg && <p>{article.errMsg}</p>}
        <button onClick={() => this.handleVoteClick('up')}>Vote up</button>
        <button onClick={() => this.handleVoteClick('down')}>Vote down</button>
      </div>
    );
  }

  handleVoteClick = direction => {
    api
      .voteOnArticle(this.state.article._id, direction)
      .then(article => {
        this.setState({
          article: {
            ...this.state.article,
            votes: this.state.article.votes + (direction === 'up' ? +1 : -1),
            confirming: false
          }
        });
      })
      .catch(err => {
        this.setState({
          article: {
            ...this.state.article,
            confirming: false,
            errMsg: 'Your vote failed. Please try again soon!'
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

  static propTypes = {};
}

export default Article;







//EVENT LISTENERS
/*

REACT API SYNTHETIC EVENTS
MOUSE EVENTS, UI EVENTS ECT...


*/ 















