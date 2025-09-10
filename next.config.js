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
    WCPID: process.env.WCPID,
    RECIEVER_ADDRESS: process.env.RECEIVER_ADDRESS,
    BSC_RPC_URL: process.env.BSC_RPC_URL
  }
}

module.exports = nextConfig;
