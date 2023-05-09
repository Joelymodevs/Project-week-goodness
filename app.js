const express = require('express');
const app = express();
const { fetchTopics, fetchEndpoints } = require('./controllers')

app.get('/api/topics', fetchTopics);
app.get('/api', fetchEndpoints)

app.use((req, res, next) => {
    res.status(404).json('Invalid endpoint')
}) 



app.listen(9090, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('listening on port 9090')
    }
})

module.exports = app;