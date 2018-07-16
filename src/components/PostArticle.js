import React, { Component } from "react";
import currentUserId from "./UserContext.js";

class PostArticle extends Component {
  state = {
    newArticle: {
      body: "",
      title: "",
      created_by: ""
    }
  };

  handlePostArticleInput = (e, id) => {
    const titleOrBody = e.target.placeholder;

    let newText = {
      [titleOrBody]: e.target.value
    };
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        ...newText,
        created_by: id
      }
    });
  };

  callClickAndResetState = () => {
    this.props.handleClick(this.state.newArticle);
    this.setState({
      newArticle: {
        body: "",
        title: "",
        created_by: ""
      }
    });
  };

  render() {
    return (
      <div className="comments-top">
        <currentUserId.Consumer>
          {id => (
            <div>
              <input
                maxLength="30"
                placeholder="title"
                value={this.state.newArticle.title}
                onChange={e => {
                  this.handlePostArticleInput(e, id);
                }}
              />
              <input
                className="body-box"
                contentEditable="true"
                placeholder="body"
                value={this.state.newArticle.body}
                onChange={e => {
                  this.handlePostArticleInput(e, id);
                }}
              />
            </div>
          )}
        </currentUserId.Consumer>

        <button onClick={this.callClickAndResetState} type="button">
          Sharing is Caring
        </button>
      </div>
    );
  }
}

export default PostArticle;
