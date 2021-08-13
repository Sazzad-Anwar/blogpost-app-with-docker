const protectRoute = async (req, res, next) => {
    const { user } = req.session;

    if (!user) {
        res
            .status(403)
            .json({
                status: 'failed',
                isSuccess: false,
                code: 403,
                message: 'Unauthorized'
            })
    } else {
        next();
    }
}

module.exports = protectRoute;