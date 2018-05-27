
// 该插件将为您生成一个HTML5文件，其中包含webpack 使用script标记的正文中的所有包
const HtmlWebpackPlugin   =   require('html-webpack-plugin');
const path                =   require('path');
const ExtractTextPlugin   =   require("extract-text-webpack-plugin");
const webpack             =   require("webpack");

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',   // 打包后寻找路径前寻找/dist
		filename: 'js/app.js'
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
							'env', 
							'react'
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
					 presets: ['es2015']
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
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', 'less-loader']
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
			template: './src/index.html'
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
        }  
    },
    // web服务器
    devServer: {
		// 端口号
		port: '8086',
		//用于指定目录为 dist 下的index  否则则会跳到根目录
		historyApiFallback: {
			index: '/dist/index.html'
		}
    },
};