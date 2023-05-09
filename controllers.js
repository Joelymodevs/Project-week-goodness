const { getTopics } = require('./models')


exports.fetchTopics = (req, res) => {
    getTopics().then((result) => {
        res.status(200).send(result)
    })


}