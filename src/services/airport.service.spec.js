const chai = require("chai");
const airportService = require("./airport.service");
const { assert } = chai;

describe('testing airport service"', () => {
  it("register new airport", () => {
    airportService.register("BRC");

    assert.isAtLeast(airportService.airports.length, 0);
  });
});
