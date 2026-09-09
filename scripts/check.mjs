import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = ['dist/index.html', 'dist/styles.css', 'dist/app.js', 'dist/auth.js', 'dist/config.js', 'dist/assets/favicon.svg', 'dist/assets/fields.jpg', 'dist/assets/ocp-logo.png'];
for (const file of files) {
  const full = path.join(root, file);
  if (!(await stat(full)).size) throw new Error(`Empty file: ${file}`);
  if (file.endsWith('.js')) execFileSync(process.execPath, ['--check', full]);
}
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
if (!html.includes('lang="fr"')) throw new Error('Missing French language declaration');
const css = await readFile(path.join(root, 'dist/styles.css'), 'utf8');
if (!css.includes('prefers-reduced-motion')) throw new Error('Missing reduced motion support');
console.log('GENBI: entrypoint, local assets and JavaScript syntax verified.');
