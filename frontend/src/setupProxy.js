const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/user",
    createProxyMiddleware({
      target: "http://192.168.0.205:8080",
      changeOrigin: true,
    })
  );

  // 683816e5ca9b6b18ebab4894215d989420708fa3
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://opendart.fss.or.kr",
      changeOrigin: true,
    })
  );

  app.use(
    "/opi/opi",
    createProxyMiddleware({
      target: "https://openapi.work.go.kr",
      changeOrigin: true,
    })
  );
};
