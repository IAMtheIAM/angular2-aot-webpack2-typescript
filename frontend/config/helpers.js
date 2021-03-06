/**
 * @author: @AngularClass
 */
const path = require('path');
const glob = require('glob');

const ENVlc = process.env.npm_lifecycle_event;
const AOT = ENVlc === 'devserver:aot' || ENVlc === 'build:debug:aot' || ENVlc === 'build:production:aot';

// Helper functions
// export var ROOT = path.resolve(__dirname, '..');

const paths = {
   appRoot: path.resolve(__dirname, '../src'),
   happyPackTempDir: '../../cache/happypack',
   root: path.resolve(__dirname, '..'),
   nodeModulesRoot: path.resolve(__dirname, '../node_modules'),
   outputDir: '../backend-nodejs/wwwroot', // relative path here, pointed to backend-nodejs for deployment purposes
   tsConfigFileName: AOT ? 'tsconfig.ngc-webpack.json' : 'tsconfig.json'
};

function hasProcessFlag(flag) {
   return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
   return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}

function root(args) {
   args = Array.prototype.slice.call(arguments, 0);
   return path.join.apply(path, [paths.root].concat(args));
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.path = path;
exports.paths = paths;
exports.glob = glob;

