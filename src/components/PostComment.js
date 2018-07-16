import React, { Component } from "react";
import currentUserId from "./UserContext.js";

class AddComment extends Component {
  state = {
    newComment: {
      comment: "",
      created_by: ""
    }
  };
  //created by currently hardcoded so will have to change if I add user functionality or re-seed;

  handlePostCommentInput = (e, id) => {
    let newCommentBody = e.target.value;
    this.setState({
      ...this.state,
      newComment: {
        comment: newCommentBody,
        created_by: id
      }
    });
  };

  render() {
    return (
      <div>
        <currentUserId.Consumer>
          {id => (
            <input
              value={this.state.newComment.comment}
              onChange={e => {
                console.log(id);
                this.handlePostCommentInput(e, id);
              }}
            />
          )}
        </currentUserId.Consumer>
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
