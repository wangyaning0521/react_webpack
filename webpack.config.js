
// 该插件将为您生成一个HTML5文件，其中包含webpack 使用script标记的正文中的所有包
const HtmlWebpackPlugin   =   require('html-webpack-plugin');
const path                =   require('path');
const ExtractTextPlugin   =   require("extract-text-webpack-plugin");
const webpack             =   require("webpack");

console.log(process.env.NODE_ENV)
module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',   // 打包后寻找路径前寻找/dist
        filename: 'js/[name].[chunkhash:8].bundle.js',
        chunkFilename: 'js/[name]-[id].[chunkhash:8].bundle.js'
	},
	module: {
		rules: [
            // react （jsx）
		  	{
				test: /\.jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"stage-0", "env", "react"
						]
					}	
				}
			},
			// 解决uglifyjs报错问题
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [{
				  loader: 'babel-loader',
				  options: {
					 presets: [ "stage-0", "env", "react"]
				  }
				}]
			},
            // css
			{
                test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
            },
            // less
			{
                test: /\.less$/,
                exclude:[/node_modules/],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader?modules', 'less-loader']
				})
            },
            // img
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
                            limit: 8192,
                            // 提取img
                            name: 'resource/[name].[ext]'
						}
					}
				]
            },
            // font
			{
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
					{
						loader: 'url-loader',
						options: {
                            limit: 8192,
                            // 提取img
                            name: 'resource/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
        // 处理html
		new HtmlWebpackPlugin({ 
            template: './src/index.html',
            favicon : './src/favicon.ico'
        }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/base.js'
        })
	],
	resolve: {  
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名  
        extensions: ['.js', '.jsx'],  
        alias: {  
			layout:     path.resolve(__dirname, 'src/layout'),
			Component:  path.resolve(__dirname, 'src/Component'),
            store:      path.resolve(__dirname, 'src/store'),
            Axios:      path.resolve(__dirname, 'src/lib/http.jsx'),
            service:    path.resolve(__dirname, 'src/service'),
            utils:      path.resolve(__dirname, 'src/utils'),
        }  
    },
    // web服务器
    devServer: {
		// 端口号
		port: '8081',
		//用于指定目录为 dist 下的index  否则则会跳到根目录
		historyApiFallback: {
			index: '/dist/index.html'
        },
        proxy: {
			'/api': {
				target: '123123123',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
    },
};