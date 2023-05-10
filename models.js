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