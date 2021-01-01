// modules =================================================
const express = require('express');
const app = express();
const qs = require('querystring');
const request = require('request');
// set our port
const port = 3000;
app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

var clientId = process.env.CLIENT_ID || 'dj0yJmk9Z2o5WjJMa2E2TUx0JmQ9WVdrOVdtaHdZMGMwUm1rbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYx';
var clientSecret = process.env.CLIENT_SECRET || '8bccd1d9bcd18dbef78ca7111caa6970f4ef32a9';
var redirectUri = process.env.REDIRECT_URI || 'https://draft-client.herokuapp.com/auth/yahoo/callback';
app.get('/auth/yahoo', function(req, res) {
    var authorizationUrl = 'https://api.login.yahoo.com/oauth2/request_auth';
  
    var queryParams = qs.stringify({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code'
    });
  
    res.redirect(authorizationUrl + '?' + queryParams);
});

app.get('/auth/yahoo/callback', function(req, res) {
    var accessTokenUrl = 'https://api.login.yahoo.com/oauth2/get_token';
  
    var options = {
      url: accessTokenUrl,
      headers: { Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64') },
      rejectUnauthorized: false,
      json: true,
      form: {
        code: req.query.code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }
    };

    request.post(options, function(err, response, body) {

        var options2 = {
            url: 'https://fantasysports.yahooapis.com/fantasy/v2/leagues',
            headers: { Authorization: 'Bearer ' + body.access_token },
            rejectUnauthorized: false,
            json: true
        };

        request.get(options2, function(err, response, body) {
            res.send(body);
        });
    });
});



// startup our app
app.listen(process.env.PORT || port, ()=> console.log(`Example app listening on port ${port}!`));