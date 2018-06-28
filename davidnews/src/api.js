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

export const fetchComments = id => {
  return axios
    .get(
      `https://davids-northcoder-news.herokuapp.com/api/articles/${id}/comments`
    )
    .then(res => res.data.comments);
};

export const commentPollingStation = (ballot, id) => {
  return axios.put(
    `https://davids-northcoder-news.herokuapp.com/api/comments/${id}?${ballot}`
  );
};
