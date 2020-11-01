class RouteService {
  constructor() {
    this.routes = [];
  }

  register = (route) => {
    if (this.routes.includes(route)) return;

    this.routes.push(route);
  };

  getBestRoute = ({ origin, destination }) => {
    function* findPossibleRoutes(nodes, source, destination, connection = []) {
      if (source === destination) {
        yield connection.concat(destination);
        return;
      }

      if (nodes[source]) {
        connection.push(source);

        for (const next of nodes[source]) {
          yield* findPossibleRoutes(nodes, next, destination, connection);
        }

        connection.pop(source);
      }
    }

    const nodes = {};
    for (const node of this.routes) {
      if (!nodes[node.origin]) {
        nodes[node.origin] = [];
      }

      nodes[node.origin].push(node.destination);
    }

    const possibleRoutes = [...findPossibleRoutes(nodes, origin, destination)];

    const bestRoute = possibleRoutes
      .map((possibleRoute) => {
        let totalCost = 0;
        for (let i = 0; i < possibleRoute.length; i++) {
          const next = i + 1;

          if (next > possibleRoute.length) continue;

          const route = this.routes.find(
            (route) =>
              route.origin === possibleRoute[i] &&
              route.destination === possibleRoute[next]
          );

          if (route) {
            totalCost += Number(route.cost);
          }
        }

        return {
          connections: possibleRoute,
          cost: totalCost,
        };
      })
      .sort((routeOne, routeTwo) =>
        routeOne.connections.length < routeTwo.connections.length ? 1 : -1
      )
      .sort((routeOne, routeTwo) =>
        routeOne.cost > routeTwo.cost ? 1 : -1
      )[0];

    return bestRoute;
  };
}

module.exports = new RouteService();
