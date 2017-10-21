const path = require('path')
const btoa = str => Buffer.from(str).toString('base64')
const { existsSync, writeFileSync, readFileSync } = require('fs')
const AuthorizeConfigFile = path.join(__dirname, '../../../flow-authorization')
let authorization = btoa('admin:admin')
if (!existsSync(AuthorizeConfigFile)) {
    writeFileSync(AuthorizeConfigFile, authorization)
}

exports.authorize = (req, resp) => {
    const {
        headers = {}
    } = req
    if (headers.authorization !== 'Basic ' + authorization) {
        resp.statusCode = 401
        resp.setHeader('WWW-Authenticate', 'Basic realm="example"')
        resp.end('Access denied')
    } else {
        return true
    }
}
exports.changePass = (req, resp) => {
    if (req.post) {
        authorization = btoa(`admin:${req.body}`)
        writeFileSync(AuthorizeConfigFile, authorization)
        return {
            success: true
        }
    } else {
        return {
            success: false
        }
    }
}
