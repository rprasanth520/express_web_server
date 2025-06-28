const { logEvents } = require('./logEvents');

const errorEvents = (err, req, res, next) => {
    console.error(err.stack);
    const message = `${err.name}: ${err.message}\t${req.method}\t${req.url}`;
    logEvents(message, 'errLog.txt'); // Log the error message to errLog.txt
    res.status(500).send('Something broke!'); // Send a 500 Internal Server Error response
}
module.exports = errorEvents;