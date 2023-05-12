const db = require("./db/connection");
const fs = require("fs/promises");
const endpoints = require("./endpoints.json");

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
      RIGHT JOIN comments ON 
      articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC`
    )
    .then((results) => {
      return results.rows;
    });
};
