exports.handleCustom = (err, req, res, next) => {
    console.log(err)
if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.psqlErr = (err, req, res, next) => {
    console.log(err)
    if (err.code === '22P02') {
        res.status(400).send({msg: 'invalid input'});
    } else {
        next(err)
    }
}
exports.handle500 = (err, req , res , next) => {
    console.log(err);
    res.status(500).send({msg : 'Internal Server Error :('});

}
