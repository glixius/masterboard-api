/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––– */
// Third-party imports
import 'colors';

/* ––
 * –––– Constants declaration
 * –––––––––––––––––––––––––––––––– */
const environmentVariables = new Map([
  ['PORT', false],
  ['PLAYGROUND_ENABLED', false],
  ['AIRTABLE_API_KEY', true],
  ['AIRTABLE_MASTERBOARD_BASE', true],
]);

/* ––
 * –––– Utilities declaration
 * –––––––––––––––––––––––––––––––– */
export function checkEnvironmentVariables() {
  console.log('\n⚙️ Checking environment variables\n'.underline.green.bold);

  const checkResults = Array.from(environmentVariables.entries()).map(
    ([environmentVariable, required]) => {
      const value = process.env[environmentVariable];
      const headerPrefix = `  🧩  ${environmentVariable}:`;

      if (!value && required) {
        console.log(`${headerPrefix} missing 🚨 (required)`.red);
        return false;
      } else if (!value) {
        console.log(`${headerPrefix} missing ⚠️ (optional)`.yellow);
      } else {
        console.log(`${headerPrefix} found ✔`.green);
      }
      return true;
    }
  );

  console.log('');
  return checkResults.every(value => value);
}
