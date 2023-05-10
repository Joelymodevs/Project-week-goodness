const { getTopics, getEndpoints} = require('./models')


exports.fetchTopics = (req, res) => {
    getTopics().then((result) => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.fetchEndpoints = (req, res) => {
    const endpoints = require('./endpoints.json')
    res.status(200).send(endpoints).catch(err => {
        res.status(500).send(err)
    })
}