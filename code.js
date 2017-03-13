'use strict';

var HashIds = require('hashids');
var Url = require('./url');
var validUrl = require('valid-url');

var hashIds = new HashIds('', 4, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');

function isValid(url) {
	return validUrl.isWebUri(url) === url;
};

function encode(url, callback) {
 
    if (!isValid(url))
        return callback(new Error('Wrong url format!'));
  
    Url.findOne({ originalUrl: url}, (err, data) => {

        if (err) return callback(err);

        if (data) {
            return callback(null, hashIds.encodeHex(data._id));
        }
        else {
            Url.create({ originalUrl: url }, (err, data) => {

                if (err) callback(err);
         
                return callback(null, hashIds.encodeHex(data._id));

            });
        }

    });

};

function decode(hash, callback) {
  
    Url.findById(hashIds.decodeHex(hash), (err, url) => {

        if (err)
            return callback(err);

        if (!url)
            return callback(new Error('Make shure it starts with /new/'));

        return callback(null, url.originalUrl);

    });
  
};

module.exports = { encode, decode };
