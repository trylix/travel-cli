class RouteService {
  constructor() {
    this.routes = [];
  }

  register = (route) => {
    if (this.routes.includes(route)) return;

    this.routes.push(route);
  };
}

module.exports = new RouteService();
