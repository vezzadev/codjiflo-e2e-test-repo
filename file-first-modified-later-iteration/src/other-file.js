// This file will be modified in iteration 1
// target-file.yml will NOT be touched in iteration 1

function helper() {
  return 'iteration 1 - modified version';
}

function additionalHelper() {
  return 'new function in iteration 1';
}

module.exports = { helper, additionalHelper };
