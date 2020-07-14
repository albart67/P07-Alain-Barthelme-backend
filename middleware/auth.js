

module.exports = (req, res, next) => {
    if (req.body.name == nul) {
        res.status(403)
        return res.send('You need to sign in')
    }

    next()
}

