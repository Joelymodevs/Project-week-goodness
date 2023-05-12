const express = require("express");
const app = express();
const { fetchTopics, fetchEndpoints, fetchArticleById, fetchCommentsById } = require("./controllers");
const { handle500, psqlErr, handleCustom,} = require("./errorhandles");

app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles/:article_id', fetchArticleById)
app.get('/api/articles/:article_id/comments', fetchCommentsById)

app.use(psqlErr);
app.use(handleCustom);
app.use(handle500);



module.exports = app;
