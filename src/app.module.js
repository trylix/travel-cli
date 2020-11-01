const fileService = require("./services/file.service");
const commandService = require("./services/command.service");

class AppModule {
  initialize = () => {
    fileService.load();
    commandService.startCommandLine();
  };
}

module.exports = new AppModule();
