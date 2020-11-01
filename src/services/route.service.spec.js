const chai = require("chai"),
  routeService = require("./route.service"),
  assert = chai.assert;

describe('testing route service"', () => {
  it("register new route", () => {
    routeService.register({
      origin: "BRC",
      destination: "OLR",
      cost: 10,
    });

    assert.isAtLeast(routeService.routes.length, 0);
  });
});
