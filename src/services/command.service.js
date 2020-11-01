const readline = require("readline");

class CommandService {
  constructor() {
    this.cmd = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  startCommandLine = () => {
    this.cmd.question("please enter the route:", (route) => {
      console.log("best route: **melhor rota**");

      this.startCommandLine();
    });
  };
}

module.exports = new CommandService();
