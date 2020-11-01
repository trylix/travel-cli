const path = require("path");
const fs = require("fs");

const routeService = require("./route.service");

class FileService {
  load = () => {
    try {
      if (process.argv.length <= 2) {
        throw new Error("file name must be supplied on command line.");
      }

      this.filename = process.argv[2];

      if (path.extname(this.filename) !== ".csv") {
        throw new Error("invalid file format.");
      }

      fs.accessSync(this.filename, fs.F_OK);

      const data = fs.readFileSync(this.filename, {
        encoding: "ascii",
      });

      const lines = data.split("\n");

      lines.forEach((line) => {
        if (line === "") return;

        const [source, destination, cost] = line.split(",");

        routeService.addRoute({
          source,
          destination,
          cost,
        });
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  writeToFile = (route) => {
    const writeStream = fs.createWriteStream(this.filename, {
      flags: "a",
    });

    const parseRoute = [route.source, route.destination, route.cost];
    const newRoute = parseRoute.join(",");

    writeStream.write(`${newRoute}\n`);
    writeStream.end();
  };
}

module.exports = new FileService();
