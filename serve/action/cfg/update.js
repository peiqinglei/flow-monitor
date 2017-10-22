const { IncomingForm } = require('formidable')
const { rename } = require('fs')
const { paths } = require('../../../config.js')

const commonParse = (req, uploadDir, filename) => new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.uploadDir = uploadDir
    form.parse(req, (err, fields, files) => {
        const k = Object.keys(files)[0]
        if (err || !k) {
            reject(err || new Error('no file!'))
        } else {
            rename(files[k].path, uploadDir + filename, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve({success: true})
                }
            })
        }
    })
})
exports.updateFlowpp = (req, resp) => commonParse(req, paths.flowpp, 'flowpp')
exports.updateProps = (req, resp) => commonParse(req, paths.properties, 'prop')
exports.updateWeb = (req, resp) => commonParse(req, paths.web, 'web.zip')
