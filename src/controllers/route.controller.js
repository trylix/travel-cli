const routeService = require("../services/route.service");
const fileService = require("../services/file.service");

class RouteController {
  show = (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
      return res.status(401).json({
        error: "Invalid parameters.",
      });
    }

    try {
      const response = routeService.getBestRoute({ source, destination });

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({
        error: "The requested route was not found.",
      });
    }
  };

  store = (req, res) => {
    const { source, destination, cost } = req.body;

    if (!source || !destination || !cost) {
      return res.status(401).json({
        error: "Invalid parameters.",
      });
    }

    const route = { source, destination, cost };

    fileService.writeToFile(route);
    routeService.addRoute(route);

    return res.status(200).json(route);
  };
}

module.exports = new RouteController();
