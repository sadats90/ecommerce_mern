const notFound = (req, res, next) => {
    const error = new Error(`not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    let statutCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message


    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'resource not found'
        statutCode = 404
    }

    res.status(statutCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export {errorHandler,notFound}
