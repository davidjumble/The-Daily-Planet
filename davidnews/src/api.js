import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get("https://davids-northcoder-news.herokuapp.com/api/articles")
    .then(res => res.data.articles);
};

export const fetchOneArticle = id => {
  return axios
    .get(`https://davids-northcoder-news.herokuapp.com/api/articles/${id}`)
    .then(res => res.data.article[0]);
};

export const fetchArticlesByTopic = topic => {
  return axios
    .get(
      `https://davids-northcoder-news.herokuapp.com/api/topics/${topic}/articles`
    )
    .then(res => res.data.articles);
};

export const fetchComments = id => {
  return axios
    .get(
      `https://davids-northcoder-news.herokuapp.com/api/articles/${id}/comments`
    )
    .then(res => res.data.comments);
};

export const voteOnComment = (ballot, id) => {
  return axios.put(
    `https://davids-northcoder-news.herokuapp.com/api/comments/${id}?vote=${ballot}`
  );
};

export const voteOnArticle = (ballot, id) => {
  return axios
    .put(
      `https://davids-northcoder-news.herokuapp.com/api/articles/${id}?vote=${ballot}`
    )
    .then(res => {
      return res.data.article;
    });
};

export const postComment = (id, commentToPost) => {
  return axios
    .post(
      `https://davids-northcoder-news.herokuapp.com/api/articles/${id}/comments`,
      commentToPost
    )
    .then(res => res.data.Comment);
};
