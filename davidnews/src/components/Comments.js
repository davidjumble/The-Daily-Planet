import React, { Component } from "react";
import * as api from "../api";
class Comments extends Component {
  state = { comments: [] };

  componentDidMount = async () => {
    let id = this.props.id;
    this.fetchCommentsById(id);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props !== prevProps) {
      let id = this.props.id;
      this.fetchCommentsById(id);
    }
  };

  fetchCommentsById = async () => {
    let id = this.props.id;
    let comments;

    comments = await api.fetchComments(id);
    this.setState({ comments });
  };

  vote = ballot => {
    let id = this.props.id;
    api.commentPollingStation(ballot, id);
  };

  render() {
    const comments = this.state.comments;
    return (
      <div>
        <p>comments</p>

        {comments.map(comment => {
          return (
            <div>
              <p>{comment.body}</p>
              <p>votes{comment.votes}</p>
              <button onClick={this.vote("up")}>up</button>
              <button onClick={this.vote("down")}>down</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comments;
