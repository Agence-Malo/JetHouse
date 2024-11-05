/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    env: {
        "OPEN_WEATHER_MAP_API_KEY":"a21e8e480f84e057e8c9569b632e7ec7",
        "RESEND_API_KEY":"re_K47qoHar_NmdaJyfgkbSArmh8uTnsqLLy",
        "NEXT_PUBLIC_SERVICE_ID":"service_1p62b7q",
        "NEXT_PUBLIC_TEMPLATE_ID":"template_mngz7xp",
        "NEXT_PUBLIC_KEY":"94cFP3GbVxEfG_mUR",
    }
};

export default nextConfig;
