const fs = require('fs');
const cp = require('child_process');

let apiUrl = "https://api.playyourdamnturn.com";

try {
  apiUrl = fs.readFileSync('../api-dev-url.txt', 'utf-8');
  console.log('Using ' + apiUrl + ' for API URL!');
} catch (Error) {
  console.log('There wasn\'t anything in ../api-dev-url.txt, using prod api url...');
}

const rev = cp.execSync('git rev-parse HEAD').toString().trim();

require('fs').writeFileSync('src/envVars.js', 'module.exports=' + JSON.stringify({
  rev,
  apiUrl
}) + ';');