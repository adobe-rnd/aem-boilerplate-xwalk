import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read directories and return component names
function getComponentsFromDirectory(dirPath) {
  try {
    return readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();
  } catch (error) {
    return [];
  }
}

// Validate component names for illegal characters
function validateComponentNames(components) {
  const invalidComponents = components.filter(name => {
    // Check for spaces or illegal file characters
    // Allow only letters, numbers, hyphens, and underscores
    return !/^[a-zA-Z0-9_-]+$/.test(name);
  });

  if (invalidComponents.length > 0) {
    console.error('🚨 INVALID COMPONENT NAMES DETECTED!');
    console.error(`❌ Components contain illegal characters:`);
    invalidComponents.forEach(name => {
      console.error(`   • "${name}" - contains spaces or invalid characters`);
    });
    console.error('\n💡 Component names must only contain:');
    console.error('   - Letters (a-z, A-Z)');
    console.error('   - Numbers (0-9)');
    console.error('   - Hyphens (-)');
    console.error('   - Underscores (_)');
    console.error('\n🔧 Please rename the component directories and try again.');
    return false;
  }

  return true;
}

// Read the current OOTB components from mappings.js
function getOOTBComponentsFromMappings(mappingsPath) {
  try {
    const mappingsContent = readFileSync(mappingsPath, 'utf-8');
    const match = mappingsContent.match(/const OOTBComponentDecorators = \[([^\]]*)\];/);

    if (match) {
      const arrayContent = match[1];
      // Extract component names from the array string
      const components = arrayContent
        .split(',')
        .map(item => item.trim().replace(/['"]/g, ''))
        .filter(item => item.length > 0);
      return components;
    }

    return [];
  } catch (error) {
    console.error('❌ Error reading OOTB components from mappings.js:', error.message);
    return [];
  }
}

// Update mappings.js with current component directories
function updateMappings() {
  const mappingsPath = path.join(__dirname, '../blocks/form/mappings.js');

  try {
    // Read current mappings.js
    const mappingsContent = readFileSync(mappingsPath, 'utf-8');

    // Get current components from the single components directory
    const componentsPath = path.join(__dirname, '../blocks/form/components');
    const allComponents = getComponentsFromDirectory(componentsPath);

    // Validate component names before processing
    if (!validateComponentNames(allComponents)) {
      return false;
    }

    // Get OOTB components from the existing mappings.js file
    const ootbComponents = getOOTBComponentsFromMappings(mappingsPath);

    // Calculate custom components by subtracting OOTB from all components
    const customComponents = allComponents.filter(comp => !ootbComponents.includes(comp));

    // Create new custom components array
    const customArrayString = customComponents.map(comp => `'${comp}'`).join(', ');

    // Replace only the custom components array in mappings.js
    let updatedContent = mappingsContent
      .replace(
        /let customComponents = \[([^\]]*)\];/,
        `let customComponents = [${customArrayString}];`
      );

    // Write back to file
    writeFileSync(mappingsPath, updatedContent);

    console.log('✅ Updated mappings.js:');
    console.log(`   Custom components (${customComponents.length}): [${customArrayString}]`);

    return true;
  } catch (error) {
    console.error('❌ Error updating mappings.js:', error.message);
    return false;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateMappings();
}

export { updateMappings };
