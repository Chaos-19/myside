const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '../.next/standalone');
const staticSrc = path.join(__dirname, '../.next/static');
const staticDest = path.join(standaloneDir, '.next/static');
const publicSrc = path.join(__dirname, '../public');
const publicDest = path.join(standaloneDir, 'public');

console.log('Copying static assets to standalone directory...');

try {
  // Ensure standalone directory exists (it should after build)
  if (!fs.existsSync(standaloneDir)) {
    console.error('Standalone directory not found. Did the build succeed?');
    process.exit(1);
  }

  // Copy .next/static
  if (fs.existsSync(staticSrc)) {
    // Ensure destination parent directory exists
    const staticDestParent = path.dirname(staticDest);
    if (!fs.existsSync(staticDestParent)) {
      fs.mkdirSync(staticDestParent, { recursive: true });
    }
    
    fs.cpSync(staticSrc, staticDest, { recursive: true });
    console.log('Copied .next/static');
  } else {
    console.warn('.next/static not found');
  }

  // Copy public
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true });
    console.log('Copied public');
  } else {
    console.warn('public directory not found');
  }
  
  console.log('Postbuild complete.');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
}
