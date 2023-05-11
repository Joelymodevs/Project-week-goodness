const express = require("express");
const app = express();
const { fetchTopics, fetchEndpoints, fetchArticleById } = require("./controllers");
const { handle500, handle400 } = require("./errorhandles");
app.use(handle500);
app.use(handle400)

app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles/:article_id', fetchArticleById)

app.use((req, res, next) => {
  res.status(404).json("Invalid endpoint");
});



module.exports = app;
