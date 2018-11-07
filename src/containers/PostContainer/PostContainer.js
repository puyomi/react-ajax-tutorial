import React, { Component } from "react";
import { PostWrapper, Navigate, Post, Warning } from "../../components";
import * as service from "../../services/post";

class PostContainer extends Component {
  constructor(props) {
    super();
    // initializes component state
    this.state = {
      postId: 1,
      fetching: false, // tells whether the request is waiting for response or not
      post: {
        title: null,
        body: null
      },
      comments: [],
      warningVisibility: false
    };
  }

  fetchPostInfo = async postId => {
    this.setState({
      fetching: true
    });

    try {
      // wait for two promises
      const info = await Promise.all([
        service.getPost(postId),
        service.getComments(postId)
      ]);

      console.log("---------------------");
      console.log(info);
      console.log("---------------------");

      // Object destructuring Syntax,
      // takes out required values and create references to them
      const { title, body } = info[0].data;
      const comments = info[1].data;

      this.setState({
        postId,
        post: {
          title,
          body
        },
        comments,
        fetching: false //done!
      });
    } catch (e) {
      // if err, stop at this point
      this.setState({
        fetching: false
      });
      this.showWarning();
      console.log(e);
    }
  };

  // fetchPostInfo = async postId => {
  //   const post = await service.getPost(postId);
  //   console.log(post);
  //   const comments = await service.getComments(postId);
  //   console.log(comments);
  // };

  componentDidMount() {
    this.fetchPostInfo(1);
  }

  handleNavigateClick = type => {
    const postId = this.state.postId;

    if (type === "NEXT") {
      this.fetchPostInfo(postId + 1);
    } else {
      this.fetchPostInfo(postId - 1);
    }
  };

  showWarning = () => {
    this.setState({
      warningVisibility: true
    });
    setTimeout(() => {
      this.setState({
        warningVisibility: false
      });
    }, 1500);
  };

  render() {
    const { postId, post, fetching, comments, warningVisibility } = this.state;
    return (
      <PostWrapper>
        <Navigate
          onClick={this.handleNavigateClick}
          postId={postId}
          disabled={fetching}
        />
        <Post
          postId={postId}
          title={post.title}
          body={post.body}
          comments={comments}
        />
        <Warning message="포스트가없쪙" visible={warningVisibility} />
      </PostWrapper>
    );
  }
}

export default PostContainer;
