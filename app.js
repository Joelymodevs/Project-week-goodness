const express = require('express');
const app = express();
const { displayTopics } = require('./controllers')


app.get('/api/topics', displayTopics)




app.listen(9090, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('listening on port 9090')
    }
})

module.exports = app;