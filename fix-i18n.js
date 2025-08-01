const fs = require('fs');
const path = require('path');

// Read the i18n.ts file
const filePath = path.join(__dirname, 'lib', 'i18n.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Function to find and remove duplicate keys within each language object
function removeDuplicateKeys(content) {
  const lines = content.split('\n');
  const result = [];
  let currentLanguage = null;
  let seenKeys = new Set();
  let inTranslationObject = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect language sections
    if (line.match(/^(en|ar|ha|fr|eg):\s*{/)) {
      currentLanguage = line.match(/^(en|ar|ha|fr|eg):/)[1];
      seenKeys.clear();
      inTranslationObject = false;
      braceCount = 0;
      result.push(lines[i]);
      continue;
    }

    // Detect translation object start
    if (line === 'translation: {' && currentLanguage) {
      inTranslationObject = true;
      seenKeys.clear();
      result.push(lines[i]);
      continue;
    }

    // Track brace count
    if (line.includes('{')) {
      braceCount += (line.match(/{/g) || []).length;
    }
    if (line.includes('}')) {
      braceCount -= (line.match(/}/g) || []).length;
    }

    // Check if we're exiting the translation object
    if (inTranslationObject && braceCount === 0) {
      inTranslationObject = false;
      seenKeys.clear();
    }

    // Process lines within translation objects
    if (inTranslationObject && line.match(/^"[^"]+":\s*"[^"]*",?$/)) {
      const keyMatch = line.match(/^"([^"]+)":/);
      if (keyMatch) {
        const key = keyMatch[1];
        if (seenKeys.has(key)) {
          console.log(`Removing duplicate key "${key}" in ${currentLanguage} section`);
          continue; // Skip this line (duplicate)
        } else {
          seenKeys.add(key);
        }
      }
    }

    result.push(lines[i]);
  }

  return result.join('\n');
}

// Apply the fix
const fixedContent = removeDuplicateKeys(content);

// Write the fixed content back to the file
fs.writeFileSync(filePath, fixedContent, 'utf8');

console.log('✅ Fixed duplicate keys in i18n.ts');
console.log('📝 Please review the file to ensure all translations are correct');

// Also create a backup
const backupPath = path.join(__dirname, 'lib', 'i18n.ts.backup');
fs.writeFileSync(backupPath, content, 'utf8');
console.log(`💾 Backup created at: ${backupPath}`);