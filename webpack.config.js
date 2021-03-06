var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname),
        port: 5000
    },
    entry: './dev/client.js',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: './bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env','es2015', 'react', 'stage-2'],
                            plugins: ['transform-decorators-legacy']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
