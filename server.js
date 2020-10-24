require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const mongoose = require('mongoose')
const path = require('path') 
const app = express();
const PORT = process.env.PORT || 4000;


// mongoose
//     .connect('mongodb://127.0.0.1:27017/mini-proj', { useNewUrlParser: true })
//     .then(x => console.log('Connected to Mongo!'))
//     .catch(err => console.log(err))
//     const connection = mongoose.connection;

// MIDDLEWARE SETUP

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_POINT
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
})

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
   
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

app.use('/', require('./routes/index'))
app.use('/api', require('./routes/playlists'))
app.use('/api', require('./routes/search'))


if (PORT == null || PORT == "") {
  PORT = 8000;
}
app.listen(PORT);

module.exports = app;