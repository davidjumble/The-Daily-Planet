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
    console.log(e.target.placeholder);
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
    console.log(this.state.newArticle, "updated state");
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
          maxLength="20"
          placeholder="title"
          value={this.state.newArticle.title}
          onChange={this.handlePostArticleInput}
        />
        <input
          className="body-box"
          contenteditable="true"
          placeholder="body"
          value={this.state.newArticle.body}
          onChange={this.handlePostArticleInput}
        />

        <button onClick={this.callClickAndResetState} type="button">
          Share yer futile musings
        </button>
      </div>
    );
  }
}

export default PostArticle;
