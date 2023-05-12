const db = require('./db/connection');
const fs = require('fs/promises')
const endpoints = require('./endpoints.json')



exports.getTopics = () => {
    return db.query('SELECT * FROM topics').then((results) => {
        return results.rows
    })
}

exports.getArticleById = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [id]).then(({ rows }) => {
        const article = rows[0];
        if(!article) {
            return Promise.reject({
                status: 404,
                msg: `no article found`
            });
        }
        return article;
    });
}

exports.getCommentsById = (id) => {
  return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;', [id]).then((result) => {
    const comments = result.rows;
    if(!comments) {
      return Promise.reject({
        status: 404,
        msg: 'no comments found'
      })
    }
    return comments;
  })
}