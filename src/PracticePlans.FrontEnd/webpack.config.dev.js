import path from 'path';
import Dotenv from 'dotenv-webpack';

export default {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './src'
    },
    target: 'web',
    context: __dirname,
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'main.js'
    },
    plugins: [
        new Dotenv({
            systemvars: true
        })
    ],
    optimization: {
        noEmitOnErrors: true
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'tools')
                ],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true
                }
            },
            {
                test: /\.(js|jsx)$/,
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
