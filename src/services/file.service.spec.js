const chai = require("chai");
const sinon = require("sinon");
const fileService = require("./file.service");

const { expect } = chai;

chai.use(require("sinon-chai"));

require("mocha-sinon");

describe('testing file service"', () => {
  beforeEach(() => {
    if (null == this.sinon) {
      this.sinon = sinon.createSandbox();
    } else {
      this.sinon.restore();
    }

    this.sinon.stub(console, "error");
    this.sinon.stub(process, "exit");
  });

  it("file name not supplied on command line", () => {
    process.argv = ["node", "."];

    fileService.load();

    expect(process.exit.calledOnce).to.be.true;
    expect(process.exit.calledWith(1)).to.be.true;
  });

  it("invalid file format", () => {
    process.argv = ["node", ".", "README.md"];

    fileService.load();

    expect(process.exit.calledOnce).to.be.true;
    expect(process.exit.calledWith(1)).to.be.true;
  });

  it("file doesnt exists", () => {
    process.argv = ["node", ".", "input.csv"];

    fileService.load();

    expect(process.exit.calledOnce).to.be.true;
    expect(process.exit.calledWith(1)).to.be.true;
  });

  it("should be load file", () => {
    process.argv = ["node", ".", "input-routes.csv"];

    fileService.load();

    expect(process.exit.calledOnce).to.be.false;
    expect(process.exit.calledWith(1)).to.be.false;
  });
});
