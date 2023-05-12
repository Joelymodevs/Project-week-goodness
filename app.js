const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
const { fetchTopics, fetchEndpoints, fetchAllArticles } = require("./controllers");
const { handle500 } = require("./errorhandles");
app.use(handle500);

app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles', fetchAllArticles)

app.use((req, res, next) => {
  res.status(404).json("Invalid endpoint");
});





module.exports = app;
