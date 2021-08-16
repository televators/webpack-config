// NOTE: 'path' is a Node core module. Have to require/import it but it's always there.
// NOTE: See note about CopyWebpackPlugin below in plugins object.

const path = require( 'path' ),
// CopyPlugin = require( 'copy-webpack-plugin' ),
MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Bug with either webpack-dev-server or Webpack 5 itself where having a .browserslistrc will fuck up live reloading (of at least [S]CSS). Manually specifying the target prop will fix it until an official fix is patched in.
let mode = 'development',
target = 'web';

 if ( process.env.NODE_ENV === 'production' ) {
   mode   = 'production';
   target = 'browserslist';
 }

module.exports = {
  mode: mode,
  target: target,
  // stats: 'errors-warnings', //* Use this to squash most of the output in CLI.
  stats: 'normal',

  output: {
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico|web[pm])$/i,
        //* `asset/resource` copies the actual file to the dist folder.
        type: 'asset/resource',
        //* `asset/inline` converts them to base64 data inlined in the `src` attr. Can blow up size of CSS/JS/HTML outputs.
        // type: 'asset/inline',
        //* `asset` is a generic/auto type with which Webpack will decide on best way for each image based on size (max-size is 8KB by default; image larger than that will be copied as file, smaller will be inlined)
        type: 'asset',
        //* `parser` exposes settings for how Webpack determines best URL handling when using `asset`.
        // parser: {
        //   //* Rules specifically for how WP determines treatment of images.
        //   // NOTE: Only applies when `type` is `asset`.
        //   dataUrlCondition: {
        //     maxSize: 20 * 1024, // 30 x 1KB in bytes, e.g., 30KB
        //   },
        // },
      },
      {
        //* Regex: placing a `?` after a char makes it optional; this ~= `(js|jsx)`.
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        //* Can be written as `(scss|css)`, `(s(a|c)|c)ss`, `s?css`, or `(s[ac]|c)ss`. Regex is fun!
        test: /\.(sc|c)ss$/i,
        // NOTE: Even though these are listed LTR, the shit is processed through these RTL, so sass
        // then postcss, then css, then MiniCssExtractPlugin.
        // NOTE: You can pass each of the loaders as an object, with `loader` and `options` props.
        // MiniCssExtractPlugin works fine here as just `MiniCssExtractPlugin.loader` but for reference,
        // it'd be like this:
        // {
        //   loader: MiniCssExtractPlugin.loader,
        //   options: { publicPath: "" } // Jimmy has no idea what this does and neither do I. Kek.
        // },
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'source-map', // Annoying that this is all lowercase and following is camel.
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    //* Hot Module Replacement (HMR); here, specifically for CSS live-reload.
    hot: true,
    //* Works fine. If you needed absolute instead of relative, use below instead:
    // contentBase: "./dist",
    contentBase: path.join( __dirname, 'dist' ),
    // ! This is the default setup, not necess. the properties its set on.
    // public: "localhost:8080",
    //* This works. So something about using 'localhost' instead of the localhost IP
    //* makes WDS confused. Manually setting host and port below for clarity instead.
    // public: "127.0.0.1:8080",
    // host: "127.0.0.1", //! Doesn't work.
    // host: "localhost", //! Doesn't work.
    port: 8080,
    //* I think this was to resolve the `[WDS] Disconnected!` error. Helped some but not 100%.
    disableHostCheck: true
  },

  plugins: [
    // NOTE: I added this early on so that I could have plain old passthrough copying of static images to dist/ without importing through JS. Disabling since I've gotten to part in course where he's doing the standard, imported-by-JS setup with Webpack 5's Asset Modules, which I tried at first. My original images are in oldimages folder.
    // NOTE: If you want to reinstall, the package is `"copy-webpack-plugin": "^9.0.1"`.
    // new CopyPlugin( {
    //   patterns: [
    //     {
    //       from: 'src/images',
    //       to: 'img',
    //     }
    //   ],
    // } ),
    new MiniCssExtractPlugin(),
  ],
};
