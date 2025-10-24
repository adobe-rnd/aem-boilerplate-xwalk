/* eslint-env mocha */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Test Repository Structure Dependencies
 * These tests ensure the scaffolder's dependencies on repo structure are intact
 * If someone alters/removes/changes the structure, tests will fail to alert devs
 */
describe('Forms Scaffolder - Repository Structure', () => {
  describe('Required Directories', () => {
    it('should have blocks/form/models/form-components directory', () => {
      const modelsDir = path.join(__dirname, '../../blocks/form/models/form-components');
      expect(fs.existsSync(modelsDir)).to.be.true;
      expect(fs.lstatSync(modelsDir).isDirectory()).to.be.true;
    });

    it('should have blocks/form/components directory', () => {
      const componentsDir = path.join(__dirname, '../../blocks/form/components');
      expect(fs.existsSync(componentsDir)).to.be.true;
      expect(fs.lstatSync(componentsDir).isDirectory()).to.be.true;
    });

    it('should have blocks/form/mappings.js file', () => {
      const mappingsFile = path.join(__dirname, '../../blocks/form/mappings.js');
      expect(fs.existsSync(mappingsFile)).to.be.true;
      expect(fs.lstatSync(mappingsFile).isFile()).to.be.true;
    });

    it('should have blocks/form/_form.json file', () => {
      const formJsonFile = path.join(__dirname, '../../blocks/form/_form.json');
      expect(fs.existsSync(formJsonFile)).to.be.true;
      expect(fs.lstatSync(formJsonFile).isFile()).to.be.true;
    });

    it('should have tools/update-mappings.js file', () => {
      const updateMappingsFile = path.join(__dirname, '../../tools/update-mappings.js');
      expect(fs.existsSync(updateMappingsFile)).to.be.true;
      expect(fs.lstatSync(updateMappingsFile).isFile()).to.be.true;
    });

    it('should have tools/forms-scaffolder.js file', () => {
      const scaffolderFile = path.join(__dirname, '../../tools/forms-scaffolder.js');
      expect(fs.existsSync(scaffolderFile)).to.be.true;
      expect(fs.lstatSync(scaffolderFile).isFile()).to.be.true;
    });

    it('should have models/_component-definition.json file', () => {
      const componentDefFile = path.join(__dirname, '../../models/_component-definition.json');
      expect(fs.existsSync(componentDefFile)).to.be.true;
      expect(fs.lstatSync(componentDefFile).isFile()).to.be.true;
    });
  });

  describe('Base Components Structure', () => {
    const expectedBaseComponents = [
      '_button.json',
      '_checkbox.json',
      '_checkbox-group.json',
      '_date-input.json',
      '_drop-down.json',
      '_email.json',
      '_number-input.json',
      '_panel.json',
      '_radio-group.json',
      '_reset-button.json',
      '_submit-button.json',
      '_telephone-input.json',
      '_text.json',
      '_text-input.json',
    ];

    expectedBaseComponents.forEach((componentFile) => {
      it(`should have base component ${componentFile}`, () => {
        const componentPath = path.join(__dirname, '../../blocks/form/models/form-components', componentFile);
        expect(fs.existsSync(componentPath)).to.be.true;
      });
    });
  });

  describe('_form.json Structure', () => {
    let formJson;

    before(() => {
      const formJsonPath = path.join(__dirname, '../../blocks/form/_form.json');
      const content = fs.readFileSync(formJsonPath, 'utf-8');
      formJson = JSON.parse(content);
    });

    it('should have filters array with form filter', () => {
      expect(formJson.filters).to.be.an('array');
      expect(formJson.filters.length).to.be.greaterThan(0);
      
      const formFilter = formJson.filters.find(f => f.id === 'form');
      expect(formFilter).to.exist;
      expect(formFilter.components).to.be.an('array');
      expect(formFilter.components.length).to.be.greaterThan(0);
    });
  });

  describe('_component-definition.json Structure', () => {
    let componentDef;

    before(() => {
      const componentDefPath = path.join(__dirname, '../../models/_component-definition.json');
      const content = fs.readFileSync(componentDefPath, 'utf-8');
      componentDef = JSON.parse(content);
    });

    it('should have groups array with custom-components group', () => {
      expect(componentDef.groups).to.be.an('array');
      expect(componentDef.groups.length).to.be.greaterThan(0);
      
      const customGroup = componentDef.groups.find(g => g.id === 'custom-components');
      expect(customGroup).to.exist;
      expect(customGroup.title).to.equal('Custom Form Components');
      expect(customGroup.components).to.be.an('array');
    });
  });
});
