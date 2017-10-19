const server = require('./serve/index')
module.exports = {
    port: 80,
    livereload: false,
    gzip: true,
    onRoute: (pathname, req, resp, memory) => {
        req.PROD = true
        server(pathname, req, resp, memory)
    }
}