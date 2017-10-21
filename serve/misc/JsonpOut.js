const zlib = require('zlib')
module.exports = (fn) => (req, resp) => {
    const {callback} = req.data
    resp.writeHead(200, {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json; charset=utf-8'
    })
    resp.end(zlib.gzipSync(callback + '(' + JSON.stringify(fn(req, resp)) + ')'))
    return false
}
