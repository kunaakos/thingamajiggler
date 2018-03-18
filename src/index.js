// Directory aliases are configured in package.json and prefixed with "#".
// https://www.npmjs.com/package/module-alias
require('module-alias/register')

const { send } = require('micro')
const match = require('fs-router')(__dirname + '/routes')

module.exports = async function(req, res) {
  const matched = match(req)
  if (matched)  {
    try {
      return await matched(req, res)
    } catch (err) {
      send(res, 400, { error: err })
    }
  } else {
    send(res, 404, { error: 'resource not found' })
  }
}
