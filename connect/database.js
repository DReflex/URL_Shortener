'use strict';

var mongoose = require("mongoose")
module.exports = function(){
var mLab = "mongodb://<dbuser>:<dbpassword>@ds127730.mlab.com:27730/url"
var options={
  user: 'url',
  pass: 'password'
}
mongoose.connect(mLab, options)
};