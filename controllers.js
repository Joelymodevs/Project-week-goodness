const { getTopics, getEndpoints} = require('./models')
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