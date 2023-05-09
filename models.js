const db = require('./db/connection');

exports.getTopics = () => {
    return db.query('SELECT * FROM topics').then((results) => {
        return results.rows
    })
}