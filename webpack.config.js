const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Script } = require('vm');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
            new HtmlWebpackPlugin({
                title: 'My Todo',
                favicon: './dist/images/logo.png',
                templateContent: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <script src="https://kit.fontawesome.com/b9e56c62e2.js" crossorigin="anonymous"></script>
                    </head>
                </html>
              `
            }),
        ],
    module: {
        rules: [
            {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            },
        ]
    },
    devtool: 'inline-source-map',
};