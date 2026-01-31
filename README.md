# Dorid-Coder 🚀

A lightweight, efficient Jupyter Notebook (.ipynb) runner for Node.js.

Built for developers who want to execute JavaScript-based notebooks directly from the terminal or integrate notebook execution into their Node.js workflows.

## Features

- ✅ **Simple CLI**: Run any `.ipynb` file with a single command.
- ✅ **Sandboxed Execution**: Code runs in a secure `vm` context.
- ✅ **Captures Console Output**: All `console.log`, `error`, etc., are captured and displayed.
- ✅ **Built-in WebAssembly Support**: Includes `WebAssembly` globals and integrated toolkits like `wasm` and `webassemblyjs`.
- ✅ **Minimal Dependencies**: Fast and lightweight.

## Installation

You can install `dorid-coder` globally via npm:

```bash
npm install -g dorid-coder
```

Or run it directly using `npx`:

```bash
npx dorid-coder <your-notebook>.ipynb
```

## Usage

### CLI

To run a notebook:

```bash
dorid-coder my-notebook.ipynb
```

### Programmatic API

You can also use `dorid-coder` in your own Node.js projects:

```javascript
import { runNotebook } from 'dorid-coder';

await runNotebook('./path/to/notebook.ipynb');
```

### WebAssembly Support

`dorid-coder` comes with built-in WebAssembly support. You can use the standard `WebAssembly` API, or the included `wasm` and `webassemblyjs` toolkits:

```javascript
// In your notebook cell:
wasm.load("module.wasm").then(module => {
  // ...
});
```

## Notebook Format

`dorid-coder` supports the standard Jupyter Notebook format (v4). It specifically executes cells of type `code` where the language is JavaScript.

## Development

### Build

To bundle the project using Webpack:

```bash
npm run build
```

### Test

To run the test suite:

```bash
npm test
```

## Why "Dorid"?

"Dorid" is inspired by the agility and adaptability of sea slugs (Dorididae) and also pays homage to the "Droid" ecosystem, signifying a tool that is both robust and versatile for mobile and desktop environments alike.

---

Developed with ❤️ by [vatsapiofficial](https://github.com/vatsapiofficial).
