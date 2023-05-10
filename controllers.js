const { getTopics, getEndpoints} = require('./models')
const endpoints = require('./endpoints.json')
const { handle500 } = require('./errorhandles')


exports.fetchTopics = (req, res, next) => {
    getTopics().then((result) => {
        res.status(200).send(result)
    }).catch(err => { 
        next(handle500())
    })
}

exports.fetchEndpoints = (req, res, next) => {
    res.status(200).send(endpoints).catch(err => {
        next(err)
    })
}