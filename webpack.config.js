const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        inline: true,
        contentBase:  [path.join(__dirname, 'public'), path.join(__dirname, 'src/assets')],
        
        watchOptions: {
            aggregateTimeout: 100,
           // poll: 1000,
          },
        port: 3000,
        open: true,
        stats: "errors-only",
    },
    devtool: "source-map"
}