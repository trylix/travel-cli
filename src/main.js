const appModule = require("./app.module");
const httpModule = require("./http.module");

(() => {
  appModule.initialize();
  httpModule.initialize();
})();
