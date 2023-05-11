exports.handle500 = (err, res , req , next) => {
    console.log(err);
    res.status(500).send({msg : 'Internal Server Error :('});

}

exports.handle400 = (err, res, req, next) => {
    console.log(err);
    res.status(400).send({msg : '400, bad request'})
}