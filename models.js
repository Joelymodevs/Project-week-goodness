const db = require('./db/connection');
const fs = require('fs/promises')
const endpoints = require('./endpoints.json')



exports.getTopics = () => {
    return db.query('SELECT * FROM topics').then((results) => {
        return results.rows
    })
}

exports.getArticleById = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [id]).then((results) => {
        return results.rows
    });
}