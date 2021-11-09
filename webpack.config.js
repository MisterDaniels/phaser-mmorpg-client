const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'project.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/,
            },
            {
                test: [
                    /\.ver$/,
                    /\.frag$/
                ],
                use: 'raw-loader'
            }
        ]
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'src'),
                watch: true
            },
            {
                directory: path.join(__dirname, 'assets'),
                watch: true,
                publicPath: '/assets'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]
}