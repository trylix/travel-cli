const chai = require("chai");
const subSet = require("chai-subset");
const utils = require("./utils");
const { expect } = chai;

chai.use(subSet);

describe("testing utils functions", () => {
  it("parseRoute", () => {
    const requestedRoute = " bcr - orl ";
    const parsedRoute = utils.parseRoute(requestedRoute);

    expect(parsedRoute).to.containSubset(["BCR", "ORL"]);
  });

  it("parseParams", () => {
    const requestPath = "/routes/teste1/teste2";
    const parsedPath = utils.parseParams("/routes/:param1/:param2");

    const params = parsedPath(requestPath);

    expect(params).to.containSubset({
      param1: "teste1",
      param2: "teste2",
    });
  });
});
