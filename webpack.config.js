const path = require( 'path' ); // 'path' is a Node core module. Have to require/import it but it's always there.
const CopyPlugin = require( 'copy-webpack-plugin' );
let mode = 'development';

 if ( process.env.NODE_ENV === 'production' ) {
   mode = 'production';
 }

module.exports = {
  mode: mode,
  stats: 'errors-warnings',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
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
  ],
};
