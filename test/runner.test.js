import test from 'node:test';
import assert from 'node:assert';
import { runNotebook } from '../src/runner.js';
import fs from 'fs';
import path from 'path';

test('runNotebook should execute a simple notebook', async (t) => {
  const notebookPath = 'test/temp.ipynb';
  const notebook = {
    cells: [
      {
        cell_type: 'code',
        source: ['global.testValue = 42;']
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

test('runNotebook should execute code that writes to a file using require', async (t) => {
  const notebookPath = 'test/test-write.ipynb';
  const outputPath = path.resolve('test/output.txt');
  const notebook = {
    cells: [
      {
        cell_type: 'code',
        source: [`const fs = require('fs'); fs.writeFileSync('${outputPath.replace(/\\/g, '\\\\')}', 'hello from notebook');`]
      }
    ]
  };
  fs.writeFileSync(notebookPath, JSON.stringify(notebook));

  try {
    await runNotebook(notebookPath);
    const output = fs.readFileSync(outputPath, 'utf8');
    assert.strictEqual(output, 'hello from notebook');
  } finally {
    if (fs.existsSync(notebookPath)) fs.unlinkSync(notebookPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
});

test('runNotebook should throw error for non-existent file', async (t) => {
  await assert.rejects(
    () => runNotebook('non-existent.ipynb'),
    { message: 'File not found: non-existent.ipynb' }
  );
});

test('runNotebook should throw error for invalid JSON', async (t) => {
  const notebookPath = 'test/invalid.ipynb';
  fs.writeFileSync(notebookPath, 'invalid json');

  try {
    await assert.rejects(
      () => runNotebook(notebookPath),
      /Failed to parse notebook JSON/
    );
  } finally {
    if (fs.existsSync(notebookPath)) {
      fs.unlinkSync(notebookPath);
    }
  }
});
