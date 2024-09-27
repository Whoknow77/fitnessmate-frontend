const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
	app.use(
		createProxyMiddleware("/api", {
			target:
				"http://43.202.36.104:8080",
			changeOrigin: true,
			pathRewrite: { "^/api": "" },
		})
	);
};
