﻿import webpack from 'webpack';
import path from 'path';

export default {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './src'
    },
    target: 'web',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'main.js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
            noInfo: false
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [{
                test: /\.js$/,
                include: [path.join(__dirname, 'src')],
                use: ['babel-loader']
            },
            {
                test: /(\.css)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2)$/,
                use: ['url?prefix=font/&limit=5000']
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url?limit=10000&mimetype=application/octet-stream']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url?limit=10000&mimetype=image/svg+xml']
            }
        ]
    }
};