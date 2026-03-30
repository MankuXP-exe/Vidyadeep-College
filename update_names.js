const fs = require('fs');

function updateNameInFiles() {
  const filePaths = [
    './lib/data.ts',
    './app/layout.tsx',
    './components/site-footer.tsx',
    './app/(public)/apply-online/page.tsx',
    './components/site-header.tsx',
    './README.md'
  ];

  filePaths.forEach(path => {
    if (fs.existsSync(path)) {
      let data = fs.readFileSync(path, 'utf8');
      
      let originalData = data;
      // Normal replacement
      data = data.split('vidyadeep-institute-of-paramedical-science').join('vidyadeep-paramedical-institute');
      data = data.split('Vidyadeep Institute of Paramedical Science').join('Vidyadeep Paramedical Institute');
      data = data.split('VIDYADEEP INSTITUTE OF PARAMEDICAL SCIENCE').join('VIDYADEEP PARAMEDICAL INSTITUTE');
      
      // In site-header.tsx the text is split
      if (path.includes('site-header.tsx')) {
        data = data.split('>Institute of Paramedical Science<').join('>Paramedical Institute<');
      }

      if (data !== originalData) {
        fs.writeFileSync(path, data);
        console.log(`Updated ${path}`);
      }
    }
  });
}

updateNameInFiles();
console.log('Update Complete');
