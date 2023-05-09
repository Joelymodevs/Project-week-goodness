const db = require('./db/connection');
const fs = require('fs/promises')


exports.getTopics = () => {
    return db.query('SELECT * FROM topics').then((results) => {
        return results.rows
    })
}

exports.getEndpoints = () => {
    return fs.readFile(`./endpoints.json`)
}