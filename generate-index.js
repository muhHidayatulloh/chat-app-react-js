// generate-index.js
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src/pages'); // replace dengan path yang ingin di tambahkan index.js yang digunakan untuk barrel file
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'));

var exports = files
  .map(file => {
    const name = path.basename(file, '.js');
    return `export { default as ${name} } from './${name}';`;
  })
  .join('\n');

fs.writeFileSync(path.join(dirPath, 'index.js'), exports);

console.log('✅ index.js generated!');
