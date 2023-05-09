const { getTopics, getEndpoints} = require('./models')


exports.fetchTopics = (req, res) => {
    getTopics().then((result) => {
        res.status(200).send(result)
    })
}

exports.fetchEndpoints = (req, res) => {
    getEndpoints().then((result) => {
        res.status(200).send(result)
    })
}