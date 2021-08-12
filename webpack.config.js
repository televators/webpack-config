const path = require( 'path' ); // 'path' is a Node core module. Have to require/import it but it's always there.
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = 'development';
let target = 'web'; // Bug with either webpack-dev-server or Webpack 5 itself where having a .browserslistrc will fuck up live reloading (of at least [S]CSS). Manually specifying the target prop will fix it until an official fix is patched in.

 if ( process.env.NODE_ENV === 'production' ) {
   mode = 'production';
   target = 'browserslist';
 }

module.exports = {
  mode: mode,
  target: target,
  // stats: 'errors-warnings', //* Use this to squash most of the output in CLI.
  stats: 'normal',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(sc|c)ss$/i, //* Can be written as `(scss|css)`, `(s(a|c)|c)ss`, `s?css`, or `(s[ac]|c)ss`. Regex is fun!
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ],
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    // contentBase: "./dist", //* Works fine. If you needed absolute instead of relative, use below instead:
    contentBase: path.join( __dirname, 'dist' ),
    // public: "localhost:8080" // ! This is the default setup (technically, host: "localhost" is the issue I think)
    // public: "127.0.0.1:8080", // * This works. So something about using 'localhost' instead of the localhost IP makes WDS confused. Manually setting host and port below for clarity instead.
    // host: "127.0.0.1", //! Doesn't work.
    // host: "localhost", //! Doesn't work.
    port: 8080,
    disableHostCheck: true
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin( {
      patterns: [
        {
          from: 'src/images',
          to: 'img',
        }
      ],
    } ),
    new MiniCssExtractPlugin(),
  ],
};
