import esbuild from 'esbuild';
import glob from 'glob';
import path from 'path';

const files = glob.sync('./**/**/*.js'); // Find all .min.js files in the blocks directory
// const scripts = glob.sync('./scripts/**/*.min.js'); // Find all .min.js files in the scripts directory
const styles = glob.sync('./**/**/*.css'); // Find all .min.css files in the styles directory

// Combine all files (blocks, scripts, and styles) into one array
// const allFiles = [...files, ...styles];
const allFiles = [
  ...files.filter(file => !file.endsWith('.min.js')),
  ...styles.filter(file => !file.endsWith('.min.css'))
];

const buildPromises = allFiles.map((file) => {
  const isCSS = file.endsWith('.css');  // Check if it's a .min.css file
  const outputFile = path.join(
    path.dirname(file),
    path.basename(file, isCSS ? '.css' : '.js') + (isCSS ? '.min.css' : '.min.js')
  );

  return esbuild.build({
    entryPoints: [file],
    bundle: false,
    minify: true,
    sourcemap: false,
    platform: 'node',
    outfile: outputFile, // Output the file with proper extension
  });
});

// Wait for all builds to finish
await Promise.all(buildPromises);
