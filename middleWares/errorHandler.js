module.exports = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(`${err}`.red);
    if (err) {
        this.logger(err.message, err.stack, req.ip)
        res.json({
            message: err.message,
            isSuccess: false,
            code: statusCode,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    } else {
        next();
    }
};