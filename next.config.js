/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching= require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    FIREBASE_DOMAIN: process.env.FIREBASE_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  }
})
