#!/usr/bin/env node
const run = require(".");
const args = process.argv.slice(2).reverse();

if (args.length > 2) {
  throw new Error("Usage: convert-action-to-node [filename] [compiled.js]");
}
run.apply(null, args);
