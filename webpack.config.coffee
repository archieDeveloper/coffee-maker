path    = require 'path'
webpack = require 'webpack'

module.exports =
    entry: './source/index.coffee'
    output:
        path: path.join __dirname, 'build/'
        filename: 'bundle.js'
    module:
        loaders: [
            test: /\.coffee$/, loader: 'coffee-loader'
        ]
    resolve:
        extensions: ["", ".web.coffee", ".web.js", ".coffee", ".js"]
    plugins: [
        #new webpack.optimize.UglifyJsPlugin
    ]