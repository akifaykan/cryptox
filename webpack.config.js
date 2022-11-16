const path = require('path');

module.exports = {
    mode: "development",
    //mode: "production",
    entry: "./src/app.js",
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
            path.join(__dirname, 'public'),
            path.join(__dirname, 'src')
        ],
        compress: true,
        port: 3200
    }
}
