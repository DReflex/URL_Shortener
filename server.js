'use strict';

var express = require('express');
var mongoose = require('mongoose');
var shortFun = require('./code');

require('./connect/database')();
console.log(mongoose.connection.readyState);
var app = express();

app.use(express.static('public'));


app.get('/new/:url(*)', (req, res) => {
     
    var originalUrl = req.params.url;

    shortFun.encode(originalUrl, (err, encode) => {

        if (err)
            return res.json({ error: err.message });

           var shortened = `https://url-shorter.gomix.me//${encode}`;
        res.json({ 
          original_url: originalUrl, 
          short_url: shortened });

    });

});

app.get('/:encoded', (req, res) => {
  
    var hash = req.params.encoded;
    shortFun.decode(hash, (err, urlDecoded) => {
    
        if (err)
            return res.json({ error: err.message });
    
        res.redirect(urlDecoded);
    
    });
  
});

var listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Running at port ${listener.address().port}`);
});
