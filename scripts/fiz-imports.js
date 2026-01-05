import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

async function fixImports(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await fixImports(fullPath);
    } else if (file.name.endsWith('.js')) {
      let content = await readFile(fullPath, 'utf-8');
      
      // Corrige imports relativos sem extensão
      content = content.replace(
        /from\s+['"](\.\/.+?)['"];/g,
        (match, importPath) => {
          if (!importPath.endsWith('.js')) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      // Corrige imports relativos com ../
      content = content.replace(
        /from\s+['"](\.\.\/.+?)['"];/g,
        (match, importPath) => {
          if (!importPath.endsWith('.js')) {
            return match.replace(importPath, importPath + '.js');
          }
          return match;
        }
      );
      
      await writeFile(fullPath, content);
      console.log(`✅ Corrigido: ${file.name}`);
    }
  }
}

console.log('🔧 Corrigindo imports...');
await fixImports('./dist');
console.log('✅ Imports corrigidos!');