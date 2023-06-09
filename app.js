const express = require("express");
const app = express();
const { fetchTopics, fetchEndpoints, fetchAllArticles, fetchArticleById, fetchCommentsById, uploadCommentById, updateVotes} = require("./controllers");
const { handle500, psqlErr, handleCustom } = require("./errorhandles");
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.get("/api", fetchEndpoints)
app.get("/api/topics", fetchTopics);
app.get('/api/articles', fetchAllArticles)

app.get('/api/articles/:article_id', fetchArticleById)
app.get('/api/articles/:article_id/comments', fetchCommentsById)
app.post('/api/articles/:article_id/comments', uploadCommentById)
app.patch('/api/articles/:article_id' ,updateVotes)
app.use(psqlErr);
app.use(handleCustom);
app.use(handle500);




module.exports = app;
