const { getTopics, getEndpoints, getArticleById, getCommentsById} = require('./models')
const endpoints = require('./endpoints.json')


exports.fetchTopics = (req, res, next) => {
    getTopics().then((result) => {
        res.status(200).send(result)
    }).catch(err => {
        next(err)
    })
}

exports.fetchEndpoints = (req, res, next) => {
    res.status(200).send(endpoints).catch(err => {
        next(err)
    })
}

exports.fetchArticleById = (req, res, next) => {
    const id = req.params.article_id;
    getArticleById(id).then((result) => {
        res.status(200).send(result)
    }).catch(err => {
        next(err)
    })
}

exports.fetchCommentsById = (req, res, next) => {
    const id = req.params.article_id;
    getCommentsById(id).then((results) => {
        res.status(200).send(results)
    }).catch(err => {
        next(err)
    })
}

exports.postComment = (req, res, next) => {
    const id = req.params.article_id;


}