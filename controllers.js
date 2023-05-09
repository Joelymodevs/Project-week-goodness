const { getTopics } = require('./models')


exports.displayTopics = (req, res) => {
    getTopics().then((result) => {
        res.status(200).send(result)
    })


}