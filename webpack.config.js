
const webpack = require('webpack');

const path = require('path');

module.exports = {
    mode: "production",
    entry: './build/plugin.js',
    output: {
        filename: 'plugin.mentatjscontrols.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        "mentatjs": "var mentatjs",
        "skeletjs": "var skeletjs",
        "flowbreaker": "var flowbreaker"
    },
    resolve: {
        fallback: {

        }
    },
    plugins: [

    ],
    optimization: {
        minimize: false
    },

};