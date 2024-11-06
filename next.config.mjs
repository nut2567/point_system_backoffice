/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['img.daisyui.com','fastly.picsum.photos'], // เพิ่ม hostname ที่ต้องการ
    },
};

export default nextConfig;
