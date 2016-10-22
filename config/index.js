var fs = require('fs');
var config = require('./deploy.json');

if (fs.existsSync('./local.json')) {
    config = require('./local.json');
}

module.exports = config;
