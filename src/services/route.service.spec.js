const { expect } = require("chai");
const chai = require("chai");
const subSet = require("chai-subset");
const routeService = require("./route.service");

const { assert } = chai;

chai.use(subSet);

const routes = [
  { origin: "GRU", destination: "BRC", cost: "10" },
  { origin: "BRC", destination: "SCL", cost: "5" },
  { origin: "GRU", destination: "CDG", cost: "75" },
  { origin: "GRU", destination: "SCL", cost: "20" },
  { origin: "GRU", destination: "ORL", cost: "56" },
  { origin: "ORL", destination: "CDG", cost: "5" },
  { origin: "SCL", destination: "ORL", cost: "20" },
];

describe('testing route service"', () => {
  beforeEach(() => {
    routes.forEach((route) => routeService.register(route));
  });

  it("register new route", () => {
    assert.isAtLeast(routeService.routes.length, 0);
  });

  it("get the best route", () => {
    const bestRoute = routeService.getBestRoute({
      origin: "GRU",
      destination: "CDG",
    });

    expect(bestRoute).to.containSubset({
      connections: ["GRU", "BRC", "SCL", "ORL", "CDG"],
      cost: 40,
    });
  });
});
