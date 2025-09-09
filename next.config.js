// next.config.js
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'clone-deep': 'commonjs clone-deep'
      });
    }
    return config;
  },
  env: {
    WCPID: process.env.WCPID
  }
}

module.exports = nextConfig;
