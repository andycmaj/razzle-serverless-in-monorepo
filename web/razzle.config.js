'use strict';
const nodeExternals = require('webpack-node-externals');

const transpileWorkspaceModules = (workspaces) => {
  // most of this logic stolen from https://github.com/martpie/next-transpile-modules/blob/master/src/next-transpile-modules.js\
  // in order to be able to directly reference workspace modules and transpile them inline

  // TODO: add these paths to webpack-dev-server's watched paths

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
  return generateIncludes(workspaces);
}

module.exports = {
  options: {
    buildType: 'serverless',
    useReactRefresh: true,
  },
  modifyPaths: ({ paths }) => {
    return paths;
  },
  modifyWebpackOptions: ({ options: { webpackOptions } }) => {
    const includes = transpileWorkspaceModules(['shared']);
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
          // don't bundle node_modules into the dev bundle.
          // this makes debugging way slower and isn't needed 
          // for webpack-dev-server
          nodeExternals({
            modulesDir: '../node_modules',
            whitelist: [/shared/],
          }),
        ]
      : [];

    return config;
  },
};

