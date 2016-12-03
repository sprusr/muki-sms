var muki = require('muki')
var Nexmo = require('nexmo')
var express = require('express')

var nexmo = new Nexmo({
    apiKey: '457a3824',
    apiSecret: 'e9a3d22b96e880f7',
  })

var app = express()

app.get('/muki-sms', function(req, res) {
  console.log('Got SMS from ' + req.query.msisdn)
  muki.getDeviceName('0003643', function(err, deviceId) {
    muki.convertImage(req.query.text, function(err, buffer) {
      if(err) {
        nexmo.message.sendSms('447507332145', req.query.msisdn, 'Error converting image!', function(err) {
          console.log('Error converting image!')
        })
      } else {
        console.log('Sending to Muki')
        muki.sendBuffer(deviceId, buffer, function(err) {
          nexmo.message.sendSms('447507332145', req.query.msisdn, 'Sent to Muki!', function(err) {
            console.log('Muki updated, SMS sent')
          })
        })
      }
    })
  })
  res.sendStatus(200)
})

app.listen(8080, function() {
  console.log('Listening on 8080')
})
