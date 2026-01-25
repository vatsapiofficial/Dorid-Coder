import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { createRequire } from 'module';
import webassemblyToolkit from 'webassembly';
import webassemblyjs from 'webassemblyjs';

/**
 * Runs a Jupyter Notebook (.ipynb) file.
 * @param {string} filePath - Path to the notebook file.
 */
export async function runNotebook(filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  let notebook;
  try {
    notebook = JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse notebook JSON: ${err.message}`);
  }

  if (!notebook.cells || !Array.isArray(notebook.cells)) {
    throw new Error('Invalid notebook format: no cells found.');
  }

  // Create a robust require function for the notebook's location
  const notebookRequire = createRequire(absolutePath);

  // Create a sandbox context for execution
  const sandbox = {
    console: {
      log: (...args) => console.log(...args),
      error: (...args) => console.error(...args),
      warn: (...args) => console.warn(...args),
      info: (...args) => console.info(...args),
    },
    // Harden process object
    process: {
      env: { ...process.env },
      cwd: () => process.cwd(),
      stdout: process.stdout,
      stderr: process.stderr,
      version: process.version,
      platform: process.platform,
      arch: process.arch,
      argv: process.argv,
    },
    require: notebookRequire,
    Buffer,
    URL,
    URLSearchParams,
    TextEncoder,
    TextDecoder,
    WebAssembly,
    wasm: webassemblyToolkit,
    webassemblyjs,
    setTimeout,
    setInterval,
    setImmediate,
    clearTimeout,
    clearInterval,
    clearImmediate,
    queueMicrotask,
  };

  // Point global and globalThis to the sandbox itself
  sandbox.global = sandbox;
  sandbox.globalThis = sandbox;

  vm.createContext(sandbox);

  console.log(`Running notebook: ${path.basename(filePath)}`);
  console.log('='.repeat(path.basename(filePath).length + 18));

  for (let i = 0; i < notebook.cells.length; i++) {
    const cell = notebook.cells[i];

    if (cell.cell_type === 'code') {
      const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

      if (!source.trim()) continue;

      try {
        // We use a wrapper to support top-level await if we want,
        // but vm.runInContext doesn't easily support it without more work.
        // For now, standard execution.
        vm.runInContext(source, sandbox);
      } catch (err) {
        console.error(`\n[Cell ${i}] Execution Error:`);
        console.error(err);
      }
    }
  }
}
