// next.config.js
module.exports = {
  // Disable server-side rendering for the problematic API route
  experimental: {
    serverComponentsExternalPackages: [
      'puppeteer-core',
      'puppeteer-extra',
      'puppeteer-extra-plugin-stealth'
    ],
  },

  // Skip problematic modules in webpack bundling
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'puppeteer-extra': 'commonjs puppeteer-extra',
        'puppeteer-extra-plugin-stealth': 'commonjs puppeteer-extra-plugin-stealth',
        'clone-deep': 'commonjs clone-deep'
      });
    }
    return config;
  }
};
