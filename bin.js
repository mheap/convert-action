#!/usr/bin/env node
const run = require(".");
const args = process.argv.slice(2);

if (args.length > 2) {
  throw new Error(
    "Usage: convert-action-to-node [compiled.js] [/path/to/action.yaml]"
  );
}
run.apply(null, args);
