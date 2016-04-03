var webpack = require('webpack');

module.exports = {
    entry: "./public/javascripts/src/",
    output: {
        path: "./public/javascripts/builds",
        filename: "bundle.js"
    },
    resolve: {
        modulesDirectories: ["node_modules", "public/javascripts/components"]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ]
};
