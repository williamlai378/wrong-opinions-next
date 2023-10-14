/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's4.anilist.co'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    reactStrictMode: false,
    publicRuntimeConfig: {
        API_URL: process.env.DEV_URL
    }
}

module.exports = nextConfig


/**
 * experimental: {
        serverComponentsExternalPackages: ['/bcrypt']
    }
 */