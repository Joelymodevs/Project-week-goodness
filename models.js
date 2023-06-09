const db = require("./db/connection");
const fs = require("fs/promises");
const endpoints = require("./endpoints.json");


exports.getTopics = () => {
  return db.query("SELECT * FROM topics").then((results) => {
    return results.rows;
  });
}

exports.getTopics = () => {
  return db.query("SELECT * FROM topics").then((results) => {
    return results.rows;
  });
};


exports.getEndpoints = () => {
  JSON.stringify(endpoints);
};

exports.getAllArticles = () => {
  return db
    .query(
      `SELECT articles.article_id,
      articles.title,
      articles.author,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.article_id)::int AS 
      comment_count 
      FROM articles 
      LEFT JOIN comments ON 
      articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC`
    )
    .then((results) => {
      return results.rows;
    });

};

exports.getArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `no article found`,
        });
      }
      return article;
    });
};

exports.getCommentsById = (id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
      [id]
    )
    .then((result) => {
      const comments = result.rows;
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "no comments found",
        });
      }
      return comments;
    });
};

exports.postCommentById = (id, comment) => {
  if (!id) {
    return Promise.reject({
      status: 404,
      msg: "No Article Found",
    });
  }
  return db
    .query(
      `INSERT INTO comments (article_id, author, body)
  VALUES ($1, $2, $3) RETURNING *`,
      [id, comment.author, comment.body]
    )
    .then((result) => {
      return result.rows;
    });

};


exports.submitVotes = (id, votes) => {
  if (!typeof votes === "number") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }

  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [votes, id]
    )
    .then((result) => {
      return result.rows[0]
    });
};

