import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// No Termux (Android) a biblioteca que o Next usa para redimensionar imagens (sharp) não funciona.
// Lá a imagem do mascote é entregue do jeito que está em public/mascote/ (na Vercel ela continua sendo otimizada).
const onAndroid = process.platform === "android" || (process.env.PREFIX ?? "").includes("com.termux");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { unoptimized: onAndroid },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
