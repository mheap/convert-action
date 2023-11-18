const yaml = require("js-yaml");
module.exports = function (main, filename) {
  main = main || "dist/index.js";
  filename = filename || "action.yml";

  const fs = require("fs");

  const content = fs.readFileSync(filename);

  try {
    const config = yaml.load(content);

    if (typeof config !== "object") {
      throw new Error(`YAML file [${filename}] does not contain an object`);
    }

    // Overwrite the existing fields
    config.runs = {
      using: "node20",
      main,
    };

    fs.writeFileSync(filename, yaml.dump(config));
  } catch (e) {
    if (e.name === "YAMLException") {
      throw new Error(`Unable to parse YAML file [${filename}]: ${e.reason}`);
    }
    throw e;
  }
};
