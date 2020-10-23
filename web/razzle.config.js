'use strict';
const nodeExternals = require('webpack-node-externals');


const PATH_DELIMITER = '[\\\\/]'; // match 2 antislashes or one slash

/**
 * On Windows, the Regex won't match as Webpack tries to resolve the
 * paths of the modules. So we need to check for \\ and /
 */
const safePath = module => module.split(/[\\/]/g).join(PATH_DELIMITER);

const generateIncludes = modules => {
  return [
    new RegExp(`(${modules.map(safePath).join('|')})$`),
    new RegExp(
      `(${modules.map(safePath).join('|')})${PATH_DELIMITER}(?!.*node_modules)`
    ),
  ];
};

module.exports = {
  options: {
    buildType: 'serverless',
    useReactRefresh: true,
  },
  modifyPaths: ({ paths }) => {
    return paths;
  },
  modifyWebpackOptions: ({ options: { webpackOptions } }) => {
    const includes = generateIncludes(['shared']);
    // const excludes = generateExcludes(['shared']);
    webpackOptions.babelRule = {
      ...webpackOptions.babelRule,
      include: [...webpackOptions.babelRule.include, ...includes],
    };

    return webpackOptions;
  },
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
  }) {
    const config = Object.assign({}, webpackConfig);
    if (target === 'web' && dev) {
      // local web stuff
    }

    config.externals = dev
      ? [
          // Don't try to bundle all files in yarn root workspace's node_modules
          // https://github.com/netlify/netlify-lambda/issues/179
          // https://www.npmjs.com/package/webpack-node-externals
          nodeExternals({
            modulesDir: '../node_modules',
            whitelist: [/shared/],
          }),
        ]
      : [];

    const isLambdaBuild = !!process.env.LAMBDA;
    return target === 'node'
      ? {
          ...config,
          output: isLambdaBuild
            ? {
                ...config.output,
                libraryTarget: 'commonjs',
              }
            : config.output,
          optimization: {
            minimize: false,
          },
        }
      : config;
  },
};

