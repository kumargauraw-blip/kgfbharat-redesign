import type { NextConfig } from "next";

const AYODHYA_2026 = "/events/ram-janmabhoomi-gatha-nyaaypeeth-to-balidaan-ki-vedi-tak";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cms.kgfbharat.org", pathname: "/wp-content/uploads/**" }],
  },
  async redirects() {
    return [
      { source: "/ayodhya-2026", destination: AYODHYA_2026, permanent: false },
      { source: "/events/ayodhya-2026", destination: AYODHYA_2026, permanent: false },
    ];
  },
};

export default nextConfig;
