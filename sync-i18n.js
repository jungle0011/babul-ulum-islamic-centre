const fs = require('fs');
const file = 'lib/i18n.ts';
let data = fs.readFileSync(file, 'utf8');

function extractTranslationBlock(lang) {
  const match = data.match(new RegExp(`${lang}:\\s*{\\s*translation:\\s*({[\\s\\S]*?})\\s*}`));
  return match ? match[1] : null;
}

const enBlock = extractTranslationBlock('en');
const arBlock = extractTranslationBlock('ar');

if (enBlock && arBlock) {
  data = data.replace(/ha:\s*{[\s\S]*?translation:\s*{[\s\S]*?}\s*}/, `ha: { translation: ${enBlock} }`);
  data = data.replace(/eg:\s*{[\s\S]*?translation:\s*{[\s\S]*?}\s*}/, `eg: { translation: ${arBlock} }`);
  fs.writeFileSync(file, data);
  console.log('Hausa and Egyptian Arabic translations synced!');
} else {
  console.error('Could not find English or Arabic translation blocks.');
}