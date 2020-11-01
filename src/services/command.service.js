const readline = require("readline");

const { parseRoute } = require("../shared/utils");
const routeService = require("./route.service");

class CommandService {
  constructor() {
    this.cmd = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  startCommandLine = () => {
    this.cmd.question("please enter the route:", (route) => {
      const [source, destination] = parseRoute(route);
      const bestRoute = routeService.getBestRoute({ source, destination });

      console.log(
        `best route: ${bestRoute.connections.join(" - ")} > \$${bestRoute.cost}`
      );

      this.startCommandLine();
    });
  };
}

module.exports = new CommandService();
