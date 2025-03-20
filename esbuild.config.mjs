import esbuild from 'esbuild';
import glob from 'glob';
import path from 'path';

const files = glob.sync('./blocks/**/*.min.js'); // Find all .min.js files in the blocks directory

const buildPromises = files.map((file) => {
  const outputFile = path.join(
    path.dirname(file),
    path.basename(file, '.min.js') + '.js'
  );

  return esbuild.build({
    entryPoints: [file],
    bundle: false,
    minify: true,
    sourcemap: false,
    platform: 'node',
    outfile: outputFile, // Dynamically output the corresponding file
  });
});

// Wait for all builds to finish
await Promise.all(buildPromises);
