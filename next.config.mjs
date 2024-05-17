import cron from "node-cron";
import * as fs from "fs";

const VIDEO_FOLDER = `${process.cwd()}/videos`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    cron.schedule("*/30 * * * *", () => {
      const dateForRemove = new Date();
      dateForRemove.setHours(dateForRemove.getHours() - 2);

      const files = fs.readdirSync(VIDEO_FOLDER);

      files.map(async (fileName) => {
        const filePath = `${VIDEO_FOLDER}/${fileName}`;
        const stats = fs.statSync(filePath);
        if (dateForRemove > stats.mtime) {
          fs.unlinkSync(filePath);
        }
      });
    });
    return [
      {
        source: "/feedback",
        destination: "/feedback/general",
      },
    ];
  },
};

export default nextConfig;
