var fs = require('fs');
var env = process.env.NODE_ENV;
var config = require('./deploy.json');

if (fs.existsSync(__dirname + '/local.json')) {
    config = require('./local.json');
}
module.exports = config[env];
