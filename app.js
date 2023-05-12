const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const { fetchTopics, fetchEndpoints, fetchAllArticles, fetchArticleById } = require("./controllers");
const { handle500, psqlErr, handleCustom } = require("./errorhandles");

app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles', fetchAllArticles)

app.get('/api/articles/:article_id', fetchArticleById)

app.use(psqlErr);
app.use(handleCustom);
app.use(handle500);




module.exports = app;
