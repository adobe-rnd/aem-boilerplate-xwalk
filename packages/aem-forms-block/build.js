import * as esbuild from 'esbuild';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const mappingsPath = resolve(__dirname, '../../blocks/form/mappings.js');
const mappingsStatic = resolve(__dirname, './src/mappings-static.js');

// Redirects imports of blocks/form/mappings.js to the static registry so
// esbuild can bundle all components without window.hlx path lookups.
const mappingsAliasPlugin = {
  name: 'mappings-alias',
  setup(build) {
    build.onResolve({ filter: /mappings\.js$/ }, (args) => {
      const resolved = resolve(args.resolveDir, args.path);
      if (resolved === mappingsPath) {
        return { path: mappingsStatic };
      }
      return null;
    });
  },
};

// Replaces `typeof Worker` with `"undefined"` across all JS files so every
// Worker guard evaluates to true. This covers both rules/index.js (which
// decides the no-worker path) and form.js (which guards the loadRuleEngine
// call). esbuild then constant-folds the conditions and the Worker branch
// becomes dead code.
const noWorkerPlugin = {
  name: 'no-worker',
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      const contents = await readFile(args.path, 'utf8');
      if (!contents.includes('typeof Worker')) return null;
      return {
        contents: contents.replace(/typeof Worker/g, '"undefined"'),
        loader: 'js',
      };
    });
  },
};

async function run() {
  await esbuild.build({
    entryPoints: [resolve(__dirname, '../../blocks/form/form.js')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    outfile: resolve(__dirname, 'dist/form.js'),
    plugins: [mappingsAliasPlugin, noWorkerPlugin],
  });

  await esbuild.build({
    entryPoints: [resolve(__dirname, 'styles-entry.css')],
    bundle: true,
    outfile: resolve(__dirname, 'dist/form.css'),
    loader: { '.png': 'dataurl' },
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
