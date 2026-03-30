const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let data = fs.readFileSync(fullPath, 'utf8');
      let originalData = data;

      data = data.replace(/text-slate-950/g, 'text-white');
      data = data.replace(/text-slate-900/g, 'text-white');
      data = data.replace(/text-slate-800/g, 'text-slate-200');
      data = data.replace(/text-slate-700/g, 'text-slate-200');
      data = data.replace(/text-slate-600/g, 'text-slate-300');

      if (data !== originalData) {
        fs.writeFileSync(fullPath, data);
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  });
}

processDirectory('./app/(public)');
processDirectory('./components');
console.log('Typographic color cleanup complete');
