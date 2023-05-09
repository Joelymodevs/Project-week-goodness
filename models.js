const db = require('./db/connection');

exports.getTopics = () => {
    return db.query('SELECT * FROM topics').then((results) => {
        const display = results.rows.map(row => ({
            slug: row.slug,
            description: row.description
        }));
        return display;
    })
}