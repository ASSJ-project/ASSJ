const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  babel: {
    plugins: [
      // 바벨 플러그인 설정
    ],
  },
  devServer: {
    // 개발 서버 설정
  },
  plugins: [
    // 추가 플러그인 설정
  ],
};
