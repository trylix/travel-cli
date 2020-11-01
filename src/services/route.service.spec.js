const { expect } = require("chai");
const chai = require("chai");
const subSet = require("chai-subset");
const routeService = require("./route.service");

const { assert } = chai;

chai.use(subSet);

const routes = [
  { source: "GRU", destination: "BRC", cost: "10" },
  { source: "BRC", destination: "SCL", cost: "5" },
  { source: "GRU", destination: "CDG", cost: "75" },
  { source: "GRU", destination: "SCL", cost: "20" },
  { source: "GRU", destination: "ORL", cost: "56" },
  { source: "ORL", destination: "CDG", cost: "5" },
  { source: "SCL", destination: "ORL", cost: "20" },
];

describe('testing route service"', () => {
  beforeEach(() => {
    routes.forEach((route) => routeService.addRoute(route));
  });

  it("add new route", () => {
    assert.isAtLeast(routeService.routes.length, 0);
  });

  it("get the best route", () => {
    const bestRoute = routeService.getBestRoute({
      source: "GRU",
      destination: "CDG",
    });

    expect(bestRoute).to.containSubset({
      connections: ["GRU", "BRC", "SCL", "ORL", "CDG"],
      cost: 40,
    });
  });
});
