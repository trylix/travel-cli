const routeService = require("../services/route.service");

class RouteController {
  show = (req, res) => {
    const { origin, destination } = req.query;

    try {
      const response = routeService.getBestRoute({ origin, destination });

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({
        error: "The requested route was not found.",
      });
    }
  };
}

module.exports = new RouteController();
