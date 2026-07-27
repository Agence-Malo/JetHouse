/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // Never put secrets in here: `env` values are inlined into the client
    // bundle at build time, which makes them public on a static export.
    env: {
        "NEXT_PUBLIC_SERVICE_ID":"service_1p62b7q",
        "NEXT_PUBLIC_TEMPLATE_ID":"template_mngz7xp",
        "NEXT_PUBLIC_KEY":"94cFP3GbVxEfG_mUR",
    }
};

export default nextConfig;
