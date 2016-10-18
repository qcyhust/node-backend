const register = require('babel-core/register');
const model = require('./model.js');

register({
    presets: ['es2015-node6', 'stage-3']
});

model.sync();

require('./app.js');