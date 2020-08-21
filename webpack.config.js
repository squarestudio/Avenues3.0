// ------------------
// Modules
// ------------------

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const PrerenderSPAPlugin = require('prerender-spa-plugin');



// ----------------------
// Helpers
// ----------------------

function absPath (value) {
    return path.join(__dirname, value);
}

function configureOptimization (mode) {
    if (mode === 'production') return  {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()]
    }
}

function configurePlugins (mode, type) {
    let plugins = [new HtmlWebpackPlugin({
        title: 'Avenues',
        templateContent: `<html lang="en"><body><div id="app"></div></body></html>`,
        chunks: ['bundle', 'bundle_head']
    })]
    if (type === 'mobile') {
        plugins[0].meta = {viewport: 'width=device-width, initial-scale=1'}
    }
    if (mode === 'production') {
        plugins.push(new PrerenderSPAPlugin({
            staticDir: absPath(`dist/${type}`),
            routes: ['/', '/index', '/archive'],
        }))
    }
    return plugins;
}





// --------------------------
// Exports
// --------------------------

module.exports = ({mode, type, port = 49018}) => ({

    mode,
    optimization: configureOptimization(mode),

    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        ...configurePlugins(mode, type),
        new HtmlWebpackInjector()
    ],

    devServer: {
        contentBase: absPath('dist/desktop'),
        host: '0.0.0.0',
        historyApiFallback: true,
        port: port
    },

    resolve: {
        alias: {
            '@': absPath('src')
        }
    },

    output: {
        publicPath: '/',
        path: absPath(`dist/${type}`)
    },

    entry: {
        bundle_head: absPath(`src/${type}/head.js`),
        bundle: absPath(`src/${type}/index.js`)
    },

    devtool: 'source-map'

});