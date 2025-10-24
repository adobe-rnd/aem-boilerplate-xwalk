import path from 'path';
import * as pkg from '../package.json';
import fs from 'fs';
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license';

export function readLicenseFile(packageName, includeComments = true) {
  const directory =`node_modules/${packageName}`;
  const licensePath = path.join(directory, 'LICENSE');
  try {
    let content = fs.readFileSync(licensePath, 'utf-8');
    if (includeComments) {
    content += `
/*
 *  Package: ${packageName}
 *  Version: ${pkg.devDependencies[packageName]}
 */`
    } else {
      content += `

 Package: ${packageName}
 Version: ${pkg.devDependencies[packageName]}
`
    }
    return content;
  } catch (error) {
    console.error('Error reading the LICENSE file:', error);
    return null;
  }
}

export function plugins(pkgname) {
  const licenseContent = readLicenseFile(pkgname)
  return [
    cleanup({
      comments: 'none',
    }),
    license({
      banner: licenseContent,
    }),
  ]
}
