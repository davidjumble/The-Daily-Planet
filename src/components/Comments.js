import React, { Component } from "react";
import * as api from "../api";
import PostComment from "./PostComment";
class Comments extends Component {
  state = {
    comments: []
  };

  componentDidMount = async () => {
    let id = this.props.id;
    this.fetchCommentsById(id);
  };

  componentDidUpdate = async prevProps => {
    if (this.props !== prevProps) {
      let id = this.props.id;
      this.fetchCommentsById(id);
    }
  };

  fetchCommentsById = async () => {
    let id = this.props.id;
    let comments;

    comments = await api.fetchComments(id);
    // I need to sort these no doubt about that
    this.setState({ comments });
  };

  handlePostCommentClick = commentToPost => {
    const id = this.props.id;

    api.postComment(id, commentToPost).then(comment => {
      const oldComments = this.state.comments.map(comment => {
        return { ...comment };
      });
      this.setState({
        comments: [comment, ...oldComments]
      });
    });
  };

  vote = (ballot, id) => {
    // propbs should make this a map
    api.voteOnComment(ballot, id).then(() => this.fetchCommentsById(id));
  };

  render() {
    const comments = this.state.comments;

    return (
      <div className="centering-box">
        <div className="comments-top">
          <p>COMMENTS</p>
          <PostComment
            handleClick={this.handlePostCommentClick}
            id={this.props.id}
          />
        </div>
        {comments.map(comment => {
          //colour randomiser
          const colours = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e " };
          let colourID = colours[Math.floor(Math.random() * 3)];
          //comments body
          return (
            <div className="comments" id={colourID} key={comment._id}>
              <p>{comment.body}</p>
              <p>votes{comment.votes}</p>
              <button onClick={() => this.vote("up", comment._id)}>up</button>
              <button onClick={() => this.vote("down", comment._id)}>
                down
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comments;
