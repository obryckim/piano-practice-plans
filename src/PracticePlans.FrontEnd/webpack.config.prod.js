import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';

export default {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    target: 'web',
    context: __dirname,
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.prod.html'
        }),
        new CopyWebpackPlugin([{
            from: 'public'
        }]),
        new Dotenv({
            systemvars: true
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                include: [path.join(__dirname, 'src'),
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
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
