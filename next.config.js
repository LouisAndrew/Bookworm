const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    })

    config.plugins.push(new Dotenv({ silent: true }));

    return config
  },
}