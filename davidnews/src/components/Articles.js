import React from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import PostArticle from "./PostArticle.js";

class Articles extends React.Component {
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
    const topic = this.props.match.params.topic_slug;
    const articles = await api.fetchArticles(topic);

    this.setState({ articles });
  };

  handlePostArticleClick = articleToPost => {
    const topic = this.props.match.params.topic_slug;
    console.log(topic, "the topic");

    api.postArticle(topic, articleToPost).then(article => {
      console.log(article, "api result");
      const oldArticles = this.state.articles.map(article => {
        return { ...article };
      });
      this.setState({
        articles: [article, ...oldArticles]
      });
    });
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="centering-box">
        {/* conditonal post article box */}
        {this.props.match.params.topic_slug && (
          <PostArticle handleClick={this.handlePostArticleClick} />
        )}
        {articles.map(article => {
          //evaluates element size by vote count
          let size = {
            height: 150 + article.votes * 12,
            width: 150 + article.votes * 12
          };
          //article title element is only rendered if the votes are positive

          if (article.votes < 0) {
            return (
              <div className="articles" style={size} key={article.title}>
                <Link
                  className="title-text"
                  to={`/articles/${article._id}`}
                  key={article._id}
                >
                  <p id="question-mark">?</p>
                </Link>
              </div>
            );
          } else
            return (
              //I need to make the whole element a link but i'd have to rejig the css and its's a short life
              <div className="articles" style={size} key={article.title}>
                <Link
                  className="title-text"
                  to={`/articles/${article._id}`}
                  key={article._id}
                >
                  <p>{article.title}</p>
                </Link>
              </div>
            );
        })}
      </div>
    );
  }

  static propTypes = {};
}

export default Articles;
