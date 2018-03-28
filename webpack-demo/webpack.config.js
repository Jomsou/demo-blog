module.exports = {
    entry: {
        home: './js/home.js',
        signup: './js/signup.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname+'/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    }
}