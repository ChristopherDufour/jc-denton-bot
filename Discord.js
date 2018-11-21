const https = require('https')
const path = require('path')
const querystring = require('querystring')

const API_HOST = 'discordapp.com'
const API_ENDPOINT = '/api/v6'

class Discord {
  constructor() {
    this.token = null
  }
  async login(clientId, clientSecret) {
    let postData = querystring.stringify({
      grant_type: 'client_credentials',
      scope: 'webhook.incoming',
      client_id: this.clientId,
      client_secret: this.clientSecret
    })

    const options = {
      hostname: API_HOST,
      path: path.join(API_ENDPOINT, '/oauth2/token'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    return new Promise(resolve => {
      let req = https.request(options, res => {
        res.setEncoding('utf8')

        let responseString = ''

        res
          .on('data', chunk => {
            responseString += chunk
          })
          .on('end', () => {
            console.log('Login Response:')
            console.log(JSON.parse(responseString))
            this.token = JSON.parse(responseString)['access_token']
            resolve()
          })
      })

      req.write(postData)
      req.end()
    })
  }
}
module.exports = Discord
