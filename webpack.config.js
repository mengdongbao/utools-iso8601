// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
const config = {
    entry: {
        preload: {
            import: './src/preload.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        new CopyPlugin({
            patterns: [
                {from: './plugin.json', to: 'plugin.json'},
                {from: './src/assert', to: 'assert'},
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        alias: {
            '@': './src/'
        }
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
