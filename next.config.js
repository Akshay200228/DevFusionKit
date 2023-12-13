/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "console.cloudinary.com"
            }
        ]
    }
}

module.exports = nextConfig
