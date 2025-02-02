/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // Ignore native modules on the client-side
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                url: require.resolve('url'),
                zlib: require.resolve('browserify-zlib'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                assert: require.resolve('assert'),
                process: require.resolve('process/browser'),
            };
        }

        // Add any additional Webpack configuration here
        config.module.rules.push({
            test: /\.html$/,
            use: 'ignore-loader', // Ignore HTML files
        });

        return config;
    },
    // Additional Next.js configuration options can go here
};

module.exports = nextConfig;