const express = require("express");
const app = express();
const { fetchTopics, fetchEndpoints, fetchArticleById } = require("./controllers");
const { handle500, psqlErr, handleCustom, handle400, handle404 } = require("./errorhandles");

app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles/:article_id', fetchArticleById)

app.use(psqlErr);
// app.use(handle404);
// app.use(handle400);
app.use(handleCustom);
app.use(handle500);



module.exports = app;
