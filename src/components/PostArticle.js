import React, { Component } from "react";

class PostArticle extends Component {
  state = {
    newArticle: {
      body: "",
      title: "",
      created_by: "5b2bcaee3c8d14366003c34e"
    }
  };

  handlePostArticleInput = e => {
    const titleOrBody = e.target.placeholder;

    let newText = {
      [titleOrBody]: e.target.value
    };
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        ...newText,
        created_by: "5b2bcaee3c8d14366003c34e"
      }
    });
  };

  callClickAndResetState = () => {
    this.props.handleClick(this.state.newArticle);
    this.setState({
      newArticle: {
        body: "",
        title: "",
        created_by: "5b2bcaee3c8d14366003c34e"
      }
    });
  };

  render() {
    return (
      <div className="comments-top">
        <input
          maxLength="30"
          placeholder="title"
          value={this.state.newArticle.title}
          onChange={this.handlePostArticleInput}
        />
        <input
          className="body-box"
          contentEditable="true"
          placeholder="body"
          value={this.state.newArticle.body}
          onChange={this.handlePostArticleInput}
        />

        <button onClick={this.callClickAndResetState} type="button">
          Sharing is Caring
        </button>
      </div>
    );
  }
}

export default PostArticle;
