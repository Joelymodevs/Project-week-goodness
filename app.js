const express = require("express");
const app = express();

const { fetchTopics, fetchEndpoints, fetchArticleById, fetchCommentsById } = require("./controllers");
const { handle500, psqlErr, handleCustom,} = require("./errorhandles");

=======
const endpoints = require("./endpoints.json");
const { fetchTopics, fetchEndpoints, fetchAllArticles, fetchArticleById } = require("./controllers");
const { handle500, psqlErr, handleCustom } = require("./errorhandles");
const cors = require('cors')
app.use(cors())
app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles', fetchAllArticles)

app.get('/api/articles/:article_id', fetchArticleById)
app.get('/api/articles/:article_id/comments', fetchCommentsById)

app.use(psqlErr);
app.use(handleCustom);
app.use(handle500);




module.exports = app;
