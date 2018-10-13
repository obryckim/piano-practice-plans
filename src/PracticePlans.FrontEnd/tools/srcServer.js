import express from 'express';
import webpack from 'webpack';
import path from 'path';
import opn from 'opn';
import middleware from 'webpack-dev-middleware';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(middleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        opn(`http://localhost:${port}`);
    }
});
