const path = require('path');

module.exports = {
    mode: "development",
    //mode: "production",
    entry: "./src/index.js",
    output: {
        path:path.resolve(__dirname, "bundles"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/
            }
        ]
    },
    devServer: {
        static: [
            {directory: path.join(__dirname, 'public')},
            {directory: path.join(__dirname, 'src')}
        ],
        compress: true,
        port: 3200
    }
}