const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LWCWebpackPlugin = require('lwc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./public/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");


module.exports = {
    entry: {
        'bundle': './src/app/index.js',
        'background': './src/background/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        alias: {
            labels: path.resolve(__dirname, 'src/app/modules/labels'),
            lwc: require.resolve('@lwc/engine'),
            slds: path.resolve('@salesforce-ux/design-system'),
            credentials: path.resolve(__dirname, 'credentials.json'),
        }
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: /background/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "OmniLogin for Salesforce",
            filename: 'index.html',
            template: './public/template.ejs',
            manifest: 'manifest.json',
            hash: true
        }),
        new CopyPlugin([
            {
                from: "src/chrome/icons",
                to: "icons"
            },
            {
                from: path.resolve('node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite'),
                to: "assets/icons/utility-sprite"
            },
            {
                from: path.resolve('node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'),
                to: "assets/styles"
            }
        ]),
        new WebpackExtensionManifestPlugin({
            config: {
                base: baseManifest
            }
        }),
        new LWCWebpackPlugin({
            namespace: {
                // LWC namespace with path
                omnilogin: path.resolve('./src/app/modules/omnilogin'),
                ui: path.resolve('./src/app/modules/ui'),
                view: path.resolve('./src/app/modules/view'),
                base: path.resolve('./src/app/modules/base'),
                lightning: path.resolve('./src/app/modules/lightning')
            },
            modules: [
                '@salesforce-ux/design-system'
            ]
        }),
    ]
};