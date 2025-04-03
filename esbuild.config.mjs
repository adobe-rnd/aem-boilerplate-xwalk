import esbuild from 'esbuild';
import glob from 'glob';
import path from 'path';

const files = glob.sync('./blocks/**/*.min.js'); // Find all .min.js files in the blocks directory
const scripts = glob.sync('./scripts/**/*.min.js'); // Find all .min.js files in the scripts directory

// Combine both files and scripts to process them together
const allFiles = [...files, ...scripts];

const buildPromises = allFiles.map((file) => {
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

