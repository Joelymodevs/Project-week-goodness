const db = require('./db/connection');
const fs = require('fs/promises')
const endpoints = require('./endpoints.json')



exports.getTopics = () => {
    return db.query('SELECT * FROM topics').then((results) => {
        return results.rows
    })
}

exports.getEndpoints = () => {
    JSON.stringify(endpoints)
}

exports.getAllArticles = () => {
    return db.query(`ALTER TABLE articles ADD COLUMN comment_count
    INTEGER DEFAULT 0;`).then((result) => {
        return result.rows
    })
    // .then(() => {
    //     return db.query(`UPDATE articles AS comm
    //     SET comment_count = (
    //         SELECT COUNT(*)
    //         FROM comments
    //         WHERE article_id = comm.article_id
    //     );`)
    // }).then(() => {
    //     return db.query(`SELECT * FROM articles`)
    // })
}