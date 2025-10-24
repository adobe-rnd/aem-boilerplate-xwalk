import path from 'path';
import { terser } from 'rollup-plugin-terser';
import {plugins} from './common.js';

const packageName = '@aemforms/af-core'
const directory = `node_modules/${packageName}`;

export default {
  external: ['@adobe/json-formula', '@aemforms/af-formatters'],
  input: {
    runtime: path.join(directory, 'esm/afb-runtime.js'),
    events: path.join(directory, 'esm/afb-events.js'),
  },
  plugins: plugins(packageName),
  output: [{
    dir: 'blocks/form/rules/model',
    format: 'es',
    entryFileNames: 'afb-[name].js',
    paths: {
      '@adobe/json-formula': '../formula/index.js',
      '@aemforms/af-formatters': './afb-formatters.min.js',
    },
  },
  {
    dir: 'blocks/form/rules/model',
    format: 'es',
    entryFileNames: 'afb-[name].min.js',
    paths: {
      '@adobe/json-formula': '../formula/index.min.js',
      '@aemforms/af-formatters': './afb-formatters.min.js',
    },
    plugins: [terser()],
  }],
};
