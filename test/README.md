

## Running test cases
To execute both unit and e2e test use command
```sh
npm run test
```
### Unit Tests
Run the following command to execute unit tests
```sh
npm run test:unit
```

### Integration Tests

#### Test collateral Creation

##### Doc Based Forms
1. Make sure you have access to the drive folder specified in the fstab of this project.
2. Create all collaterals under the `/drafts/tests/doc-based` folder.
3. Publish it using AEM sidekick.


##### Cross-walk Forms
1. Use cloud instance:https://author-p133911-e1313554.adobeaemcloud.com/.
2. Create test collateral inside `/formsanddocuments/xwalk-test-collateral` folder and then publish it.
3. Create a page with a form block in `/drafts/tests/x-walk` folder in drive. 
4. Add the published guideContainer.model.json url of the test collateral in the form block.
5. Now publish the page using AEM sidekick.


#### Running tests

Run the following command to execute integration tests
```sh
npm run test:e2e
```
To run a specific test file, use the following command
```sh
npm run test:e2e <name-of-the-test-file>
```

To debug a specific test file, use the following command
```sh
npm run debug:e2e <name-of-the-test-file>
```

**NOTE**: _To debug your e2e test locally comment the ``globalSetup`` in the ``playwright.config.js``_
