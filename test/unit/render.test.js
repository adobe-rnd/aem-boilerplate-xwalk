/* eslint-env mocha */
import {
  executeTestInFolder, testBasicMarkup, testDynamism, testFormFetch,
} from './testUtils.js';

executeTestInFolder('./test/unit/fixtures/components/');
executeTestInFolder('./test/unit/fixtures/components/text-input/', testBasicMarkup, true);

executeTestInFolder('./test/unit/fixtures/form/');
executeTestInFolder('./test/unit/fixtures/dynamic/', testDynamism);
executeTestInFolder('./test/unit/fixtures/reset/', testDynamism);

executeTestInFolder('./test/unit/fixtures/submit/', testDynamism);
executeTestInFolder('./test/unit/fixtures/doc-based-submit/', testDynamism, true);

executeTestInFolder('./test/unit/fixtures/prefill/', testDynamism);
executeTestInFolder('./test/unit/fixtures/docForms/', testDynamism, true);
executeTestInFolder('./test/unit/fixtures/form-fetch/', testFormFetch);
executeTestInFolder('./test/unit/fixtures/form-embed/', testFormFetch);
