import test from 'node:test';
import assert from 'node:assert';
import { runNotebook } from '../src/runner.js';
import fs from 'fs';

test('WebAssembly and toolkits should be available in the sandbox', async (t) => {
  const notebookPath = 'test/wasm-test.ipynb';
  const notebook = {
    cells: [
      {
        cell_type: 'code',
        source: [
          'if (typeof WebAssembly === "undefined") throw new Error("WebAssembly not found");',
          'if (typeof wasm === "undefined") throw new Error("wasm toolkit not found");',
          'if (typeof webassemblyjs === "undefined") throw new Error("webassemblyjs not found");'
        ]
      }
    ]
  };
  fs.writeFileSync(notebookPath, JSON.stringify(notebook));

  try {
    await runNotebook(notebookPath);
    assert.ok(true);
  } finally {
    if (fs.existsSync(notebookPath)) {
      fs.unlinkSync(notebookPath);
    }
  }
});
