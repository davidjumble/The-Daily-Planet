import React, { Component } from "react";

class AddComment extends Component {
  state = {
    newComment: {
      comment: "",
      created_by: "5b2bcaee3c8d14366003c34e"
    }
  };
  //created by currently hardcoded so will have to change if I add user functionality or re-seed;

  handlePostCommentInput = e => {
    let newCommentBody = e.target.value;
    this.setState({
      ...this.state,
      newComment: {
        comment: newCommentBody,
        created_by: "5b2bcaee3c8d14366003c34e"
      }
    });
  };

  render() {
    return (
      <div>
        <input
          value={this.state.newComment.comment}
          onChange={this.handlePostCommentInput}
        />
        <button
          onClick={() => this.props.handleClick(this.state.newComment)}
          type="button"
        >
          Tell Them How You Really Feel
        </button>
      </div>
    );
  }
}

export default AddComment;
