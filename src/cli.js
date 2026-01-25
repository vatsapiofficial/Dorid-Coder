#!/usr/bin/env node
import { program } from 'commander';
import { runNotebook } from './runner.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

program
  .name('dorid-coder')
  .description('A lightweight notebook runner for Node.js')
  .version(pkg.version);

program
  .argument('<file>', 'the .ipynb notebook file to run')
  .action(async (file) => {
    try {
      await runNotebook(file);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  });

program.parse();
