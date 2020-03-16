/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
const colors = require('colors');

/* ––
 * –––– Constants declaration
 * –––––––––––––––––––––––––––––––– */
const environmentVariables = new Map([
  ['PORT', false],
  ['GRAPHIQL_ENABLED', false],
  ['AIRTABLE_API_KEY', true],
  ['AIRTABLE_MASTERBOARD_BASE', true],
]);

/* ––
 * –––– Utilities declaration
 * –––––––––––––––––––––––––––––––– */
function checkEnvironmentVariables() {
  console.log('\n⚙️ Checking environment variables\n'.underline.green.bold);

  const checkResults = Array.from(environmentVariables.entries()).map(
    ([environmentVariable, required]) => {
      const value = process.env[environmentVariables];
      const headerPrefix = `  🧩  ${environmentVariable}:`;

      if (!value && required) {
        console.log(`${headerPrefix} missing 🚨 (required)`.brightRed);
        return false;
      } else if (!value) {
        console.log(`${headerPrefix} missing ⚠️ (optional)`.brightYellow);
      } else {
        console.log(`${headerPrefix} found ✔`.green);
      }
      return true;
    }
  );

  console.log('');
  return checkResults.every(value => value);
}

/* ––
 * –––– Exports
 * –––––––––––––––––––––––––––––––– */
module.exports = checkEnvironmentVariables;
