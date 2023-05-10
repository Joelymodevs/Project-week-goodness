exports.handle500 = (err, res , req , next) => {
    if (err) {
        res.status(500).json({ message: 'Internal Server Error :('})
    }  else {
        next(err)
    }

}