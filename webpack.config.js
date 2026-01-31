import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'node',
  mode: 'production',
  entry: './src/cli.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dorid-coder.cjs',
  },
  experiments: {
    topLevelAwait: true,
  },
  externals: {
    // We might want to keep some dependencies external if they don't bundle well
    // but for a single-file tool, bundling most is fine.
    // However, binary modules MUST be external.
    'webassembly': 'commonjs webassembly',
  },
};
