import { NextConfig } from 'next';

const config: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : 'http://localhost:8080/api/:path*'
      }
    ];
  }
};

export default config;
