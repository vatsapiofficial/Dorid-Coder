# Dorid-Coder 🚀

A lightweight, efficient Jupyter Notebook (.ipynb) runner for Node.js.

Built for developers who want to execute JavaScript-based notebooks directly from the terminal or integrate notebook execution into their Node.js workflows.

## Features

- ✅ **Simple CLI**: Run any `.ipynb` file with a single command.
- ✅ **Sandboxed Execution**: Code runs in a secure `vm` context.
- ✅ **Captures Console Output**: All `console.log`, `error`, etc., are captured and displayed.
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
dorid-coder run my-notebook.ipynb
```

### Programmatic API

You can also use `dorid-coder` in your own Node.js projects:

```javascript
import { runNotebook } from 'dorid-coder';

await runNotebook('./path/to/notebook.ipynb');
```

## Notebook Format

`dorid-coder` supports the standard Jupyter Notebook format (v4). It specifically executes cells of type `code` where the language is JavaScript.

## Why "Dorid"?

"Dorid" is inspired by the agility and adaptability of sea slugs (Dorididae) and also pays homage to the "Droid" ecosystem, signifying a tool that is both robust and versatile for mobile and desktop environments alike.

---

Developed with ❤️ by [vatsapiofficial](https://github.com/vatsapiofficial).
