var path = require('path');	//专门处理路径用的，path.resolve('./dist');给当前路径解析出一个绝对路径
var webpack = require('webpack')
//webpack必须采用common.js的语法
module.exports = {
  entry:'./src/main.js',//webpack的入口文件，webpack会自动找相关的依赖进行打包
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',	//打包后的名字
  },
  //模块的解析规则
  //js: 匹配所有的js,用babel-loader转义，排除掉node_modules
  module: {//模块
    rules: [//规则
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',//use从右往左写，为把css模块挂载到style标签里
        ],
      }, //匹配css文件，用css-loader解析成样式模块，挂载到style标签里     
	  {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },//匹配所有js，用babel-loader来转译，不包括node_modules
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
