const { createProxyMiddleware } = require('http-proxy-middleware');
//
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
<<<<<<< HEAD
      target: 'http://192.168.0.212:8080',
=======
      target: 'http://192.168.0.105:8080',
>>>>>>> upstream/main
      changeOrigin: true,
    })
  );
};
