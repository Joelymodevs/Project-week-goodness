exports.handle500 = (err, res , req , next) => {
    console.log(err);
    res.status(500).send({msg : 'Internal Server Error :('});

}

exports.handleCustom = (err, res, req, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      } else next(err);
    };

exports.psqlErr = (err, res, req, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'invalid input'});
    } else  next(err) 
}