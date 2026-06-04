import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  'src/assets/ezgif-1354f6978a4e68c0-jpg',
  'src/assets/ezgif-38fa852f1ff2fb3e-jpg'
];

async function compressImages() {
  for (const dir of dirs) {
    const fullPath = path.resolve(dir);
    if (!fs.existsSync(fullPath)) continue;
    
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.webp'));
    console.log(`Compressing ${files.length} images in ${dir}...`);
    
    for (const file of files) {
      const filePath = path.join(fullPath, file);
      const tempPath = path.join(fullPath, `temp_${file}`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 60 }) // Reduce quality to compress
          .toFile(tempPath);
          
        fs.renameSync(tempPath, filePath);
      } catch (e) {
        console.error(`Error compressing ${file}:`, e);
      }
    }
    console.log(`Finished ${dir}`);
  }
}

compressImages();
