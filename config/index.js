var fs = require('fs');
var env = process.env.NODE_ENV;
var config = require('./deploy.json');

if (fs.existsSync('./local.json')) {
    config = require('./local.json');
}

module.exports = config[env];
