const { TestScheduler } = require("jest");
const run = require(".");
const fs = require("fs");
const yaml = require("js-yaml");

jest.mock("fs");

beforeEach(() => {
  jest.restoreAllMocks();
});

test("has a default filename", () => {
  mockActionYaml();
  jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
  run();
  expect(fs.readFileSync).toBeCalledWith("action.yml");
});

test("reads the correct filename", () => {
  mockActionYaml();
  jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
  run(``, "other-action.yml");
  expect(fs.readFileSync).toBeCalledWith("other-action.yml");
});

test("handles invalid input files", () => {
  fs.readFileSync.mockReturnValue("invalid: {");
  expect(() => run()).toThrow(
    new Error(
      "Unable to parse YAML file [action.yml]: unexpected end of the stream within a flow collection"
    )
  );
});

test("handles non-objects in the YAML file", () => {
  fs.readFileSync.mockReturnValue("basic string");
  expect(() => run()).toThrow(
    new Error("YAML file [action.yml] does not contain an object")
  );
});

test("success (default main)", () => {
  mockActionYaml();

  const expected = `name: Test Action
runs:
  using: node16
  main: dist/index.js
`;

  jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
  run("dist/index.js");
  expect(fs.writeFileSync).toBeCalledWith("action.yml", expected);
});

test("success (specified main)", () => {
  mockActionYaml();
  const expected = `name: Test Action
runs:
  using: node16
  main: index.dist.js
`;

  jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
  run("index.dist.js");
  expect(fs.writeFileSync).toBeCalledWith("action.yml", expected);
});

function mockActionYaml() {
  fs.readFileSync.mockReturnValue(`name: Test Action
runs:
  using: docker
  image: Dockerfile`);
}
