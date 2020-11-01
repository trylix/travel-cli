const appModule = require("./app.module");

(async () => {
  await appModule.initialize();
})();
