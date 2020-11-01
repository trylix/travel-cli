const chai = require("chai"),
  airportService = require("./airport.service"),
  assert = chai.assert;

describe('testing airport service"', () => {
  it("register new airport", () => {
    airportService.register("BRC");

    assert.isAtLeast(airportService.airports.length, 0);
  });
});
