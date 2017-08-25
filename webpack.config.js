const path = require('path');

module.exports = {
    entry: './taktik-polymer-typeScript.ts',
    output: {
        filename: 'taktik-polymer-typeScript.js',
        path: path.resolve(__dirname)
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        loaders: [
            { test: /.ts$/, loader: 'awesome-typescript-loader' }
        ]
    }
};