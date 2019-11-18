var path=require('path');
var webpack=require('webpack');

module.exports={
    entry:['./src/index'],
    output:{
        path:path.join(__dirname, 'build'),
        filename:'main.js',
        publicPath: '/'
    },
    devServer:{
        hot:true,
        contentBase:'./public',
        watchContentBase:true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}