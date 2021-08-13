//Description: Show an error message on API response if the route is not defined
exports.notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} Not Found`.red.underline);
    res.status(404);
    next(error);
};