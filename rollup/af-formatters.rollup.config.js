import path from 'path';
import { terser } from 'rollup-plugin-terser';
import {plugins} from './common.js';

const packageName = '@aemforms/af-formatters'
const directory = `node_modules/${packageName}`;

export default {
  input: {
    'afb-formatters': path.join(directory, 'esm/afb-formatters.js'),
  },
  plugins: plugins(packageName),
  output: [{
    dir: 'blocks/form/rules/model',
    format: 'es',
    entryFileNames: 'afb-formatters.js',
  },
  {
    dir: 'blocks/form/rules/model',
    format: 'es',
    entryFileNames: 'afb-formatters.min.js',
    plugins: [terser()],
  }],
};
