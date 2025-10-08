/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2022 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.

* Adobe permits you to use and modify this file solely in accordance with
* the terms of the Adobe license agreement accompanying it.
*************************************************************************/

/*
 *  Package: @aemforms/af-core
 *  Version: 0.22.156
 */
import { propertyChange, ExecuteRule, Initialize, RemoveItem, Change, FormLoad, FieldChanged, ValidationComplete, Valid, Invalid, SubmitSuccess, CustomEvent, RequestSuccess, RequestFailure, SubmitError, Submit, Save, Reset, SubmitFailure, Focus, RemoveInstance, AddInstance, AddItem, Click } from './afb-events.js';
import Formula from '../formula/index.js';
import { format, parseDefaultDate, datetimeToNumber, parseDateSkeleton, numberToDatetime, formatDate, parseDate } from './afb-formatters.min.js';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const ConstraintType = Object.freeze({
    PATTERN_MISMATCH: 'patternMismatch',
    TOO_SHORT: 'tooShort',
    TOO_LONG: 'tooLong',
    RANGE_OVERFLOW: 'rangeOverflow',
    RANGE_UNDERFLOW: 'rangeUnderflow',
    TYPE_MISMATCH: 'typeMismatch',
    VALUE_MISSING: 'valueMissing',
    STEP_MISMATCH: 'stepMismatch',
    FORMAT_MISMATCH: 'formatMismatch',
    ACCEPT_MISMATCH: 'acceptMismatch',
    FILE_SIZE_MISMATCH: 'fileSizeMismatch',
    UNIQUE_ITEMS_MISMATCH: 'uniqueItemsMismatch',
    MIN_ITEMS_MISMATCH: 'minItemsMismatch',
    MAX_ITEMS_MISMATCH: 'maxItemsMismatch',
    EXPRESSION_MISMATCH: 'expressionMismatch',
    EXCLUSIVE_MAXIMUM_MISMATCH: 'exclusiveMaximumMismatch',
    EXCLUSIVE_MINIMUM_MISMATCH: 'exclusiveMinimumMismatch',
    ENUM_MISMATCH: 'enumMismatch'
});
const constraintKeys = Object.freeze({
    pattern: ConstraintType.PATTERN_MISMATCH,
    minLength: ConstraintType.TOO_SHORT,
    maxLength: ConstraintType.TOO_LONG,
    maximum: ConstraintType.RANGE_OVERFLOW,
    minimum: ConstraintType.RANGE_UNDERFLOW,
    type: ConstraintType.TYPE_MISMATCH,
    required: ConstraintType.VALUE_MISSING,
    step: ConstraintType.STEP_MISMATCH,
    format: ConstraintType.FORMAT_MISMATCH,
    accept: ConstraintType.ACCEPT_MISMATCH,
    maxFileSize: ConstraintType.FILE_SIZE_MISMATCH,
    uniqueItems: ConstraintType.UNIQUE_ITEMS_MISMATCH,
    minItems: ConstraintType.MIN_ITEMS_MISMATCH,
    maxItems: ConstraintType.MAX_ITEMS_MISMATCH,
    validationExpression: ConstraintType.EXPRESSION_MISMATCH,
    exclusiveMinimum: ConstraintType.EXCLUSIVE_MINIMUM_MISMATCH,
    exclusiveMaximum: ConstraintType.EXCLUSIVE_MAXIMUM_MISMATCH,
    enum: ConstraintType.ENUM_MISMATCH
});
const defaultConstraintTypeMessages = Object.freeze({
    [ConstraintType.PATTERN_MISMATCH]: 'Please match the format requested.',
    [ConstraintType.TOO_SHORT]: 'Please lengthen this text to ${0} characters or more.',
    [ConstraintType.TOO_LONG]: 'Please shorten this text to ${0} characters or less.',
    [ConstraintType.RANGE_OVERFLOW]: 'Value must be less than or equal to ${0}.',
    [ConstraintType.RANGE_UNDERFLOW]: 'Value must be greater than or equal to ${0}.',
    [ConstraintType.TYPE_MISMATCH]: 'Please enter a valid value.',
    [ConstraintType.VALUE_MISSING]: 'Please fill in this field.',
    [ConstraintType.STEP_MISMATCH]: 'Please enter a valid value.',
    [ConstraintType.FORMAT_MISMATCH]: 'Specify the value in allowed format : ${0}.',
    [ConstraintType.ACCEPT_MISMATCH]: 'The specified file type not supported.',
    [ConstraintType.FILE_SIZE_MISMATCH]: 'File too large. Reduce size and try again.',
    [ConstraintType.UNIQUE_ITEMS_MISMATCH]: 'All the items must be unique.',
    [ConstraintType.MIN_ITEMS_MISMATCH]: 'Specify a number of items equal to or greater than ${0}.',
    [ConstraintType.MAX_ITEMS_MISMATCH]: 'Specify a number of items equal to or less than ${0}.',
    [ConstraintType.EXPRESSION_MISMATCH]: 'Please enter a valid value.',
    [ConstraintType.EXCLUSIVE_MINIMUM_MISMATCH]: 'Value must be greater than ${0}.',
    [ConstraintType.EXCLUSIVE_MAXIMUM_MISMATCH]: 'Value must be less than ${0}.',
    [ConstraintType.ENUM_MISMATCH]: 'Please select a value from the allowed options.'
});
let customConstraintTypeMessages = {};
const getConstraintTypeMessages = () => {
    return {
        ...defaultConstraintTypeMessages,
        ...customConstraintTypeMessages
    };
};
var EventSource;
(function (EventSource) {
    EventSource["CODE"] = "code";
    EventSource["UI"] = "ui";
})(EventSource || (EventSource = {}));
class ValidationError {
    fieldName;
    errorMessages;
    constructor(fieldName = '', errorMessages = []) {
        this.errorMessages = errorMessages;
        this.fieldName = fieldName;
    }
}
var FocusOption;
(function (FocusOption) {
    FocusOption["NEXT_ITEM"] = "nextItem";
    FocusOption["PREVIOUS_ITEM"] = "previousItem";
})(FocusOption || (FocusOption = {}));
var CaptchaDisplayMode;
(function (CaptchaDisplayMode) {
    CaptchaDisplayMode["INVISIBLE"] = "invisible";
    CaptchaDisplayMode["VISIBLE"] = "visible";
})(CaptchaDisplayMode || (CaptchaDisplayMode = {}));
const objToMap = (o) => new Map(Object.entries(o));
const stringViewTypes = objToMap({ 'date': 'date-input', 'data-url': 'file-input', 'binary': 'file-input' });
const typeToViewTypes = objToMap({
    'number': 'number-input',
    'boolean': 'checkbox',
    'object': 'panel',
    'array': 'panel',
    'file': 'file-input',
    'file[]': 'file-input'
});
const arrayTypes = ['string[]', 'boolean[]', 'number[]', 'array'];
const defaultFieldTypes = (schema) => {
    const type = schema.type || 'string';
    if ('enum' in schema) {
        const enums = schema.enum;
        if (enums.length > 2 || arrayTypes.indexOf(type) > -1) {
            return 'drop-down';
        }
        else {
            return 'checkbox';
        }
    }
    if (type === 'string' || type === 'string[]') {
        return stringViewTypes.get(schema.format) || 'text-input';
    }
    return typeToViewTypes.get(type) || 'text-input';
};
const getProperty = (data, key, def) => {
    if (key in data) {
        return data[key];
    }
    else if (!key.startsWith(':')) {
        const prefixedKey = `:${key}`;
        if (prefixedKey in data) {
            return data[prefixedKey];
        }
    }
    return def;
};
const isFile = function (item) {
    return (item?.type === 'file' || item?.type === 'file[]') ||
        ((item?.type === 'string' || item?.type === 'string[]') &&
            (item?.format === 'binary' || item?.format === 'data-url')) ||
        item?.fieldType === 'file-input';
};
const isCheckbox = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'checkbox';
};
const isCheckboxGroup = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'checkbox-group';
};
const isEmailInput = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return (fieldType === 'text-input' && item?.format === 'email') || fieldType === 'email';
};
const isDateTimeField = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return (fieldType === 'text-input' && item?.format === 'date-time') || fieldType === 'datetime-input';
};
const isDateField = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return (fieldType === 'text-input' && item?.format === 'date') || fieldType === 'date-input';
};
const isCaptcha = function (item) {
    const fieldType = item?.fieldType || defaultFieldTypes(item);
    return fieldType === 'captcha';
};
const isButton = function (item) {
    return item?.fieldType === 'button';
};
function deepClone(obj, idGenerator) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let result;
    if (Array.isArray(obj)) {
        result = new Array(obj.length);
        for (let i = 0; i < obj.length; i++) {
            result[i] = deepClone(obj[i], idGenerator);
        }
    }
    else {
        result = {};
        for (const key of Object.keys(obj)) {
            result[key] = deepClone(obj[key], idGenerator);
        }
    }
    if (idGenerator && result && result.id) {
        result.id = idGenerator();
    }
    return result;
}
const jsonString = (obj) => {
    return JSON.stringify(obj, null, 2);
};
const isRepeatable$1 = (obj) => {
    return ((obj.repeatable &&
        ((obj.minOccur === undefined && obj.maxOccur === undefined) ||
            (obj.minOccur !== undefined && obj.maxOccur !== undefined && obj.maxOccur !== 0) ||
            (obj.minOccur !== undefined && obj.maxOccur !== undefined && obj.minOccur !== 0 && obj.maxOccur !== 0) ||
            (obj.minOccur !== undefined && obj.minOccur >= 0) ||
            (obj.maxOccur !== undefined && obj.maxOccur !== 0))) || false);
};
class PropertiesManager {
    constructor(host) {
        this.host = host;
        this._definedProperties = new Set();
        this._propertiesWrapper = {};
        this._initialized = false;
    }
    get properties() {
        if (!this._initialized) {
            this._setupInitialProperties();
            this._initialized = true;
        }
        return this._propertiesWrapper;
    }
    set properties(p) {
        const oldProperties = this.host._jsonModel.properties || {};
        const newProperties = { ...p };
        this.host._jsonModel.properties = newProperties;
        Object.keys(newProperties).forEach(prop => {
            this._ensurePropertyDescriptor(prop);
        });
        Object.keys({ ...oldProperties, ...newProperties }).forEach(prop => {
            if (oldProperties[prop] !== newProperties[prop]) {
                const changeAction = propertyChange(`properties.${prop}`, newProperties[prop], oldProperties[prop]);
                this.host.notifyDependents(changeAction);
            }
        });
    }
    ensurePropertyDescriptor(propertyName) {
        this._ensurePropertyDescriptor(propertyName);
    }
    _setupInitialProperties() {
        const properties = this.host._jsonModel.properties || {};
        Object.keys(properties).forEach(prop => {
            this._ensurePropertyDescriptor(prop);
        });
        if (!this.host._jsonModel.properties) {
            this.host._jsonModel.properties = {};
        }
    }
    _ensurePropertyDescriptor(prop) {
        if (this._definedProperties.has(prop)) {
            return;
        }
        Object.defineProperty(this._propertiesWrapper, prop, {
            get: () => {
                if (!prop.startsWith('fd:')) {
                    this.host.ruleEngine.trackDependency(this.host, `properties.${prop}`);
                }
                const properties = this.host._jsonModel.properties || {};
                return properties[prop];
            },
            set: (value) => {
                const properties = this.host._jsonModel.properties || {};
                const oldValue = properties[prop];
                if (oldValue !== value) {
                    const updatedProperties = { ...properties, [prop]: value };
                    this.host._jsonModel.properties = updatedProperties;
                    const changeAction = propertyChange(`properties.${prop}`, value, oldValue);
                    this.host.notifyDependents(changeAction);
                }
            },
            enumerable: true,
            configurable: true
        });
        this._definedProperties.add(prop);
    }
    updateNestedProperty(propertyPath, value) {
        const parts = propertyPath.split('.');
        const topLevelProp = parts[0];
        this._ensurePropertyDescriptor(topLevelProp);
        const properties = this.host._jsonModel.properties || {};
        const updatedProperties = JSON.parse(JSON.stringify(properties));
        const currentObj = updatedProperties[topLevelProp] || {};
        updatedProperties[topLevelProp] = currentObj;
        let parentObj = currentObj;
        for (let i = 1; i < parts.length - 1; i++) {
            if (!parentObj[parts[i]]) {
                parentObj[parts[i]] = {};
            } else if (typeof parentObj[parts[i]] !== 'object') {
                parentObj[parts[i]] = {};
            }
            parentObj = parentObj[parts[i]];
        }
        const finalProp = parts[parts.length - 1];
        const oldValue = parentObj[finalProp];
        parentObj[finalProp] = value;
        this.host._jsonModel.properties = updatedProperties;
        const changeAction = propertyChange(`properties.${propertyPath}`, value, oldValue);
        this.host.notifyDependents(changeAction);
    }
    updateSimpleProperty(propertyName, value) {
        this._ensurePropertyDescriptor(propertyName);
        this._propertiesWrapper[propertyName] = value;
    }
}
class DataValue {
    $_name;
    $_value;
    $_type;
    $_fields = [];
    parent;
    constructor($_name, $_value, $_type = typeof $_value, parent) {
        this.$_name = $_name;
        this.$_value = $_value;
        this.$_type = $_type;
        this.parent = parent;
    }
    valueOf() {
        return this.$_value;
    }
    get $name() {
        return this.$_name;
    }
    get disabled() {
        const enabled = this.$_fields.find(x => x.enabled !== false);
        return (!enabled && this.$_fields.length);
    }
    get $value() {
        const formInFileInput = this.$_fields.find(x => {
            if (isFile(x)) {
                return x;
            }
        });
        if (formInFileInput && (this.$_fields.every(_ => ['string', 'string[]'].includes(_.type)))) {
            const attachmentMap = formInFileInput.form._exportDataAttachmentMap;
            if (attachmentMap && attachmentMap[formInFileInput.id]) {
                const attachment = attachmentMap[formInFileInput.id];
                if (Array.isArray(attachment)) {
                    return attachment.map(item => item.data);
                }
                else {
                    return attachment.data;
                }
            }
        }
        return this.$_value;
    }
    setValue(typedValue, originalValue, fromField) {
        this.$_value = typedValue;
        this.$_fields.forEach(x => {
            if (fromField !== x) {
                x.value = originalValue;
            }
        });
    }
    get $type() {
        return this.$_type;
    }
    $bindToField(field) {
        if (this.$_fields.indexOf(field) === -1) {
            this.$_fields.push(field);
            this._checkForTypeConflicts(field);
        }
    }
    _checkForTypeConflicts(newField) {
        if (this.$_fields.length <= 1) {
            return;
        }
        const newFieldType = newField.type;
        const conflictingFields = this.$_fields.filter(existingField => existingField &&
            existingField !== newField &&
            existingField.type !== newFieldType);
        if (conflictingFields.length > 0) {
            const conflictDetails = conflictingFields.map(field => `Field "${field.id}" (${field.type})`).join(', ');
            console.error('Type conflict detected: Multiple fields with same dataRef have different types. ' +
                `New field '${newField.id}' (${newFieldType}) conflicts with: ${conflictDetails}. ` +
                `DataRef: ${this.$name}`);
        }
    }
    $convertToDataValue() {
        return this;
    }
    get $isDataGroup() {
        return false;
    }
    $addDataNode(name, value, override = false) {
        throw 'add Data Node is called on a data value';
    }
}
const value = Symbol('NullValue');
class NullDataValueClass extends DataValue {
    constructor() {
        super('', value, 'null');
    }
    setValue() {
    }
    $bindToField() {
    }
    $length() {
        return 0;
    }
    $convertToDataValue() {
        return this;
    }
    $addDataNode() {
    }
    $removeDataNode() {
    }
    $getDataNode() {
        return this;
    }
    $containsDataNode() {
        return false;
    }
}
const NullDataValue = new NullDataValueClass();
class DataGroup extends DataValue {
    $_items;
    createEntry(key, value, parent) {
        const t = Array.isArray(value) ? 'array' : typeof value;
        if (typeof value === 'object' && value != null) {
            return new DataGroup(key, value, t, parent);
        }
        else {
            return new DataValue(key, value, t, parent);
        }
    }
    constructor(_name, _value, _type = typeof _value, parent) {
        super(_name, _value, _type, parent);
        if (_value instanceof Array) {
            this.$_items = _value.map((value, index) => {
                return this.createEntry(index, value, this);
            });
        }
        else {
            this.$_items = Object.fromEntries(Object.entries(_value).map(([key, value]) => {
                return [key, this.createEntry(key, value, this)];
            }));
        }
    }
    get $value() {
        if (this.$type === 'array') {
            return Object.values(this.$_items).filter(x => typeof x !== 'undefined' && !x.disabled).map(x => x.$value);
        }
        else {
            return Object.fromEntries(Object.values(this.$_items).filter(x => typeof x !== 'undefined' && !x.disabled).map(x => {
                return [x.$name, x.$value];
            }));
        }
    }
    get $length() {
        return Object.entries(this.$_items).length;
    }
    $convertToDataValue() {
        return new DataValue(this.$name, this.$value, this.$type, this.parent);
    }
    syncDataAndFormModel(fromContainer) {
        this.$_fields.forEach(x => {
            if (fromContainer && fromContainer !== x) {
                x.syncDataAndFormModel(this);
            }
        });
    }
    $addDataNode(name, value, override = false, fromContainer = null) {
        if (value !== NullDataValue) {
            if (this.$type === 'array') {
                const index = name;
                if (!override) {
                    this.$_items.splice(index, 0, value);
                }
                else {
                    this.$_items[name] = value;
                }
                this.syncDataAndFormModel(fromContainer);
            }
            else {
                this.$_items[name] = value;
            }
            value.parent = this;
        }
    }
    $removeDataNode(name, fromContainer = null) {
        if (this.$type === 'array') {
            this.$_items.splice(name, 1);
            this.syncDataAndFormModel(fromContainer);
        }
        else {
            this.$_items[name] = undefined;
        }
    }
    $getDataNode(name) {
        if (this.$_items.hasOwnProperty(name)) {
            return this.$_items[name];
        }
    }
    $containsDataNode(name) {
        return this.$_items.hasOwnProperty(name) && typeof (this.$_items[name]) !== 'undefined';
    }
    get $isDataGroup() {
        return true;
    }
}
const TOK_DOT = 'DOT';
const TOK_IDENTIFIER = 'Identifier';
const TOK_GLOBAL = 'Global';
const TOK_REPEATABLE = 'Repeatable';
const TOK_BRACKET = 'bracket';
const TOK_NUMBER = 'Number';
const globalStartToken = '$';
const repeatableStartToken = '#';
const identifier = (value, start) => {
    return {
        type: TOK_IDENTIFIER,
        value,
        start
    };
};
const bracket = (value, start) => {
    return {
        type: TOK_BRACKET,
        value,
        start
    };
};
const global$ = () => {
    return {
        type: TOK_GLOBAL,
        start: 0,
        value: globalStartToken
    };
};
const repeatable = () => {
    return {
        type: TOK_REPEATABLE,
        start: 0,
        value: repeatableStartToken
    };
};
const isAlphaNum = function (ch) {
    return (ch >= 'a' && ch <= 'z')
        || (ch >= 'A' && ch <= 'Z')
        || (ch >= '0' && ch <= '9')
        || ch === '_';
};
const isGlobal = (prev, stream, pos) => {
    return prev === null && stream[pos] === globalStartToken;
};
const isRepeatable = (prev, stream, pos) => {
    return prev === null && stream[pos] === repeatableStartToken;
};
const isIdentifier = (stream, pos) => {
    const ch = stream[pos];
    if (ch === '$') {
        return stream.length > pos && isAlphaNum(stream[pos + 1]);
    }
    return (ch >= 'a' && ch <= 'z')
        || (ch >= 'A' && ch <= 'Z')
        || ch === '_';
};
const isNum = (ch) => {
    return (ch >= '0' && ch <= '9');
};
class Tokenizer {
    stream;
    _current;
    _tokens = [];
    _result_tokens = [];
    constructor(stream) {
        this.stream = stream;
        this._current = 0;
    }
    _consumeGlobal() {
        this._current += 1;
        return global$();
    }
    _consumeRepeatable() {
        this._current += 1;
        return repeatable();
    }
    _consumeUnquotedIdentifier(stream) {
        const start = this._current;
        this._current += 1;
        while (this._current < stream.length && isAlphaNum(stream[this._current])) {
            this._current += 1;
        }
        return identifier(stream.slice(start, this._current), start);
    }
    _consumeQuotedIdentifier(stream) {
        const start = this._current;
        this._current += 1;
        const maxLength = stream.length;
        while (stream[this._current] !== '"' && this._current < maxLength) {
            let current = this._current;
            if (stream[current] === '\\' && (stream[current + 1] === '\\'
                || stream[current + 1] === '"')) {
                current += 2;
            }
            else {
                current += 1;
            }
            this._current = current;
        }
        this._current += 1;
        return identifier(JSON.parse(stream.slice(start, this._current)), start);
    }
    _consumeNumber(stream) {
        const start = this._current;
        this._current += 1;
        const maxLength = stream.length;
        while (isNum(stream[this._current]) && this._current < maxLength) {
            this._current += 1;
        }
        const n = stream.slice(start, this._current);
        const value = parseInt(n, 10);
        return { type: TOK_NUMBER, value, start };
    }
    _consumeBracket(stream) {
        const start = this._current;
        this._current += 1;
        let value;
        if (isNum(stream[this._current])) {
            value = this._consumeNumber(stream).value;
        }
        else {
            throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        }
        if (this._current < this.stream.length && stream[this._current] !== ']') {
            throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        }
        this._current++;
        return bracket(value, start);
    }
    tokenize() {
        const stream = this.stream;
        while (this._current < stream.length) {
            const prev = this._tokens.length ? this._tokens.slice(-1)[0] : null;
            if (isGlobal(prev, stream, this._current)) {
                const token = this._consumeGlobal();
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (isRepeatable(prev, stream, this._current)) {
                const token = this._consumeRepeatable();
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (isIdentifier(stream, this._current)) {
                const token = this._consumeUnquotedIdentifier(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (stream[this._current] === '.' && prev != null && prev.type !== TOK_DOT) {
                this._tokens.push({
                    type: TOK_DOT,
                    value: '.',
                    start: this._current
                });
                this._current += 1;
            }
            else if (stream[this._current] === '[') {
                const token = this._consumeBracket(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else if (stream[this._current] === '"') {
                const token = this._consumeQuotedIdentifier(stream);
                this._tokens.push(token);
                this._result_tokens.push(token);
            }
            else {
                const p = Math.max(0, this._current - 2);
                const s = Math.min(this.stream.length, this._current + 2);
                throw new Error(`Exception at parsing stream ${this.stream.slice(p, s)}`);
            }
        }
        return this._result_tokens;
    }
}
const tokenize = (stream) => {
    return new Tokenizer(stream).tokenize();
};
const resolveData = (data, input, create) => {
    let tokens;
    if (typeof input === 'string') {
        tokens = tokenize(input);
    }
    else {
        tokens = input;
    }
    let result = data;
    let i = 0;
    const createIntermediateNode = (token, nextToken, create) => {
        return nextToken === null ? create :
            (nextToken.type === TOK_BRACKET) ? new DataGroup(token.value, [], 'array') :
                new DataGroup(token.value, {});
    };
    while (i < tokens.length && result != null) {
        const token = tokens[i];
        if (token.type === TOK_GLOBAL) {
            result = data;
        }
        else if (token.type === TOK_IDENTIFIER) {
            if (result instanceof DataGroup && result.$type === 'object') {
                if (result.$containsDataNode(token.value) && result.$getDataNode(token.value).$value !== null) {
                    result = result.$getDataNode(token.value);
                }
                else if (create) {
                    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                    const toCreate = createIntermediateNode(token, nextToken, create);
                    result.$addDataNode(token.value, toCreate);
                    result = toCreate;
                }
                else {
                    result = undefined;
                }
            }
            else {
                throw new Error(`Looking for ${token.value} in ${result.$value}`);
            }
        }
        else if (token.type === TOK_BRACKET) {
            if (result instanceof DataGroup && result.$type === 'array') {
                const index = token.value;
                if (index < result.$length) {
                    result = result.$getDataNode(index);
                }
                else if (create) {
                    const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
                    const toCreate = createIntermediateNode(token, nextToken, create);
                    result.$addDataNode(index, toCreate);
                    result = toCreate;
                }
                else {
                    result = undefined;
                }
            }
            else {
                throw new Error(`Looking for index ${token.value} in non array${result.$value}`);
            }
        }
        i += 1;
    }
    return result;
};
class FileObject {
    data;
    mediaType = 'application/octet-stream';
    name = 'unknown';
    size = 0;
    constructor(init) {
        Object.assign(this, init);
    }
    get type() {
        return this.mediaType;
    }
    set type(type) {
        this.mediaType = type;
    }
    toJSON() {
        return {
            'name': this.name,
            'size': this.size,
            'mediaType': this.mediaType,
            'data': this.data.toString()
        };
    }
    equals(obj) {
        return (this.data === obj.data &&
            this.mediaType === obj.mediaType &&
            this.name === obj.name &&
            this.size === obj.size);
    }
}
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');
const fileSizeRegex = /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i;
const randomWord = (l) => {
    const ret = [];
    for (let i = 0; i <= l; i++) {
        let randIndex;
        if (i === 0) {
            randIndex = Math.floor(Math.random() * (chars.length - 11));
        }
        else {
            randIndex = Math.floor(Math.random() * (chars.length));
        }
        ret.push(chars[randIndex]);
    }
    return ret.join('');
};
const processItem = (item, excludeUnbound, isAsync) => {
    if (excludeUnbound && item.dataRef === null) {
        return isAsync ? Promise.resolve(null) : null;
    }
    let ret = null;
    if (item.isContainer) {
        return isAsync
            ? readAttachments(item, excludeUnbound).then(res => res)
            : getAttachments(item, excludeUnbound);
    }
    else {
        if (isFile(item.getState())) {
            ret = {};
            const name = item.name || '';
            const dataRef = (item.dataRef != null)
                ? item.dataRef
                : (name.length > 0 ? item.name : undefined);
            if (item.value instanceof Array) {
                if (item.type === 'string[]' && item?.format === 'data-url') {
                    if (isAsync) {
                        return item.serialize().then(serializedFiles => {
                            ret[item.id] = serializedFiles.map((x) => {
                                return { ...x, 'dataRef': dataRef };
                            });
                            return ret;
                        });
                    }
                    else {
                        ret[item.id] = item.value.map((x) => {
                            return { ...x, 'dataRef': dataRef };
                        });
                    }
                }
                else {
                    ret[item.id] = item.value.map((x) => {
                        return { ...x, 'dataRef': dataRef };
                    });
                }
            }
            else if (item.value != null) {
                if (item.type === 'string' && item?.format === 'data-url') {
                    if (isAsync) {
                        return item.serialize().then(serializedFile => {
                            ret[item.id] = { ...serializedFile[0], 'dataRef': dataRef };
                            return ret;
                        });
                    }
                    else {
                        ret[item.id] = { ...item.value, 'dataRef': dataRef };
                    }
                }
                else {
                    ret[item.id] = { ...item.value, 'dataRef': dataRef };
                }
            }
        }
    }
    return isAsync ? Promise.resolve(ret) : ret;
};
const readAttachments = async (input, excludeUnbound = false) => {
    const items = input.items || [];
    return items.reduce(async (accPromise, item) => {
        const acc = await accPromise;
        const ret = await processItem(item, excludeUnbound, true);
        return Object.assign(acc, ret);
    }, Promise.resolve({}));
};
const getAttachments = (input, excludeUnbound = false) => {
    const items = input.items || [];
    return items.reduce((acc, item) => {
        const ret = processItem(item, excludeUnbound, false);
        return Object.assign(acc, ret);
    }, {});
};
const getFileSizeInBytes = (str) => {
    let retVal = 0;
    if (typeof str === 'string') {
        const matches = fileSizeRegex.exec(str.trim());
        if (matches != null) {
            retVal = sizeToBytes(parseFloat(matches[1]), (matches[2] || 'kb').toUpperCase());
        }
    }
    return retVal;
};
const sizeToBytes = (size, symbol) => {
    const sizes = { 'KB': 1, 'MB': 2, 'GB': 3, 'TB': 4 };
    const i = Math.pow(1024, sizes[symbol]);
    return Math.round(size * i);
};
const IdGenerator = function* (initial = 50) {
    const initialize = function () {
        const arr = [];
        for (let i = 0; i < initial; i++) {
            arr.push(randomWord(10));
        }
        return arr;
    };
    const passedIds = {};
    let ids = initialize();
    do {
        let x = ids.pop();
        while (x in passedIds) {
            if (ids.length === 0) {
                ids = initialize();
            }
            x = ids.pop();
        }
        passedIds[x] = true;
        yield ids.pop();
        if (ids.length === 0) {
            ids = initialize();
        }
    } while (ids.length > 0);
};
const isDataUrl = (str) => {
    const dataUrlRegex = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
    return dataUrlRegex.exec(str.trim()) != null;
};
const extractFileInfo = (file) => {
    if (file !== null) {
        let retVal = null;
        if (file instanceof FileObject) {
            retVal = file;
        }
        else if (typeof File !== 'undefined' && file instanceof File) {
            retVal = {
                name: file.name,
                mediaType: file.type,
                size: file.size,
                data: file
            };
        }
        else if (typeof file === 'string' && isDataUrl(file)) {
            const result = dataURItoBlob(file);
            if (result !== null) {
                const { blob, name } = result;
                retVal = {
                    name: name,
                    mediaType: blob.type,
                    size: blob.size,
                    data: blob
                };
            }
        }
        else {
            let jFile = file;
            try {
                jFile = JSON.parse(file);
                retVal = jFile;
                if (!retVal.mediaType) {
                    retVal.mediaType = retVal.type;
                }
            }
            catch (ex) {
            }
            if (typeof jFile?.data === 'string' && isDataUrl(jFile?.data)) {
                const result = dataURItoBlob(jFile?.data);
                if (result !== null) {
                    const blob = result.blob;
                    retVal = {
                        name: jFile?.name,
                        mediaType: jFile?.type || jFile?.mediaType,
                        size: blob.size,
                        data: blob
                    };
                }
            }
            else if (typeof jFile === 'string') {
                const fileName = jFile.split('/').pop();
                retVal = {
                    name: fileName,
                    mediaType: 'application/octet-stream',
                    size: 0,
                    data: jFile
                };
            }
            else if (typeof jFile === 'object') {
                retVal = {
                    name: jFile?.name,
                    mediaType: jFile?.type || jFile?.mediaType,
                    size: jFile?.size,
                    data: jFile?.data
                };
            }
        }
        if (retVal !== null && retVal.data != null) {
            return new FileObject(retVal);
        }
        return null;
    }
    else {
        return null;
    }
};
const dataURItoBlob = (dataURI) => {
    const regex = /^data:([a-z]+\/[a-z0-9-+.]+)?(?:;name=([^;]+))?(;base64)?,(.+)$/;
    const groups = regex.exec(dataURI);
    if (groups !== null) {
        const type = groups[1] || '';
        const name = groups[2] || 'unknown';
        const isBase64 = typeof groups[3] === 'string';
        if (isBase64) {
            const binary = atob(groups[4]);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            const blob = new window.Blob([new Uint8Array(array)], { type });
            return { name, blob };
        }
        else {
            const blob = new window.Blob([groups[4]], { type });
            return { name, blob };
        }
    }
    else {
        return null;
    }
};
const isFormOrSiteContainer = (model) => {
    return (':items' in model || 'cqItems' in model) && (':itemsOrder' in model || 'cqItemsOrder' in model);
};
const sitesModelToFormModel = (sitesModel) => {
    if (!sitesModel || !Object.keys(sitesModel).length) {
        return sitesModel;
    }
    if (isFormOrSiteContainer(sitesModel)) {
        const itemsArr = [];
        const itemsOrder = sitesModel[':itemsOrder'] || sitesModel.cqItemsOrder;
        const items = sitesModel[':items'] || sitesModel.cqItems;
        itemsOrder.forEach((elemName) => {
            itemsArr.push(sitesModelToFormModel(items[elemName]));
        });
        sitesModel.items = itemsArr;
    }
    return sitesModel;
};
const replaceTemplatePlaceholders = (str, values = []) => {
    return str?.replace(/\${(\d+)}/g, (match, index) => {
        const replacement = values[index];
        return typeof replacement !== 'undefined' ? replacement : match;
    });
};
const sanitizeName = (name) => {
    const nameRegex = /^[A-Za-z0-9_$][A-Za-z0-9_.[\]]*$/;
    if (name.includes('.')) {
        const parts = name.split('.');
        const sanitizedParts = parts.map((part) => {
            if (part.includes('[')) {
                const bracketIndex = part.indexOf('[');
                const namePart = part.substring(0, bracketIndex);
                const bracketPart = part.substring(bracketIndex);
                if (!nameRegex.test(namePart)) {
                    return `"${namePart}"${bracketPart}`;
                }
                return part;
            }
            else {
                if (!nameRegex.test(part)) {
                    return `"${part}"`;
                }
                return part;
            }
        });
        return sanitizedParts.join('.');
    }
    if (!nameRegex.test(name)) {
        return `"${name}"`;
    }
    return name;
};
const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysInMonth = (leapYear, month) => {
    if (leapYear && month == 2) {
        return 29;
    }
    return days[month - 1];
};
const isLeapYear = (year) => {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
};
const coerceType = (param, type) => {
    let num;
    switch (type) {
        case 'string':
            return param + '';
        case 'number':
            num = +param;
            if (!isNaN(num)) {
                return num;
            }
            break;
        case 'boolean':
            if (typeof param === 'string') {
                return param === 'true';
            }
            else if (typeof param === 'number') {
                return param !== 0;
            }
    }
    throw `${param} has invalid type. Expected : ${type}, Actual ${typeof param}`;
};
const checkNumber = (inputVal) => {
    if (inputVal === '' || inputVal == null) {
        return {
            value: '', valid: true
        };
    }
    let value = parseFloat(inputVal);
    const valid = !isNaN(value);
    if (!valid) {
        value = inputVal;
    }
    return {
        value, valid
    };
};
const checkInteger = (inputVal) => {
    if (inputVal === '' || inputVal == null) {
        return {
            value: '', valid: true
        };
    }
    let value = parseFloat(inputVal);
    const valid = !isNaN(value) && Math.round(value) === value;
    if (!valid) {
        value = inputVal;
    }
    return {
        value, valid
    };
};
const toArray = (inputVal) => {
    if (inputVal != null && !(inputVal instanceof Array)) {
        return [inputVal];
    }
    return inputVal;
};
const checkBool = (inputVal) => {
    const valid = typeof inputVal === 'boolean' || inputVal === 'true' || inputVal === 'false';
    const value = typeof inputVal === 'boolean' ? inputVal : (valid ? inputVal === 'true' : inputVal);
    return { valid, value };
};
const checkFile = (inputVal) => {
    const value = extractFileInfo(inputVal);
    const valid = value !== null;
    return {
        value: valid ? value : inputVal,
        valid
    };
};
const matchMediaType = (mediaType, accepts) => {
    return mediaType !== '' && (!mediaType || accepts.some((accept) => {
        const trimmedAccept = accept.trim();
        const prefixAccept = trimmedAccept.split('/')[0];
        const suffixAccept = trimmedAccept.split('.')[1];
        return ((trimmedAccept.includes('*') && mediaType.startsWith(prefixAccept)) ||
            (trimmedAccept.includes('.') && mediaType.endsWith(suffixAccept)) ||
            (trimmedAccept === mediaType));
    }));
};
const partitionArray = (inputVal, validatorFn) => {
    const value = toArray(inputVal);
    if (value == null) {
        return [[], [value]];
    }
    return value.reduce((acc, x) => {
        if (acc[1].length == 0) {
            const r = validatorFn(x);
            const index = r.valid ? 0 : 1;
            acc[index].push(r.value);
        }
        return acc;
    }, [[], []]);
};
const ValidConstraints = {
    date: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'format'],
    string: ['minLength', 'maxLength', 'pattern'],
    number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum'],
    array: ['minItems', 'maxItems', 'uniqueItems'],
    file: ['accept', 'maxFileSize'],
    email: ['minLength', 'maxLength', 'format', 'pattern'],
    datetime: ['minimum', 'maximum']
};
const validationConstraintsList = ['type', 'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minItems',
    'maxItems', 'uniqueItems', 'minLength', 'maxLength', 'pattern', 'required', 'enum', 'accept', 'maxFileSize'];
const Constraints = {
    type: (constraint, inputVal) => {
        let value = inputVal;
        if (inputVal == undefined) {
            return {
                valid: true,
                value: inputVal
            };
        }
        let valid = true, res;
        switch (constraint) {
            case 'string':
                valid = true;
                value = inputVal.toString();
                break;
            case 'string[]':
                value = toArray(inputVal);
                break;
            case 'number':
                res = checkNumber(inputVal);
                value = res.value;
                valid = res.valid;
                break;
            case 'boolean':
                res = checkBool(inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'integer':
                res = checkInteger(inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'integer[]':
                res = partitionArray(inputVal, checkInteger);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'file':
                res = checkFile(inputVal instanceof Array ? inputVal[0] : inputVal);
                valid = res.valid;
                value = res.value;
                break;
            case 'file[]':
                res = partitionArray(inputVal, checkFile);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'number[]':
                res = partitionArray(inputVal, checkNumber);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
            case 'boolean[]':
                res = partitionArray(inputVal, checkBool);
                valid = res[1].length === 0;
                value = valid ? res[0] : inputVal;
                break;
        }
        return {
            valid,
            value
        };
    },
    format: (constraint, input) => {
        let valid = true;
        const value = input;
        if (input === null) {
            return { value, valid };
        }
        let res;
        switch (constraint) {
            case 'date':
                res = dateRegex.exec((input || '').trim());
                if (res != null) {
                    const [match, year, month, date] = res;
                    const [nMonth, nDate] = [+month, +date];
                    const leapYear = isLeapYear(+year);
                    valid = (nMonth >= 1 && nMonth <= 12) &&
                        (nDate >= 1 && nDate <= daysInMonth(leapYear, nMonth));
                }
                else {
                    valid = false;
                }
                break;
            case 'email':
                valid = new RegExp(emailRegex).test((input || '').trim());
                break;
            case 'data-url':
                valid = true;
                break;
        }
        return { valid, value };
    },
    minimum: (constraint, value) => {
        return { valid: value >= constraint, value };
    },
    maximum: (constraint, value) => {
        return { valid: value <= constraint, value };
    },
    exclusiveMinimum: (constraint, value) => {
        return { valid: value > constraint, value };
    },
    exclusiveMaximum: (constraint, value) => {
        return { valid: value < constraint, value };
    },
    minItems: (constraint, value) => {
        return { valid: (value instanceof Array) && value.length >= constraint, value };
    },
    maxItems: (constraint, value) => {
        return { valid: (value instanceof Array) && value.length <= constraint, value };
    },
    uniqueItems: (constraint, value) => {
        return { valid: !constraint || ((value instanceof Array) && value.length === new Set(value).size), value };
    },
    minLength: (constraint, value) => {
        return { ...Constraints.minimum(constraint, typeof value === 'string' ? value.length : 0), value };
    },
    maxLength: (constraint, value) => {
        return { ...Constraints.maximum(constraint, typeof value === 'string' ? value.length : 0), value };
    },
    pattern: (constraint, value) => {
        let regex;
        if (typeof constraint === 'string') {
            regex = new RegExp(constraint);
        }
        else {
            regex = constraint;
        }
        return { valid: regex.test(value), value };
    },
    required: (constraint, value) => {
        const valid = constraint ? value != null && value !== '' : true;
        return { valid, value };
    },
    enum: (constraint, value) => {
        return {
            valid: constraint.indexOf(value) > -1,
            value
        };
    },
    accept: (constraint, value) => {
        if (!constraint || constraint.length === 0 || value === null || value === undefined) {
            return {
                valid: true,
                value
            };
        }
        const tempValue = value instanceof Array ? value : [value];
        const invalidFile = tempValue.some((file) => !matchMediaType(file.type, constraint));
        return {
            valid: !invalidFile,
            value
        };
    },
    maxFileSize: (constraint, value) => {
        const sizeLimit = typeof constraint === 'string' ? getFileSizeInBytes(constraint) : constraint;
        return {
            valid: !(value instanceof FileObject) || value.size <= sizeLimit,
            value
        };
    }
};
const editableProperties = [
    'value',
    'label',
    'description',
    'visible',
    'enabled',
    'valid',
    'errorMessage',
    'readOnly',
    'enum',
    'enumNames',
    'required',
    'properties',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'maximum',
    'maxItems',
    'minimum',
    'minItems',
    'checked'
];
const dynamicProps = [
    ...editableProperties,
    'index',
    'activeChild'
];
const staticFields = ['plain-text', 'image'];
class ActionImplWithTarget {
    _action;
    _target;
    _currentTarget;
    constructor(_action, _target) {
        this._action = _action;
        if (_action.target) {
            this._currentTarget = _target;
            this._target = _action.target;
        }
        else {
            this._target = _target;
            this._currentTarget = _target;
        }
    }
    get type() {
        return this._action.type;
    }
    get payload() {
        return this._action.payload;
    }
    get metadata() {
        return this._action.metadata;
    }
    get target() {
        return this._target;
    }
    get currentTarget() {
        return this._currentTarget;
    }
    get isCustomEvent() {
        return this._action.isCustomEvent;
    }
    get originalAction() {
        return this._action.originalAction;
    }
    toString() {
        return this._action.toString();
    }
}
const target = Symbol('target');
const qualifiedName = Symbol('qualifiedName');
function dependencyTracked() {
    return function (target, propertyKey, descriptor) {
        const get = descriptor.get;
        if (get != undefined) {
            descriptor.get = function () {
                this.ruleEngine.trackDependency(this, propertyKey);
                return get.call(this);
            };
        }
    };
}
const addOnly = (includeOrExclude) => (...fieldTypes) => (target, propertyKey, descriptor) => {
    const get = descriptor.get;
    if (get != undefined) {
        descriptor.get = function () {
            if (fieldTypes.indexOf(this.fieldType) > -1 === includeOrExclude) {
                return get.call(this);
            }
            return undefined;
        };
    }
    const set = descriptor.set;
    if (set != undefined) {
        descriptor.set = function (value) {
            if (this === this._ruleNode) {
                console.error(`Property '${propertyKey}' is being set through a proxy, which is not supported. Please use globals.functions.setProperty instead.`);
            }
            if (fieldTypes.indexOf(this.fieldType) > -1 === includeOrExclude) {
                set.call(this, value);
            }
        };
    }
};
const include = addOnly(true);
const exclude = addOnly(false);
class BaseNode {
    _options;
    _ruleNode;
    _lang = '';
    _callbacks = {};
    _dependents = [];
    _jsonModel;
    _tokens = [];
    _eventSource = EventSource.CODE;
    _fragment = '$form';
    _idSet;
    _propertiesManager;
    createIdSet() {
        return new Set();
    }
    get isContainer() {
        return false;
    }
    constructor(params, _options) {
        this._options = _options;
        this._idSet = this.createIdSet();
        this[qualifiedName] = null;
        this._jsonModel = {
            ...params,
            id: this.form.getUniqueId(params?.id)
        };
        if (this.parent?.isFragment) {
            this._fragment = this.parent.qualifiedName;
        }
        else if (this.parent?.fragment) {
            this._fragment = this.parent.fragment;
        }
        this._propertiesManager = new PropertiesManager(this);
    }
    get fragment() {
        return this._fragment;
    }
    setupRuleNode() {
        const self = this;
        this._ruleNode = new Proxy(this.ruleNodeReference(), {
            get: (ruleNodeReference, prop) => {
                return self.getFromRule(ruleNodeReference, prop);
            }
        });
    }
    ruleNodeReference() {
        return this;
    }
    getRuleNode() {
        return this._ruleNode;
    }
    getFromRule(ruleNodeReference, prop) {
        if (prop === Symbol.toPrimitive || (prop === 'valueOf' && !ruleNodeReference.hasOwnProperty('valueOf'))) {
            return this.valueOf;
        }
        else if (prop === target) {
            return this;
        }
        else if (typeof (prop) === 'string') {
            if (prop.startsWith('$')) {
                prop = prop.substr(1);
                if (typeof this[prop] !== 'function') {
                    const retValue = this[prop];
                    if (retValue instanceof BaseNode) {
                        return retValue.getRuleNode();
                    }
                    else if (retValue instanceof Array) {
                        return retValue.map(r => r instanceof BaseNode ? r.getRuleNode() : r);
                    }
                    else {
                        return retValue;
                    }
                }
            }
            else {
                if (ruleNodeReference.hasOwnProperty(prop)) {
                    return ruleNodeReference[prop];
                }
                else if (typeof ruleNodeReference[prop] === 'function') {
                    return ruleNodeReference[prop];
                }
            }
        }
    }
    get id() {
        return this._jsonModel.id;
    }
    get index() {
        if (this.parent) {
            return this.parent.indexOf(this);
        }
        return 0;
    }
    get parent() {
        return this._options.parent;
    }
    get type() {
        return this._jsonModel.type;
    }
    get repeatable() {
        return this.parent?.hasDynamicItems();
    }
    get fieldType() {
        return this._jsonModel.fieldType || 'text-input';
    }
    get ':type'() {
        return this._jsonModel[':type'] || this.fieldType;
    }
    get name() {
        return this._jsonModel.name;
    }
    get screenReaderText() {
        return this._jsonModel.screenReaderText;
    }
    get description() {
        return this._jsonModel.description;
    }
    set description(d) {
        this._setProperty('description', d);
    }
    get dataRef() {
        return this._jsonModel.dataRef;
    }
    get visible() {
        if (this.parent?.visible !== undefined) {
            return this.parent?.visible ? this._jsonModel.visible : false;
        }
        else {
            return this._jsonModel.visible;
        }
    }
    set visible(v) {
        if (v !== this._jsonModel.visible) {
            const changeAction = propertyChange('visible', v, this._jsonModel.visible);
            this._jsonModel.visible = v;
            this.notifyDependents(changeAction);
        }
    }
    get form() {
        return this._options.form;
    }
    get ruleEngine() {
        return this.form.ruleEngine;
    }
    get label() {
        return this._jsonModel.label;
    }
    set label(l) {
        const isLabelSame = (l !== null && this._jsonModel.label !== null &&
            typeof l === 'object' && typeof this._jsonModel.label === 'object') ?
            JSON.stringify(l) === JSON.stringify(this._jsonModel.label) :
            l === this._jsonModel.label;
        if (!isLabelSame) {
            const changeAction = propertyChange('label', l, this._jsonModel.label);
            this._jsonModel = {
                ...this._jsonModel,
                label: l
            };
            this.notifyDependents(changeAction);
        }
    }
    get uniqueItems() {
        return this._jsonModel.uniqueItems;
    }
    isTransparent() {
        const isNonTransparent = this.parent?._jsonModel?.type === 'array';
        return !this._jsonModel.name && !isNonTransparent;
    }
    getDependents() {
        return this._dependents.map(x => ({ id: x.node.id, propertyName: x.propertyName }));
    }
    getState(forRestore = false) {
        return this.withDependencyTrackingControl(true, () => {
            return {
                ...this._jsonModel,
                properties: this.properties,
                index: this.index,
                parent: undefined,
                qualifiedName: this.qualifiedName,
                ...(this.repeatable === true ? {
                    repeatable: true,
                    minOccur: this.parent.minItems,
                    maxOccur: this.parent.maxItems
                } : {}),
                ':type': this[':type'],
                ...(forRestore ? {
                    _dependents: this._dependents.length ? this.getDependents() : undefined,
                    allowedComponents: undefined,
                    columnClassNames: undefined,
                    columnCount: undefined,
                    gridClassNames: undefined
                } : {})
            };
        });
    }
    subscribe(callback, eventName = 'change') {
        this._callbacks[eventName] = this._callbacks[eventName] || [];
        this._callbacks[eventName].push(callback);
        return {
            unsubscribe: () => {
                this._callbacks[eventName] = this._callbacks[eventName].filter(x => x !== callback);
            }
        };
    }
    _addDependent(dependent, propertyName) {
        const existingDependency = this._dependents.find(({ node, propertyName: existingProp }) => {
            let isExistingDependent = node === dependent;
            if (isExistingDependent && propertyName && propertyName.startsWith('properties.')) {
                isExistingDependent = existingProp === propertyName;
            }
            return isExistingDependent;
        });
        if (existingDependency === undefined) {
            const subscription = this.subscribe((change) => {
                const changes = change.payload.changes;
                const propsToLook = [...dynamicProps, 'items'];
                const isPropChanged = changes.findIndex(x => {
                    const changedPropertyName = x.propertyName;
                    return propsToLook.includes(changedPropertyName) || (changedPropertyName.startsWith('properties.') && propertyName === changedPropertyName);
                }) > -1;
                if (isPropChanged) {
                    if (this.form.changeEventBehaviour === 'deps') {
                        dependent.dispatch(change);
                    }
                    else {
                        dependent.dispatch(new ExecuteRule());
                    }
                }
            });
            this._dependents.push({ node: dependent, propertyName, subscription });
        }
    }
    removeDependent(dependent) {
        const index = this._dependents.findIndex(({ node }) => node === dependent);
        if (index > -1) {
            this._dependents[index].subscription.unsubscribe();
            this._dependents.splice(index, 1);
        }
    }
    queueEvent(action) {
        const actionWithTarget = new ActionImplWithTarget(action, this);
        this.form.getEventQueue().queue(this, actionWithTarget, ['valid', 'invalid'].indexOf(actionWithTarget.type) > -1);
    }
    dispatch(action) {
        this.queueEvent(action);
        this.form.getEventQueue().runPendingQueue();
    }
    withDependencyTrackingControl(disableDependencyTracking, callback) {
        const currentDependencyTracking = this.form?.ruleEngine.getDependencyTracking();
        if (disableDependencyTracking) {
            this.form?.ruleEngine.setDependencyTracking(false);
        }
        try {
            return callback();
        }
        finally {
            if (disableDependencyTracking) {
                this.form?.ruleEngine.setDependencyTracking(currentDependencyTracking);
            }
        }
    }
    notifyDependents(action) {
        const depsToRestore = this._jsonModel._dependents;
        if (depsToRestore) {
            depsToRestore.forEach((x) => {
                const node = this.form.getElement(x.id);
                if (node) {
                    this._addDependent(node, x.propertyName);
                }
            });
            this._jsonModel._dependents = undefined;
        }
        const handlers = this._callbacks[action.type] || [];
        handlers.forEach(x => {
            this.withDependencyTrackingControl(true, () => {
                x(new ActionImplWithTarget(action, this));
            });
        });
    }
    isEmpty(value = this._jsonModel.value) {
        return value === undefined || value === null || value === '';
    }
    _setProperty(prop, newValue, notify = true, notifyChildren = (action) => { }) {
        const oldValue = this._jsonModel[prop];
        let isValueSame = false;
        if (newValue !== null && oldValue !== null &&
            typeof newValue === 'object' && typeof oldValue === 'object') {
            isValueSame = JSON.stringify(newValue) === JSON.stringify(oldValue);
        }
        else {
            isValueSame = oldValue === newValue;
        }
        if (!isValueSame) {
            this._jsonModel[prop] = newValue;
            const changeAction = propertyChange(prop, newValue, oldValue);
            if (notify) {
                this.notifyDependents(changeAction);
            }
            notifyChildren.call(this, changeAction);
            if (validationConstraintsList.includes(prop)) {
                if (this.hasValueBeenSet === undefined || this.hasValueBeenSet) {
                    this.validate();
                }
            }
            return changeAction.payload.changes;
        }
        return [];
    }
    bindToDataModel(contextualDataModel) {
        if (this.fieldType === 'form' || this.id === '$form') {
            this._data = contextualDataModel;
            return;
        }
        const dataRef = this._jsonModel.dataRef;
        let _data, _parent = contextualDataModel, _key = '';
        if (dataRef === null) {
            _data = NullDataValue;
        }
        else if (dataRef !== undefined && !this.repeatable) {
            try {
                if (this._tokens.length === 0) {
                    this._tokens = tokenize(dataRef);
                }
                let searchData = contextualDataModel;
                if (this._tokens[0].type === TOK_GLOBAL) {
                    searchData = this.form.getDataNode();
                }
                else if (this._tokens[0].type === TOK_REPEATABLE) {
                    let repeatRoot = this.parent;
                    while (!repeatRoot.repeatable && repeatRoot !== this.form) {
                        repeatRoot = repeatRoot.parent;
                    }
                    searchData = repeatRoot.getDataNode();
                }
                if (typeof searchData !== 'undefined') {
                    const name = this._tokens[this._tokens.length - 1].value;
                    const create = this.defaultDataModel(name);
                    _data = resolveData(searchData, this._tokens, create);
                    _parent = resolveData(searchData, this._tokens.slice(0, -1));
                    _key = name;
                }
            }
            catch (error) {
                console.error(`Error parsing dataRef "${dataRef}" for field "${this.id}". The data of this field will not be exported.`);
            }
        }
        else {
            if (contextualDataModel !== NullDataValue && staticFields.indexOf(this.fieldType) === -1) {
                _parent = contextualDataModel;
                const name = this._jsonModel.name || '';
                const key = contextualDataModel.$type === 'array' ? this.index : name;
                _key = key;
                if (key !== '') {
                    const create = this.defaultDataModel(key);
                    if (create !== undefined) {
                        if (typeof contextualDataModel.$getDataNode === 'function') {
                            _data = contextualDataModel.$getDataNode(key);
                            if (_data === undefined) {
                                _data = create;
                                contextualDataModel.$addDataNode(key, _data);
                            }
                        }
                        else {
                            console.error(`$getDataNode method is undefined for "${name}" with dataModel type "${contextualDataModel.$type}"`);
                            _data = undefined;
                        }
                    }
                }
                else {
                    _data = undefined;
                }
            }
        }
        if (_data) {
            if (!this.isContainer && _parent !== NullDataValue && _data !== NullDataValue) {
                _data = _data?.$convertToDataValue();
                _parent.$addDataNode(_key, _data, true);
            }
            _data?.$bindToField(this);
            this._data = _data;
        }
        return this._data;
    }
    _data;
    getDataNode() {
        return this._data;
    }
    get lang() {
        if (this._jsonModel.lang) {
            this._lang = this._jsonModel.lang;
        }
        if (!this._lang) {
            if (this.parent) {
                this._lang = this.parent.lang;
            }
            else {
                this._lang = Intl.DateTimeFormat().resolvedOptions().locale;
            }
        }
        return this._lang;
    }
    get properties() {
        return this._propertiesManager.properties;
    }
    set properties(p) {
        this._propertiesManager.properties = p;
    }
    getPropertiesManager() {
        return this._propertiesManager;
    }
    getNonTransparentParent() {
        let nonTransparentParent = this.parent;
        while (nonTransparentParent != null && nonTransparentParent.isTransparent()) {
            nonTransparentParent = nonTransparentParent.parent;
        }
        return nonTransparentParent;
    }
    _isAncestorRepeatable() {
        let parent = this.parent;
        while (parent && !parent.repeatable) {
            parent = parent.parent;
        }
        return Boolean(parent);
    }
    _initialize(mode) {
        if (typeof this._data === 'undefined') {
            let dataNode, parent = this.parent;
            do {
                dataNode = parent.getDataNode();
                parent = parent.parent;
            } while (dataNode === undefined);
            this.bindToDataModel(dataNode);
        }
    }
    _applyUpdates(propNames, updates) {
        return propNames.reduce((acc, propertyName) => {
            const currentValue = updates[propertyName];
            const changes = this._setProperty(propertyName, currentValue, false);
            if (changes.length > 0) {
                acc[propertyName] = changes[0];
            }
            return acc;
        }, {});
    }
    get qualifiedName() {
        if (this.isTransparent()) {
            return null;
        }
        if (this[qualifiedName] !== null) {
            return this[qualifiedName];
        }
        const parent = this.getNonTransparentParent();
        let qn;
        if (parent && parent.type === 'array') {
            qn = `${parent.qualifiedName}[${this.index}]`;
        }
        else {
            qn = `${parent.qualifiedName}.${this.name}`;
        }
        if (!this.repeatable && !this._isAncestorRepeatable()) {
            this[qualifiedName] = qn;
        }
        return qn;
    }
    focus() {
        if (this.parent) {
            this.parent.activeChild = this;
        }
    }
    _getDefaults() {
        return {};
    }
    _applyDefaultsInModel() {
        Object.entries(this._getDefaults()).map(([key, value]) => {
            if (this._jsonModel[key] === undefined && value !== undefined) {
                this._jsonModel[key] = value;
            }
            else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.keys(value).forEach((keyOfValue) => {
                    if (this._jsonModel[key][keyOfValue] === undefined) {
                        this._jsonModel[key][keyOfValue] = value[keyOfValue];
                    }
                });
            }
        });
    }
}
__decorate([
    dependencyTracked()
], BaseNode.prototype, "index", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "description", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "visible", null);
__decorate([
    dependencyTracked()
], BaseNode.prototype, "label", null);
class Scriptable extends BaseNode {
    _events = {};
    _rules = {};
    getRules() {
        return typeof this._jsonModel.rules !== 'object' ? {} : this._jsonModel.rules;
    }
    getCompiledRule(eName, rule) {
        if (!(eName in this._rules)) {
            const eString = rule || this.getRules()[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                try {
                    let updatedRule = eString;
                    if (this.fragment !== '$form') {
                        const sanitizedFragment = sanitizeName(this.fragment);
                        updatedRule = eString.replaceAll('$form', sanitizedFragment);
                    }
                    this._rules[eName] = this.ruleEngine.compileRule(updatedRule, this.lang);
                }
                catch (e) {
                    this.form.logger.error(`Unable to compile rule \`"${eName}" : "${eString}"\` Exception : ${e}`);
                }
            }
            else {
                throw new Error(`only expression strings are supported. ${typeof (eString)} types are not supported`);
            }
        }
        return this._rules[eName];
    }
    getCompiledEvent(eName) {
        if (!(eName in this._events)) {
            let eString = this._jsonModel.events?.[eName];
            if (typeof eString === 'string' && eString.length > 0) {
                eString = [eString];
            }
            if (typeof eString !== 'undefined' && eString.length > 0) {
                this._events[eName] = eString.map(x => {
                    try {
                        let updatedExpr = x;
                        if (this.fragment !== '$form') {
                            const sanitizedFragment = sanitizeName(this.fragment);
                            updatedExpr = x.replaceAll('$form', sanitizedFragment);
                        }
                        return this.ruleEngine.compileRule(updatedExpr, this.lang);
                    }
                    catch (e) {
                        this.form.logger.error(`Unable to compile expression \`"${eName}" : "${eString}"\` Exception : ${e}`);
                    }
                    return null;
                }).filter(x => x !== null);
            }
        }
        return this._events[eName] || [];
    }
    applyUpdates(updates) {
        if (typeof updates === 'object') {
            if (updates !== null) {
                Object.entries(updates).forEach(([key, value]) => {
                    if (key in editableProperties || (key in this && typeof this[key] !== 'function')) {
                        try {
                            this[key] = value;
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                });
            }
        }
        else if (typeof updates !== 'undefined') {
            this.value = updates;
        }
    }
    executeAllRules(context) {
        const entries = Object.entries(this.getRules());
        if (entries.length > 0) {
            const scope = this.getExpressionScope();
            entries.forEach(([prop, rule]) => {
                const node = this.getCompiledRule(prop, rule);
                if (node) {
                    const newVal = this.ruleEngine.execute(node, scope, context, true, rule);
                    if (editableProperties.indexOf(prop) > -1) {
                        const oldAndNewValueAreEmpty = this.isEmpty() && this.isEmpty(newVal) && prop === 'value';
                        if (!oldAndNewValueAreEmpty) {
                            this[prop] = newVal;
                        }
                    }
                    else {
                        this.form.logger.warn(`${prop} is not a valid editable property.`);
                    }
                }
            });
        }
    }
    getExpressionScope() {
        const parent = this.getNonTransparentParent();
        const target = {
            self: this.getRuleNode(),
            siblings: parent?.ruleNodeReference() || {}
        };
        const scope = new Proxy(target, {
            get: (target, prop) => {
                if (prop === Symbol.toStringTag) {
                    return 'Object';
                }
                if (typeof prop === 'string' && prop.startsWith('$')) {
                    const retValue = target.self[prop];
                    if (retValue instanceof BaseNode) {
                        return retValue.getRuleNode();
                    }
                    else if (retValue instanceof Array) {
                        return retValue.map(r => r instanceof BaseNode ? r.getRuleNode() : r);
                    }
                    else {
                        return retValue;
                    }
                }
                else {
                    if (prop in target.siblings) {
                        return target.siblings[prop];
                    }
                    else {
                        return target.self[prop];
                    }
                }
            },
            has: (target, prop) => {
                prop = prop;
                const selfPropertyOrChild = target.self[prop];
                const sibling = target.siblings[prop];
                return typeof selfPropertyOrChild != 'undefined' || typeof sibling != 'undefined';
            }
        });
        return scope;
    }
    executeEvent(context, node, eString) {
        let updates;
        if (node) {
            updates = this.ruleEngine.execute(node, this.getExpressionScope(), context, false, eString);
            if (updates instanceof Promise) {
                this.form.addPromises(updates);
            }
        }
        if (typeof updates !== 'undefined' && updates != null) {
            this.applyUpdates(updates);
        }
    }
    executeRule(event, context) {
        if (typeof event.payload.ruleName === 'undefined') {
            this.executeAllRules(context);
        }
    }
    executeExpression(expr) {
        const ruleContext = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this
        };
        const node = this.ruleEngine.compileRule(expr, this.lang);
        return this.ruleEngine.execute(node, this.getExpressionScope(), ruleContext, false, expr);
    }
    change(event, context) {
        if (this.form.changeEventBehaviour === 'deps') {
            this.executeAllRules(context);
        }
    }
    executeAction(action) {
        const context = {
            'form': this.form,
            '$form': this.form.getRuleNode(),
            '$field': this.getRuleNode(),
            'field': this,
            '$event': {
                type: action.type,
                payload: action.payload,
                target: this.getRuleNode()
            }
        };
        this.ruleEngine.setDependencyTracking(['change', 'executeRule'].includes(action.type));
        const eventName = action.isCustomEvent ? `custom:${action.type}` : action.type;
        const funcName = action.isCustomEvent ? `custom_${action.type}` : action.type;
        const node = this.getCompiledEvent(eventName);
        const events = this._jsonModel.events?.[eventName];
        if (funcName in this && typeof this[funcName] === 'function') {
            this[funcName](action, context);
        }
        node.forEach((n, index) => {
            let eString = '';
            if (Array.isArray(events)) {
                eString = events[index];
            }
            else if (typeof events === 'string') {
                eString = events;
            }
            this.executeEvent(context, n, eString);
        });
        if (action.target === this) {
            this.notifyDependents(action);
        }
    }
}
const notifyChildrenAttributes = [
    'readOnly', 'enabled'
];
class Container extends Scriptable {
    _children = [];
    _childrenReference;
    _itemTemplate = null;
    fieldFactory;
    _isFragment = false;
    _insideFragment = false;
    constructor(json, _options) {
        super(json, { form: _options.form, parent: _options.parent, mode: _options.mode });
        this._isFragment = this._jsonModel?.properties?.['fd:fragment'] === true;
        this.fieldFactory = _options.fieldFactory;
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            enabled: true,
            readOnly: false
        };
    }
    ruleNodeReference() {
        return this._childrenReference;
    }
    get items() {
        return this._children;
    }
    get maxItems() {
        return this._jsonModel.maxItems;
    }
    set maxItems(m) {
        this._jsonModel.maxItems = m;
        const minItems = this._jsonModel.minItems || 1;
        const itemsLength = this._children.length;
        const items2Remove = Math.min(itemsLength - m, itemsLength - minItems);
        if (items2Remove > 0) {
            for (let i = 0; i < items2Remove; i++) {
                this.getDataNode().$removeDataNode(m + i);
                this._childrenReference.pop();
            }
            const elems = this._children.splice(m, items2Remove);
            this.notifyDependents(propertyChange('items', elems, null));
        }
    }
    get minItems() {
        return this._jsonModel.minItems;
    }
    set minItems(m) {
        this._jsonModel.minItems = m;
        const itemsLength = this._children.length;
        const difference = itemsLength - m;
        const items2Add = Math.abs(difference);
        if (difference < 0) {
            const elems = [];
            for (let i = 0; i < items2Add; i++) {
                elems.push(this._addChild(this._itemTemplate, null, true));
            }
            this.notifyDependents(propertyChange('items', elems, null));
        }
    }
    hasDynamicItems() {
        return this._itemTemplate != null;
    }
    get isContainer() {
        return true;
    }
    _activeChild = null;
    isSiteContainer(item) {
        return (':items' in item || 'cqItems' in item) && !('fieldType' in item);
    }
    isAFormField(item) {
        return ('fieldType' in item || 'id' in item || 'name' in item || 'dataRef' in item || 'type' in item);
    }
    _getFormAndSitesState(isRepeatableChild = false, forRestore = false) {
        return this._jsonModel.items ? this._jsonModel.items.map((x) => {
            if (this.isSiteContainer(x)) {
                const newObjWithId = {
                    ...(x?.id ? { id: this.form.getUniqueId() } : {})
                };
                return {
                    ...x,
                    ...newObjWithId,
                    ':items': this.walkSiteContainerItems(x)
                };
            }
            else if (this.isAFormField(x)) {
                return { ...this.form.getElement(x?.id).getState(isRepeatableChild, forRestore) };
            }
            else {
                return x;
            }
        }) : [];
    }
    getItemsState(isRepeatableChild = false, forRestore = false) {
        const isThisContainerRepeatable = this._jsonModel.type === 'array' || isRepeatable$1(this._jsonModel);
        if (isThisContainerRepeatable) {
            return this._children.map(x => {
                return { ...x.getState(true, forRestore) };
            });
        }
        else {
            return this._getFormAndSitesState(isRepeatableChild, forRestore);
        }
    }
    getState(isRepeatableChild = false, forRestore = false) {
        return this.withDependencyTrackingControl(true, () => {
            return {
                ...super.getState(forRestore),
                ...(forRestore ? {
                    ':items': undefined,
                    ':itemsOrder': undefined
                } : {}),
                items: this.getItemsState(isRepeatableChild, forRestore),
                ...((this._jsonModel.type === 'array' || isRepeatable$1(this._jsonModel)) && this._itemTemplate ? {
                    _itemTemplate: { ...this._itemTemplate }
                } : {}),
                enabled: this.enabled,
                readOnly: this.readOnly
            };
        });
    }
    _createChild(child, options) {
        return this.fieldFactory.createField(child, options);
    }
    walkSiteContainerItems(x) {
        return Object.fromEntries(Object.entries(x[':items']).map(([key, value]) => {
            if (this.isAFormField(value)) {
                return [key, this.form.getElement(value?.id).getState()];
            }
            else if (this.isSiteContainer(value)) {
                return this.walkSiteContainerItems(value);
            }
            else {
                if (typeof value === 'object') {
                    const newObjWithId = {
                        ...(value?.id ? { id: this.form.getUniqueId() } : {})
                    };
                    return [key, {
                            ...value,
                            ...newObjWithId
                        }
                    ];
                }
                else {
                    return [key, value];
                }
            }
        }));
    }
    _addChildToRuleNode(child, options) {
        const self = this;
        const { parent = this } = options;
        const name = parent.type == 'array' ? parent._children.length + '' : child.name || '';
        if (name.length > 0) {
            Object.defineProperty(parent._childrenReference, name, {
                get: () => {
                    if (child.isContainer && child.hasDynamicItems()) {
                        self.ruleEngine.trackDependency(child, 'items');
                    }
                    if (self.hasDynamicItems()) {
                        self.ruleEngine.trackDependency(self, 'items');
                        if (this._children[name] !== undefined) {
                            return this._children[name].getRuleNode();
                        }
                    }
                    else {
                        return child.getRuleNode();
                    }
                },
                configurable: true,
                enumerable: true
            });
        }
    }
    _addChild(itemJson, index, cloneIds = false, mode = 'create') {
        let nonTransparentParent = this;
        while (nonTransparentParent != null && nonTransparentParent.isTransparent()) {
            nonTransparentParent = nonTransparentParent.parent;
        }
        if (typeof index !== 'number' || index > nonTransparentParent._children.length) {
            index = this._children.length;
        }
        const form = this.form;
        const itemTemplate = {
            index,
            ...deepClone(itemJson, cloneIds ? () => { return form.getUniqueId(); } : undefined)
        };
        const retVal = this._createChild(itemTemplate, { parent: this, form: this.form, mode });
        itemJson.id = retVal.id;
        this.form.fieldAdded(retVal);
        this._addChildToRuleNode(retVal, { parent: nonTransparentParent });
        if (index === this._children.length) {
            this._children.push(retVal);
        }
        else {
            this._children.splice(index, 0, retVal);
        }
        return retVal;
    }
    indexOf(f) {
        return this._children.indexOf(f);
    }
    defaultDataModel(name) {
        const type = this._jsonModel.type || undefined;
        if (type === undefined) {
            return undefined;
        }
        else {
            const instance = type === 'array' ? [] : {};
            return new DataGroup(name, instance, type);
        }
    }
    _canHaveRepeatingChildren(mode = 'create') {
        const items = this._jsonModel.items;
        return this._jsonModel.type == 'array' && this.getDataNode() != null &&
            (items.length === 1 || (items.length > 0 && items[0].repeatable == true && mode === 'restore'));
    }
    get isFragment() {
        return this._isFragment || this._jsonModel?.properties?.['fd:fragment'];
    }
    _initialize(mode) {
        super._initialize(mode);
        const items = this._jsonModel.items || [];
        this._childrenReference = this._jsonModel.type == 'array' ? [] : {};
        if (this._canHaveRepeatingChildren(mode)) {
            this._itemTemplate = this._jsonModel._itemTemplate || deepClone(items[0]);
            this._jsonModel._itemTemplate = undefined;
            if (mode === 'restore') {
                this._itemTemplate.repeatable = undefined;
            }
            if (typeof (this._jsonModel.minItems) !== 'number') {
                this._jsonModel.minItems = 0;
            }
            if (typeof (this._jsonModel.maxItems) !== 'number') {
                this._jsonModel.maxItems = -1;
            }
            if (typeof (this._jsonModel.initialItems) !== 'number') {
                this._jsonModel.initialItems = Math.max(1, this._jsonModel.minItems);
            }
            const itemsLength = mode === 'restore' ? this._jsonModel.items.length : this._jsonModel.initialItems;
            for (let i = 0; i < itemsLength; i++) {
                let child;
                if (mode === 'restore') {
                    let itemTemplate = this._itemTemplate;
                    if (i < this._jsonModel.items.length) {
                        itemTemplate = deepClone(items[i]);
                        itemTemplate.repeatable = undefined;
                    }
                    child = this._addChild(itemTemplate, undefined, i > this._jsonModel.items.length - 1, mode);
                }
                else {
                    child = this._addChild(this._itemTemplate, undefined, i > this._jsonModel.items.length - 1);
                }
                if (mode === 'create') {
                    items[0].id = child.id;
                }
                child._initialize(mode);
            }
        }
        else if (items.length > 0) {
            items.forEach((item) => {
                if (this.isSiteContainer(item)) {
                    this._initializeSiteContainer(item);
                }
                else if (this.isAFormField(item)) {
                    const child = this._addChild(item, undefined, false, mode);
                    child._initialize(mode);
                }
                else {
                    this.form.logger.warn(`A container item was not initialized. ${item}`);
                }
            });
            this._jsonModel.minItems = this._children.length;
            this._jsonModel.maxItems = this._children.length;
            this._jsonModel.initialItems = this._children.length;
        }
        else {
            this.form.logger.warn('A container exists with no items.');
        }
        this.setupRuleNode();
    }
    _initializeSiteContainer(item) {
        Object.entries(item[':items']).forEach(([key, value]) => {
            if (this.isAFormField(value)) {
                const child = this._addChild(value);
                child._initialize();
            }
            else if (this.isSiteContainer(value)) {
                return this._initializeSiteContainer(value);
            }
        });
    }
    addItem(action) {
        if ((action.type === 'addItem' || action.type == 'addInstance') && this._itemTemplate != null) {
            if ((this._jsonModel.maxItems === -1) || (this._children.length < this._jsonModel.maxItems)) {
                const dataNode = this.getDataNode();
                let instanceIndex = action.payload;
                const retVal = this._addChild(this._itemTemplate, action.payload, true);
                if (typeof instanceIndex !== 'number' || instanceIndex > this._children.length) {
                    instanceIndex = this._children.length;
                }
                const _data = retVal.defaultDataModel(instanceIndex);
                if (_data) {
                    dataNode.$addDataNode(instanceIndex, _data, false, this);
                }
                retVal._initialize('create');
                this.notifyDependents(propertyChange('items', retVal.getState(), null));
                retVal.dispatch(new Initialize());
                retVal.dispatch(new ExecuteRule());
                for (let i = instanceIndex + 1; i < this._children.length; i++) {
                    this._children[i].dispatch(new ExecuteRule());
                }
            }
        }
    }
    removeItem(action) {
        if ((action.type === 'removeItem' || action.type == 'removeInstance') && this._itemTemplate != null) {
            if (this._children.length == 0) {
                return;
            }
            let instanceIndex = action.payload;
            if (typeof instanceIndex !== 'number') {
                instanceIndex = this._children.length - 1;
            }
            const state = this._children[instanceIndex].getState();
            if (this._children.length > this._jsonModel.minItems) {
                this._childrenReference.pop();
                this._children.splice(instanceIndex, 1);
                this.getDataNode().$removeDataNode(instanceIndex, this);
                for (let i = instanceIndex; i < this._children.length; i++) {
                    this._children[i].dispatch(new ExecuteRule());
                }
                this.notifyDependents(propertyChange('items', null, state));
            }
        }
    }
    queueEvent(action) {
        super.queueEvent(action);
        if (action.metadata?.dispatch) {
            this.items.forEach(x => {
                x.queueEvent(action);
            });
        }
    }
    reset() {
        if (this.type === 'array' || isRepeatable$1(this._jsonModel)) {
            if (this.items.length > this._jsonModel.initialItems) {
                const itemsToBeRemoved = this.items.length - this._jsonModel.initialItems;
                for (let i = 0; i < itemsToBeRemoved; i++) {
                    this.dispatch(new RemoveItem());
                }
            }
        }
        this.items.forEach(x => {
            x.reset();
        });
    }
    validate() {
        return this.items.flatMap(x => {
            return x.validate();
        }).filter(x => x.fieldName !== '');
    }
    dispatch(action) {
        super.dispatch(action);
    }
    importData(dataModel) {
        if (typeof this._data !== 'undefined' && this.type === 'array' && Array.isArray(dataModel)) {
            const dataGroup = new DataGroup(this._data.$name, dataModel, this._data.$type, this._data.parent);
            try {
                this._data.parent?.$addDataNode(dataGroup.$name, dataGroup, true);
            }
            catch (e) {
                this.form.logger.error(`unable to setItems for ${this.qualifiedName} : ${e}`);
                return;
            }
            this._data = dataGroup;
            const result = this.syncDataAndFormModel(dataGroup);
            const newLength = this.items.length;
            result.added.forEach((item) => {
                this.notifyDependents(propertyChange('items', item.getState(), null));
                item.dispatch(new Initialize());
            });
            for (let i = 0; i < newLength; i += 1) {
                this._children[i].dispatch(new ExecuteRule());
            }
            result.removed.forEach((item) => {
                this.notifyDependents(propertyChange('items', null, item.getState()));
            });
        }
        else if (typeof this._data === 'undefined') {
            console.warn(`Data node is null, hence importData did not work for panel "${this.name}". Check if parent has a dataRef set to null.`);
        }
    }
    syncDataAndFormModel(contextualDataModel) {
        const result = {
            added: [],
            removed: []
        };
        if (contextualDataModel?.$type === 'array' && this._itemTemplate != null) {
            const dataLength = contextualDataModel?.$value.length;
            const itemsLength = this._children.length;
            const maxItems = this._jsonModel.maxItems === -1 ? dataLength : this._jsonModel.maxItems;
            const minItems = this._jsonModel.minItems;
            let items2Add = Math.min(dataLength - itemsLength, maxItems - itemsLength);
            const items2Remove = Math.min(itemsLength - dataLength, itemsLength - minItems);
            while (items2Add > 0) {
                items2Add--;
                const child = this._addChild(this._itemTemplate, this.items.length, true);
                child._initialize('create');
                result.added.push(child);
            }
            if (items2Remove > 0) {
                for (let i = 0; i < items2Remove; i++) {
                    this._childrenReference.pop();
                    result.removed.push(this._children.pop());
                }
            }
        }
        this._children.forEach(x => {
            let dataModel = x.bindToDataModel(contextualDataModel);
            if (x.isContainer && !dataModel) {
                dataModel = contextualDataModel;
            }
            x.syncDataAndFormModel(dataModel);
        });
        return result;
    }
    get activeChild() {
        return this._activeChild;
    }
    set activeChild(c) {
        if (c !== this._activeChild) {
            let activeChild = this._activeChild;
            while (activeChild instanceof Container) {
                const temp = activeChild.activeChild;
                activeChild.activeChild = null;
                activeChild = temp;
            }
            const change = propertyChange('activeChild', c?.getState(), this._activeChild?.getState());
            this._activeChild = c;
            if (this.parent && c !== null) {
                this.parent.activeChild = this;
            }
            this._jsonModel.activeChild = c?.id;
            this.notifyDependents(change);
        }
    }
    get enabled() {
        const parentEnabled = this.parent?.enabled;
        if (parentEnabled !== undefined) {
            return parentEnabled ? this._jsonModel.enabled : false;
        }
        return this._jsonModel.enabled;
    }
    set enabled(e) {
        this._setProperty('enabled', e, true, this.notifyChildren);
    }
    get readOnly() {
        if (this.parent?.readOnly !== undefined) {
            return this.parent.readOnly ? true : this._jsonModel.readOnly;
        }
        else {
            return this._jsonModel.readOnly;
        }
    }
    set readOnly(e) {
        this._setProperty('readOnly', e, true, this.notifyChildren);
    }
    notifyChildren(action) {
        if (action.payload !== undefined && action.payload.changes !== undefined) {
            for (const change of action.payload.changes) {
                if (change.propertyName !== undefined && notifyChildrenAttributes.includes(change.propertyName)) {
                    this.items.forEach((child) => {
                        if (change.currentValue !== child._jsonModel[change.propertyName]) {
                            child._jsonModel[change.propertyName] = change.currentValue;
                            this.notifyDependents.call(child, propertyChange(change.propertyName, child.getState()[change.propertyName], null));
                        }
                        if (child.fieldType === 'panel') {
                            this.notifyChildren.call(child, action);
                        }
                    });
                }
            }
        }
    }
}
__decorate([
    dependencyTracked()
], Container.prototype, "maxItems", null);
__decorate([
    dependencyTracked()
], Container.prototype, "minItems", null);
__decorate([
    dependencyTracked()
], Container.prototype, "activeChild", null);
class Node {
    _jsonModel;
    constructor(inputModel) {
        this._jsonModel = {
            ...inputModel
        };
    }
    getP(key, def) {
        return getProperty(this._jsonModel, key, def);
    }
    get isContainer() {
        return false;
    }
}
class FormMetaData extends Node {
    get version() {
        return this.getP('version', '');
    }
    get grammar() {
        return this.getP('grammar', '');
    }
}
class SubmitMetaData {
    lang;
    captchaInfo;
    constructor(options = {}) {
        this.lang = options.lang || 'en';
        this.captchaInfo = options.captchaInfo || {};
        Object.keys(options).forEach(key => {
            if (key !== 'lang' && key !== 'captchaInfo') {
                this[key] = options[key];
            }
        });
    }
}
const levels = {
    off: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};
class Logger {
    debug(msg) {
        this.log(msg, 'debug');
    }
    info(msg) {
        this.log(msg, 'info');
    }
    warn(msg) {
        this.log(msg, 'warn');
    }
    error(msg) {
        this.log(msg, 'error');
    }
    log(msg, level) {
        if (this.logLevel !== 0 && this.logLevel <= levels[level]) {
            console[level](msg);
        }
    }
    isLevelEnabled(level) {
        return this.logLevel !== 0 && this.logLevel <= levels[level];
    }
    logLevel;
    constructor(logLevel = 'off') {
        this.logLevel = levels[logLevel];
    }
}
class EventNode {
    _node;
    _event;
    constructor(_node, _event) {
        this._node = _node;
        this._event = _event;
    }
    get node() {
        return this._node;
    }
    get event() {
        return this._event;
    }
    isEqual(that) {
        return that !== null && that !== undefined && this._node == that._node && this._event.type == that._event.type;
    }
    toString() {
        return this._node.id + '__' + this.event.type;
    }
    valueOf() {
        return this.toString();
    }
}
class EventQueue {
    logger;
    static MAX_EVENT_CYCLE_COUNT = 10;
    _runningEventCount;
    _isProcessing = false;
    _pendingEvents = [];
    constructor(logger = new Logger('off')) {
        this.logger = logger;
        this._runningEventCount = {};
    }
    get length() {
        return this._pendingEvents.length;
    }
    get isProcessing() {
        return this._isProcessing;
    }
    isQueued(node, event) {
        const evntNode = new EventNode(node, event);
        return this._pendingEvents.find(x => evntNode.isEqual(x)) !== undefined;
    }
    queue(node, events, priority = false) {
        if (!node || !events) {
            return;
        }
        if (!(events instanceof Array)) {
            events = [events];
        }
        events.forEach(e => {
            const evntNode = new EventNode(node, e);
            const counter = this._runningEventCount[evntNode.valueOf()] || 0;
            if (counter < EventQueue.MAX_EVENT_CYCLE_COUNT) {
                let payloadAsStr = '';
                if (e?.type === 'change' && !e?.payload?.changes.map(_ => _.propertyName).includes('activeChild')) {
                    payloadAsStr = JSON.stringify(e.payload.changes, null, 2);
                }
                else if (e?.type.includes('setProperty')) {
                    payloadAsStr = JSON.stringify(e.payload, null, 2);
                }
                if (this.logger.isLevelEnabled('info')) {
                    node.withDependencyTrackingControl(true, () => {
                        this.logger.info(`Queued event : ${e.type} node: ${node.id} - ${node.qualifiedName} - ${payloadAsStr}`);
                    });
                }
                if (priority) {
                    const index = this._isProcessing ? 1 : 0;
                    this._pendingEvents.splice(index, 0, evntNode);
                }
                else {
                    this._pendingEvents.push(evntNode);
                }
                this._runningEventCount[evntNode.valueOf()] = counter + 1;
            }
            else {
                this.logger.info(`Skipped queueing event : ${e.type} node: ${node.id} - ${node.name} with count=${counter}`);
            }
        });
    }
    empty() {
        this._pendingEvents = [];
    }
    runPendingQueue() {
        if (this._isProcessing) {
            return;
        }
        this._isProcessing = true;
        while (this._pendingEvents.length > 0) {
            const e = this._pendingEvents[0];
            this.logger.info(`Dequeued event : ${e.event.type} node: ${e.node.id} - ${e.node.name}`);
            e.node.executeAction(e.event);
            this._pendingEvents.shift();
        }
        this._runningEventCount = {};
        this._isProcessing = false;
    }
}
const request$1 = (url, data = null, options = {}) => {
    const opts = { ...defaultRequestOptions, ...options };
    const updatedUrl = opts.method === 'GET' && data ? convertQueryString(url, data) : url;
    if (opts.method !== 'GET') {
        opts.body = data;
    }
    return fetch(updatedUrl, {
        ...opts
    }).then(async (response) => {
        let body;
        if (!response.ok) {
            console.error(`Error while fetching response from ${url} : ${response.statusText}`);
        }
        if (response?.headers?.get('Content-Type')?.includes('application/json')) {
            body = await response.json();
        }
        else {
            body = await response.text();
        }
        const headers = {};
        response?.headers?.forEach((value, key) => {
            headers[key] = value;
        });
        return {
            status: response.status,
            body,
            headers
        };
    }).catch((error) => {
        console.error(`Network error while fetching from ${url}:`, error);
        throw error;
    });
};
const defaultRequestOptions = {
    method: 'GET'
};
const convertQueryString = (endpoint, payload) => {
    if (!payload) {
        return endpoint;
    }
    let updatedPayload = {};
    try {
        updatedPayload = JSON.parse(payload);
    }
    catch (err) {
        console.log('Query params invalid');
    }
    const params = [];
    Object.keys(updatedPayload).forEach((key) => {
        if (Array.isArray(updatedPayload[key])) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(updatedPayload[key]))}`);
        }
        else {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(updatedPayload[key])}`);
        }
    });
    if (!params.length) {
        return endpoint;
    }
    return endpoint.includes('?') ? `${endpoint}&${params.join('&')}` : `${endpoint}?${params.join('&')}`;
};
function parsePropertyPath(keyStr) {
    return keyStr
        .replace(/\[/g, '.')
        .replace(/\]/g, '')
        .split('.')
        .filter(Boolean);
}
const getCustomEventName = (name) => {
    const eName = name;
    if (eName.length > 0 && eName.startsWith('custom:')) {
        return eName.substring('custom:'.length);
    }
    return eName;
};
const request = async (context, uri, httpVerb, payload, success, error, headers) => {
    const endpoint = uri;
    const requestOptions = {
        method: httpVerb
    };
    let inputPayload;
    let encryptOutput = {}, cryptoMetadata = null;
    try {
        if (payload instanceof Promise) {
            payload = await payload;
        }
    }
    catch (error) {
        console.error('Error resolving payload Promise:', error);
        throw error;
    }
    if (payload.body && payload.headers) {
        encryptOutput = { ...payload };
        headers = { ...payload.headers };
        payload = payload.body;
        cryptoMetadata = payload.cryptoMetadata;
        inputPayload = payload;
    }
    if (payload && payload instanceof FileObject && payload.data instanceof File) {
        const formData = new FormData();
        formData.append(payload.name, payload.data);
        inputPayload = formData;
    }
    else if (payload instanceof FormData) {
        inputPayload = payload;
    }
    else if (payload && (typeof payload === 'string' || (typeof payload === 'object' && Object.keys(payload).length > 0))) {
        const headerNames = Object.keys(headers);
        if (headerNames.length > 0) {
            requestOptions.headers = {
                ...headers,
                ...(headerNames.indexOf('Content-Type') === -1 ? { 'Content-Type': 'application/json' } : {})
            };
        }
        else {
            requestOptions.headers = { 'Content-Type': 'application/json' };
        }
        const contentType = requestOptions?.headers?.['Content-Type'] || 'application/json';
        if (typeof payload === 'object') {
            if (contentType === 'application/json') {
                inputPayload = JSON.stringify(payload);
            }
            else if (contentType.indexOf('multipart/form-data') > -1) {
                inputPayload = multipartFormData(payload);
            }
            else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
                inputPayload = urlEncoded(payload);
            }
        }
        if (contentType === 'text/plain') {
            inputPayload = String(payload);
        }
    }
    const dispatchErrorEvents = (response, errorType, enhancedPayload) => {
        const eName = getCustomEventName(errorType);
        if (errorType === 'submitError') {
            context.form.dispatch(new SubmitError(response, true));
            context.form.dispatch(new SubmitFailure(response, true));
        }
        else {
            if (context.field) {
                context.field.dispatch(new CustomEvent(eName, response, true));
            }
            else {
                context.form.dispatch(new CustomEvent(eName, response, true));
            }
        }
        context.form.dispatch(new RequestFailure(enhancedPayload, false));
    };
    const targetField = context.$field || null;
    const baseEnhancedPayload = {
        request: { url: endpoint, method: httpVerb, ...encryptOutput },
        targetField: targetField,
        targetEvent: context.$event || null
    };
    try {
        const response = await request$1(endpoint, inputPayload, requestOptions);
        response.originalRequest = {
            url: endpoint,
            method: httpVerb,
            ...(cryptoMetadata && { cryptoMetadata }),
            ...encryptOutput
        };
        response.submitter = targetField;
        const enhancedPayload = {
            ...baseEnhancedPayload,
            response,
            request: response.originalRequest
        };
        if (response?.status >= 200 && response?.status <= 299) {
            const eName = getCustomEventName(success);
            if (success === 'submitSuccess') {
                context.form.dispatch(new SubmitSuccess(response, true));
            }
            else {
                if (context.field) {
                    context.field.dispatch(new CustomEvent(eName, response, true));
                }
                else {
                    context.form.dispatch(new CustomEvent(eName, response, true));
                }
            }
            context.form.dispatch(new RequestSuccess(enhancedPayload, false));
        }
        else {
            context.form.logger.error('Error invoking a rest API');
            dispatchErrorEvents(response, error, enhancedPayload);
        }
        return response;
    }
    catch (networkError) {
        context.form.logger.error('Network error while invoking a rest API:', networkError);
        const networkErrorResponse = {
            body: null,
            headers: {},
            error: networkError instanceof Error ? networkError.message : String(networkError)
        };
        const enhancedPayload = {
            ...baseEnhancedPayload,
            response: networkErrorResponse
        };
        dispatchErrorEvents(networkErrorResponse, error, enhancedPayload);
        context.form.dispatch(new RequestFailure(enhancedPayload, false));
    }
};
const urlEncoded = (data) => {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
        if (value != null && typeof value === 'object') {
            formData.append(key, jsonString(value));
        }
        else {
            formData.append(key, value);
        }
    });
    return formData;
};
const submit = async (context, success, error, submitAs = 'multipart/form-data', input_data = null, action = '', metadata = null) => {
    const endpoint = action || context.form.action;
    let data = input_data;
    const attachments = await readAttachments(context.form, true);
    if (typeof data != 'object' || data == null) {
        data = context.form.exportData(attachments);
    }
    let submitContentType = submitAs;
    const submitDataAndMetaData = { 'data': data, ...metadata };
    let formData = submitDataAndMetaData;
    if (Object.keys(attachments).length > 0 || submitAs === 'multipart/form-data') {
        formData = multipartFormData(submitDataAndMetaData, attachments);
        submitContentType = 'multipart/form-data';
    }
    await request(context, endpoint, 'POST', formData, success, error, {
        'Content-Type': submitContentType
    });
};
const multipartFormData = (data, attachments) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value != null && typeof value === 'object') {
            formData.append(key, jsonString(value));
        }
        else {
            formData.append(key, value);
        }
    });
    const addAttachmentToFormData = (objValue, formData) => {
        if (objValue?.data instanceof File) {
            let attIdentifier = `${objValue?.dataRef}/${objValue?.name}`;
            if (!attIdentifier.startsWith('/')) {
                attIdentifier = `/${attIdentifier}`;
            }
            formData.append(attIdentifier, objValue.data);
        }
    };
    if (attachments) {
        Object.keys(attachments).reduce((acc, curr) => {
            const objValue = attachments[curr];
            if (objValue && objValue instanceof Array) {
                return [...acc, ...objValue.map((x) => addAttachmentToFormData(x, formData))];
            }
            else {
                return [...acc, addAttachmentToFormData(objValue, formData)];
            }
        }, []);
    }
    return formData;
};
const createAction = (name, payload = {}, dispatch = false) => {
    switch (name) {
        case 'change':
            return new Change(payload);
        case 'submit':
            return new Submit(payload);
        case 'save':
            return new Save(payload);
        case 'click':
            return new Click(payload);
        case 'addItem':
            return new AddItem(payload);
        case 'removeItem':
            return new RemoveItem(payload);
        case 'reset':
            return new Reset(payload);
        case 'addInstance':
            return new AddInstance(payload);
        case 'removeInstance':
            return new RemoveInstance(payload);
        case 'invalid':
            return new Invalid(payload);
        case 'valid':
            return new Valid(payload);
        case 'initialize':
            return new Initialize(payload);
        case 'focus':
            return new Focus(payload);
        default:
            console.error('invalid action');
    }
};
class FunctionRuntimeImpl {
    static instance = null;
    customFunctions = {};
    constructor() {
    }
    static getInstance() {
        if (!FunctionRuntimeImpl.instance) {
            FunctionRuntimeImpl.instance = new FunctionRuntimeImpl();
        }
        return FunctionRuntimeImpl.instance;
    }
    registerFunctions(functions) {
        Object.entries(functions).forEach(([name, funcDef]) => {
            let finalFunction = funcDef;
            if (typeof funcDef === 'function') {
                finalFunction = {
                    _func: (args, data, interpreter) => {
                        const globals = {
                            form: interpreter.globals.$form,
                            field: interpreter.globals.$field,
                            event: interpreter.globals.$event,
                            functions: {
                                setProperty: (target, payload) => {
                                    const eventName = 'custom:setProperty';
                                    const args = [target, eventName, payload];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().dispatchEvent._func.call(undefined, args, data, interpreter);
                                },
                                reset: (target) => {
                                    const eventName = 'reset';
                                    target = target || 'reset';
                                    const args = [target, eventName];
                                    interpreter.globals.form.logger.warn('This usage of reset is deprecated. Please see the documentation and update.');
                                    return FunctionRuntimeImpl.getInstance().getFunctions().dispatchEvent._func.call(undefined, args, data, interpreter);
                                },
                                validate: (target) => {
                                    const args = [target];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().validate._func.call(undefined, args, data, interpreter);
                                },
                                importData: (inputData, qualifiedName) => {
                                    const args = [inputData, qualifiedName];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().importData._func.call(undefined, args, data, interpreter);
                                },
                                exportData: () => {
                                    return FunctionRuntimeImpl.getInstance().getFunctions().exportData._func.call(undefined, args, data, interpreter);
                                },
                                submitForm: (payload, validateForm, contentType) => {
                                    const submitAs = contentType || 'multipart/form-data';
                                    const args = [payload, validateForm, submitAs];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().submitForm._func.call(undefined, args, data, interpreter);
                                },
                                markFieldAsInvalid: (fieldIdentifier, validationMessage, option) => {
                                    if (!option || option.useId) {
                                        interpreter.globals.form.getElement(fieldIdentifier)?.markAsInvalid(validationMessage);
                                    }
                                    else if (option && option.useDataRef) {
                                        interpreter.globals.form.visit(function callback(f) {
                                            if (f.dataRef === fieldIdentifier) {
                                                f.markAsInvalid(validationMessage);
                                            }
                                        });
                                    }
                                    else if (option && option.useQualifiedName) {
                                        interpreter.globals.form.resolveQualifiedName(fieldIdentifier)?.markAsInvalid(validationMessage);
                                    }
                                },
                                setFocus: (target, flag) => {
                                    const args = [target, flag];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().setFocus._func.call(undefined, args, data, interpreter);
                                },
                                dispatchEvent: (target, eventName, payload, dispatch) => {
                                    const args = [target, eventName, payload, dispatch];
                                    return FunctionRuntimeImpl.getInstance().getFunctions().dispatchEvent._func.call(undefined, args, data, interpreter);
                                },
                                getFiles: (qualifiedName) => {
                                    const filesMap = {};
                                    if (!qualifiedName) {
                                        interpreter.globals.form.visit(function callback(f) {
                                            if (f.fieldType === 'file-input' && f.value) {
                                                filesMap[f.qualifiedName] = f.serialize();
                                            }
                                        });
                                    }
                                    const field = interpreter.globals.form.resolveQualifiedName(qualifiedName);
                                    if (field?.fieldType === 'file-input' && field?.value) {
                                        filesMap[qualifiedName] = field.serialize();
                                    }
                                    return filesMap;
                                }
                            }
                        };
                        return funcDef(...args, globals);
                    },
                    _signature: []
                };
            }
            if (!finalFunction.hasOwnProperty('_func')) {
                console.warn(`Unable to register function with name ${name}.`);
                return;
            }
            FunctionRuntimeImpl.getInstance().customFunctions[name] = finalFunction;
        });
    }
    unregisterFunctions(...names) {
        names.forEach(name => {
            if (name in FunctionRuntimeImpl.getInstance().customFunctions) {
                delete FunctionRuntimeImpl?.getInstance().customFunctions[name];
            }
        });
    }
    getFunctions() {
        function isArray(obj) {
            if (obj !== null) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }
            return false;
        }
        function valueOf(a) {
            if (a === null || a === undefined) {
                return a;
            }
            if (isArray(a)) {
                return a.map(i => valueOf(i));
            }
            return a.valueOf();
        }
        function toString(a) {
            if (a === null || a === undefined) {
                return '';
            }
            return a.toString();
        }
        const defaultFunctions = {
            validate: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    let validation;
                    if (typeof element === 'string' || typeof element === 'undefined') {
                        validation = interpreter.globals.form.validate();
                    }
                    else {
                        validation = interpreter.globals.form.getElement(element.$id).validate();
                    }
                    if (Array.isArray(validation) && validation.length) {
                        interpreter.globals.form.logger.warn('Form Validation Error');
                    }
                    return validation;
                },
                _signature: []
            },
            setFocus: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    const flag = args[1];
                    try {
                        const field = interpreter.globals.form.getElement(element?.$id) || interpreter.globals.field;
                        interpreter.globals.form.setFocus(field, flag);
                    }
                    catch (e) {
                        interpreter.globals.form.logger.error('An error has occurred within the setFocus API.');
                    }
                },
                _signature: []
            },
            getData: {
                _func: (args, data, interpreter) => {
                    interpreter.globals.form.logger.warn('The `getData` function is depricated. Use `exportData` instead.');
                    return interpreter.globals.form.withDependencyTrackingControl(true, () => {
                        return interpreter.globals.form.exportData();
                    });
                },
                _signature: []
            },
            exportData: {
                _func: (args, data, interpreter) => {
                    return interpreter.globals.form.withDependencyTrackingControl(true, () => {
                        return interpreter.globals.form.exportData();
                    });
                },
                _signature: []
            },
            importData: {
                _func: (args, data, interpreter) => {
                    return interpreter.globals.form.withDependencyTrackingControl(true, () => {
                        const inputData = args[0];
                        const qualifiedName = args[1];
                        if (typeof inputData === 'object' && inputData !== null && !qualifiedName) {
                            interpreter.globals.form.importData(inputData);
                        }
                        else {
                            const field = interpreter.globals.form.resolveQualifiedName(qualifiedName);
                            if (field?.isContainer) {
                                field.importData(inputData, qualifiedName);
                            }
                            else {
                                interpreter.globals.form.logger.error('Invalid argument passed in importData. A container is expected');
                            }
                        }
                        return {};
                    });
                },
                _signature: []
            },
            submitForm: {
                _func: async (args, data, interpreter) => {
                    let success = null;
                    let error = null;
                    let submit_data;
                    let validate_form;
                    let submit_as;
                    if (args.length > 0 && typeof valueOf(args[0]) === 'object') {
                        submit_data = args.length > 0 ? valueOf(args[0]) : null;
                        validate_form = args.length > 1 ? valueOf(args[1]) : true;
                        submit_as = args.length > 2 ? toString(args[2]) : 'multipart/form-data';
                    }
                    else {
                        interpreter.globals.form.logger.warn('This usage of submitForm is deprecated. Please see the documentation and update');
                        success = toString(args[0]);
                        error = toString(args[1]);
                        submit_as = args.length > 2 ? toString(args[2]) : 'multipart/form-data';
                        submit_data = args.length > 3 ? valueOf(args[3]) : null;
                        validate_form = args.length > 4 ? valueOf(args[4]) : true;
                    }
                    const form = interpreter.globals.form;
                    if (form.captcha && (form.captcha.captchaDisplayMode === CaptchaDisplayMode.INVISIBLE ||
                        (form.captcha.properties['fd:captcha']?.config?.version === 'enterprise' && form.captcha.properties['fd:captcha']?.config?.keyType === 'score'))) {
                        if (typeof interpreter.runtime.functionTable.fetchCaptchaToken?._func !== 'function') {
                            interpreter.globals.form.logger.error('fetchCaptchaToken is not defined');
                            interpreter.globals.form.dispatch(new SubmitError({ type: 'FetchCaptchaTokenNotDefined' }));
                            return {};
                        }
                        try {
                            const token = await interpreter.runtime.functionTable.fetchCaptchaToken._func([], data, interpreter);
                            form.captcha.value = token;
                        }
                        catch (e) {
                            interpreter.globals.form.logger.error('Error while fetching captcha token');
                            interpreter.globals.form.dispatch(new SubmitError({ type: 'FetchCaptchaTokenFailed' }));
                            return {};
                        }
                    }
                    interpreter.globals.form.dispatch(new Submit({
                        success,
                        error,
                        submit_as,
                        validate_form: validate_form,
                        data: submit_data
                    }));
                    return {};
                },
                _signature: []
            },
            saveForm: {
                _func: (args, data, interpreter) => {
                    const action = toString(args[0]);
                    const validate_form = args[2] || false;
                    interpreter.globals.form.dispatch(new Save({
                        action,
                        validate_form
                    }));
                    return {};
                },
                _signature: []
            },
            setVariable: {
                _func: (args, data, interpreter) => {
                    const variableName = toString(args[0]);
                    let variableValue = args[1];
                    const normalFieldOrPanel = args[2] || interpreter.globals.form;
                    if (variableValue && typeof variableValue === 'object' && variableValue.$qualifiedName) {
                        const variableValueElement = interpreter.globals.form.getElement(variableValue.$id);
                        variableValue = variableValueElement._jsonModel.value;
                    }
                    const target = normalFieldOrPanel.$id ? interpreter.globals.form.getElement(normalFieldOrPanel.$id) : interpreter.globals.form;
                    const propertiesManager = target.getPropertiesManager();
                    propertiesManager.updateSimpleProperty(variableName, variableValue);
                    return {};
                },
                _signature: []
            },
            getVariable: {
                _func: (args, data, interpreter) => {
                    const variableName = toString(args[0]);
                    const normalFieldOrPanel = args[1] || interpreter.globals.form;
                    if (!variableName) {
                        return undefined;
                    }
                    const target = normalFieldOrPanel.$id ? interpreter.globals.form.getElement(normalFieldOrPanel.$id) : interpreter.globals.form;
                    const propertiesManager = target.getPropertiesManager();
                    if (variableName.includes('.')) {
                        const properties = parsePropertyPath(variableName);
                        let value = propertiesManager.properties;
                        for (const prop of properties) {
                            if (value === undefined || value === null) {
                                return undefined;
                            }
                            value = value[prop];
                        }
                        return value;
                    }
                    else {
                        propertiesManager.ensurePropertyDescriptor(variableName);
                        return propertiesManager.properties[variableName];
                    }
                },
                _signature: []
            },
            request: {
                _func: (args, data, interpreter) => {
                    const uri = toString(args[0]);
                    const httpVerb = toString(args[1]);
                    let payload;
                    let success;
                    let error;
                    let headers = {};
                    if (args[2] && typeof args[2] === 'object' && !args[2].then && ('data' in args[2] || 'headers' in args[2])) {
                        const payloadObj = valueOf(args[2]);
                        payload = payloadObj.data;
                        headers = payloadObj.headers || {};
                        success = valueOf(args[3]);
                        error = valueOf(args[4]);
                    }
                    else {
                        payload = valueOf(args[2]);
                        if (typeof (args[3]) === 'string') {
                            interpreter.globals.form.logger.warn('This usage of request is deprecated. Please see the documentation and update');
                            success = valueOf(args[3]);
                            error = valueOf(args[4]);
                        }
                        else {
                            headers = valueOf(args[3]);
                            success = valueOf(args[4]);
                            error = valueOf(args[5]);
                        }
                    }
                    return request(interpreter.globals, uri, httpVerb, payload, success, error, headers);
                },
                _signature: []
            },
            requestWithRetry: {
                _func: (args, data, interpreter) => {
                    const uri = toString(args[0]);
                    const httpVerb = toString(args[1]);
                    let success;
                    let errorFn;
                    let payload = valueOf(args[2]);
                    if (typeof (args[3]) === 'string' && args.length === 5) {
                        success = valueOf(args[3]);
                        errorFn = valueOf(args[4]);
                    }
                    else if (typeof (args[4]) === 'string' && args.length === 6) {
                        success = valueOf(args[4]);
                        errorFn = valueOf(args[5]);
                    }
                    return async (retryOptions) => {
                        try {
                            if (payload instanceof Promise) {
                                payload = await payload;
                            }
                        }
                        catch (error) {
                            console.error('Error resolving payload Promise:', error);
                            throw error;
                        }
                        let finalHeaders = {};
                        let finalBody = {}, finalCryptoMetadata = null;
                        if (args.length === 5) {
                            finalBody = payload.body || {};
                            finalHeaders = payload.headers || {};
                            finalCryptoMetadata = payload.cryptoMetadata;
                        }
                        else {
                            finalBody = payload || {};
                            finalHeaders = args[3] || {};
                        }
                        if (retryOptions) {
                            if (retryOptions.body) {
                                finalBody = {
                                    ...finalBody,
                                    ...retryOptions.body
                                };
                            }
                            if (retryOptions.headers) {
                                finalHeaders = {
                                    ...finalHeaders,
                                    ...retryOptions.headers
                                };
                            }
                        }
                        const finalPayload = { 'body': finalBody, 'headers': finalHeaders, ...(finalCryptoMetadata && { cryptoMetadata: finalCryptoMetadata }) };
                        try {
                            const response = await request(interpreter.globals, uri, httpVerb, finalPayload, success, errorFn, finalHeaders);
                            return response;
                        }
                        catch (error) {
                            if (error && typeof error === 'object' && 'status' in error && error.status >= 400) {
                                throw error;
                            }
                            throw new Error('Request failed');
                        }
                    };
                },
                _signature: []
            },
            retryHandler: {
                _func: (args, data, interpreter) => {
                    const requestFn = valueOf(args[0]);
                    return requestFn();
                },
                _signature: []
            },
            awaitFn: {
                _func: async (args, data, interpreter) => {
                    const success = args[1];
                    const currentField = interpreter.globals.$field;
                    try {
                        const result = await args[0];
                        defaultFunctions.dispatchEvent._func([currentField, success, result], data, interpreter);
                    }
                    catch (err) {
                        const error = args[2];
                        if (error) {
                            defaultFunctions.dispatchEvent._func([currentField, error, err], data, interpreter);
                        }
                    }
                    return {};
                },
                _signature: []
            },
            addInstance: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    const payload = args.length > 1 ? valueOf(args[1]) : undefined;
                    try {
                        const formElement = interpreter.globals.form.getElement(element.$id);
                        const action = createAction('addInstance', payload);
                        formElement.addItem(action);
                    }
                    catch (e) {
                        interpreter.globals.form.logger.error('Invalid argument passed in addInstance. An element is expected');
                    }
                },
                _signature: []
            },
            removeInstance: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    const payload = args.length > 1 ? valueOf(args[1]) : undefined;
                    try {
                        const formElement = interpreter.globals.form.getElement(element.$id);
                        const action = createAction('removeInstance', payload);
                        formElement.removeItem(action);
                    }
                    catch (e) {
                        interpreter.globals.form.logger.error('Invalid argument passed in removeInstance. An element is expected');
                    }
                },
                _signature: []
            },
            dispatchEvent: {
                _func: (args, data, interpreter) => {
                    const element = args[0];
                    if (element === null && typeof interpreter !== 'string') {
                        interpreter.debug.push('Invalid argument passed in dispatchEvent. An element is expected');
                        return {};
                    }
                    let eventName = valueOf(args[1]);
                    let payload = args.length > 2 ? valueOf(args[2]) : undefined;
                    let dispatch = args.length > 3 ? valueOf(args[3]) : false;
                    if (typeof element === 'string') {
                        payload = eventName;
                        eventName = element;
                        dispatch = true;
                    }
                    let event;
                    if (eventName.startsWith('custom:')) {
                        event = new CustomEvent(eventName.substring('custom:'.length), payload, dispatch);
                    }
                    else {
                        event = createAction(eventName, payload, dispatch);
                    }
                    if (event != null) {
                        if (typeof element === 'string') {
                            interpreter.globals.form.dispatch(event);
                        }
                        else {
                            const dispatchEventOnElement = (element, event, interpreter) => {
                                interpreter.globals.form.getElement(element.$id).dispatch(event);
                            };
                            if (Array.isArray(element) && element.length > 0 && typeof element.$id === 'undefined') {
                                element.forEach(el => {
                                    dispatchEventOnElement(el, event, interpreter);
                                });
                            }
                            else {
                                dispatchEventOnElement(element, event, interpreter);
                            }
                        }
                    }
                    return {};
                },
                _signature: []
            },
            encrypt: {
                _func: async (args, data, interpreter) => {
                    const payload = valueOf(args[0]);
                    return payload;
                },
                _signature: []
            },
            decrypt: {
                _func: async (args, data, interpreter) => {
                    const encData = valueOf(args[0]);
                    return encData;
                },
                _signature: []
            },
            getQueryParameter: {
                _func: (args, data, interpreter) => {
                    const param = toString(args[0]);
                    if (!param) {
                        interpreter.globals.form.logger.error('Argument is missing in getQueryParameter. A parameter is expected');
                        return '';
                    }
                    const queryParams = interpreter.globals.form?.properties?.queryParams;
                    if (queryParams) {
                        if (queryParams[param] !== undefined) {
                            return queryParams[param];
                        }
                        const lowerParam = param.toLowerCase();
                        for (const [key, value] of Object.entries(queryParams)) {
                            if (key.toLowerCase() === lowerParam) {
                                return value;
                            }
                        }
                    }
                    try {
                        const urlParams = new URLSearchParams(window?.location?.search || '');
                        const urlValue = urlParams.get(param) ||
                            Array.from(urlParams.entries())
                                .find(([key]) => key.toLowerCase() === param.toLowerCase())?.[1];
                        if (urlValue !== null && urlValue !== undefined) {
                            return urlValue;
                        }
                    }
                    catch (e) {
                        interpreter.globals.form.logger.warn('Error reading URL parameters:', e);
                    }
                    return '';
                },
                _signature: []
            },
            getBrowserDetail: {
                _func: (args, data, interpreter) => {
                    const param = toString(args[0]);
                    if (!param) {
                        interpreter.globals.form.logger.error('Argument is missing in getBrowserDetail. A parameter is expected');
                        return '';
                    }
                    if (interpreter.globals.form?.properties?.browserDetails?.[param]) {
                        return interpreter.globals.form.properties.browserDetails[param];
                    }
                    if (typeof navigator !== 'undefined' && param in navigator) {
                        return navigator[param] || '';
                    }
                    else {
                        interpreter.globals.form.logger.warn(`Invalid or unsupported browser detail requested: "${param}"`);
                        return '';
                    }
                },
                _signature: []
            },
            getURLDetail: {
                _func: (args, data, interpreter) => {
                    const param = toString(args[0]);
                    if (!param) {
                        interpreter.globals.form.logger.error('Argument is missing in getURLDetail. A parameter is expected');
                        return '';
                    }
                    if (interpreter.globals.form?.properties?.urlDetails?.[param]) {
                        return interpreter.globals.form.properties.urlDetails[param];
                    }
                    if (typeof window !== 'undefined' && typeof window.location !== 'undefined' && param in window.location) {
                        return window.location[param] || '';
                    }
                    else {
                        interpreter.globals.form.logger.warn(`Invalid or unsupported url parameter requested: "${param}"`);
                        return '';
                    }
                },
                _signature: []
            },
            getRelativeInstanceIndex: {
                _func: (args, data, interpreter) => {
                    if (!Array.isArray(args[0]) || args[0].length === 0) {
                        return -1;
                    }
                    const instanceManager = valueOf(args[0])[0].$parent;
                    const field = interpreter.globals.$field;
                    const baseName = instanceManager.$qualifiedName;
                    const qn = field.$qualifiedName;
                    if (qn.startsWith(baseName + '[')) {
                        const startBracket = baseName.length + 1;
                        const endBracket = qn.indexOf(']', startBracket);
                        if (endBracket !== -1) {
                            const idx = Number(qn.slice(startBracket, endBracket));
                            if (!Number.isNaN(idx)) {
                                return idx;
                            }
                        }
                    }
                    return instanceManager.length - 1;
                },
                _signature: []
            },
            today: {
                _func: () => {
                    const MS_IN_DAY = 24 * 60 * 60 * 1000;
                    const now = new Date(Date.now());
                    const _today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return _today / MS_IN_DAY;
                },
                _signature: []
            },
            formatInput: {
                _func: (args) => {
                    const input = args[0];
                    const format = args[1];
                    if (!input || !format) {
                        return input;
                    }
                    const inputStr = String(input).replace(/\D/g, '');
                    switch (String(format).toLowerCase()) {
                        case 'phonenumber': {
                            if (inputStr.length >= 10) {
                                const areaCode = inputStr.substring(0, 3);
                                const firstThree = inputStr.substring(3, 6);
                                const lastFour = inputStr.substring(6, 10);
                                return `(${areaCode}) ${firstThree}-${lastFour}`;
                            }
                            else if (inputStr.length >= 7) {
                                const firstThree = inputStr.substring(0, 3);
                                const lastFour = inputStr.substring(3, 7);
                                return `(${firstThree}) ${lastFour}`;
                            }
                            return inputStr;
                        }
                        case 'socialsecuritynumber': {
                            if (inputStr.length >= 9) {
                                const firstThree = inputStr.substring(0, 3);
                                const middleTwo = inputStr.substring(3, 5);
                                const lastFour = inputStr.substring(5, 9);
                                return `${firstThree}-${middleTwo}-${lastFour}`;
                            }
                            return inputStr;
                        }
                        case 'email-alphanumeric': {
                            const alphanumeric = String(input).replace(/[^a-zA-Z0-9]/g, '');
                            if (alphanumeric.length > 0) {
                                return `${alphanumeric}@example.com`;
                            }
                            return input;
                        }
                        case 'zipcode': {
                            if (inputStr.length >= 5) {
                                return inputStr.substring(0, 5);
                            }
                            return inputStr;
                        }
                        default:
                            return input;
                    }
                },
                _signature: []
            }
        };
        return { ...defaultFunctions, ...FunctionRuntimeImpl.getInstance().customFunctions };
    }
}
const FunctionRuntime = FunctionRuntimeImpl.getInstance();
const transformFieldName = (fieldName) => {
    return fieldName.split('.').slice(1).map(p => p.match(/\[\d+\]$/) ? p : p !== '' ? `${p}[0]` : p).join('.');
};
class Version {
    #minor;
    #major;
    #subVersion;
    #invalid = true;
    constructor(n) {
        const match = n.match(/([^.]+)\.([^.]+)(?:\.(.+))?/);
        if (match) {
            this.#major = +match[1];
            this.#minor = +match[2];
            this.#subVersion = match[3] ? +match[3] : 0;
            if (isNaN(this.#major) || isNaN(this.#minor) || isNaN(this.#subVersion)) {
                throw new Error('Invalid version string ' + n);
            }
        }
        else {
            throw new Error('Invalid version string ' + n);
        }
    }
    get major() {
        return this.#major;
    }
    get minor() {
        return this.#minor;
    }
    get subversion() {
        return this.#subVersion;
    }
    completeMatch(v) {
        return this.major === v.major &&
            this.minor === v.minor &&
            this.#subVersion === v.subversion;
    }
    lessThan(v) {
        return this.major < v.major || (this.major === v.major && (this.minor < v.minor)) || (this.major === v.major && this.minor === v.minor && this.#subVersion < v.subversion);
    }
    toString() {
        return `${this.major}.${this.minor}.${this.subversion}`;
    }
    valueOf() {
        return this.toString();
    }
}
const currentVersion = new Version('0.13');
const changeEventVersion = new Version('0.13');
class Form extends Container {
    _ruleEngine;
    _eventQueue;
    additionalSubmitMetadata = {};
    _fields = {};
    _ids;
    _invalidFields = [];
    _exportDataAttachmentMap = {};
    promises = [];
    _captcha = null;
    constructor(n, fieldFactory, _ruleEngine, _eventQueue = new EventQueue(), logLevel = 'off', mode = 'create') {
        super(n, { fieldFactory: fieldFactory, mode });
        this._ruleEngine = _ruleEngine;
        this._eventQueue = _eventQueue;
        this._logger = new Logger(logLevel);
        this._applyDefaultsInModel();
        if (mode === 'create') {
            this.queueEvent(new Initialize());
            if (this.changeEventBehaviour === 'deps') {
                this.queueEvent(new Change({ changes: [] }));
            }
            else {
                this.queueEvent(new ExecuteRule());
            }
        }
        this._ids = IdGenerator();
        this.bindToDataModel(new DataGroup('$form', {}));
        this._initialize(mode);
        if (mode === 'create') {
            this.queueEvent(new FormLoad());
        }
    }
    addPromises(updates) {
        this.promises.push(updates);
    }
    async waitForPromises() {
        let length = 0;
        while (this.promises.length > length) {
            length = this.promises.length;
            await Promise.all(this.promises);
        }
        this.promises = [];
    }
    _applyDefaultsInModel() {
        const current = this.specVersion;
        this._jsonModel.properties = this._jsonModel.properties || {};
        this._jsonModel.fieldType = this._jsonModel.fieldType || 'form';
        if (current.lessThan(changeEventVersion) ||
            typeof this._jsonModel.properties['fd:changeEventBehaviour'] !== 'string') {
            this._jsonModel.properties['fd:changeEventBehaviour'] = 'self';
        }
    }
    _logger;
    get activeField() {
        return this._findActiveField(this);
    }
    _findActiveField(field) {
        if (!field?.isContainer) {
            return field;
        }
        return this._findActiveField(field?.activeChild);
    }
    get logger() {
        return this._logger;
    }
    get changeEventBehaviour() {
        return this.properties['fd:changeEventBehaviour'] === 'deps' ? 'deps' : 'self';
    }
    dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g;
    get metaData() {
        const metaData = this._jsonModel.metadata || {};
        return new FormMetaData(metaData);
    }
    get action() {
        return this._jsonModel.action;
    }
    get isFragment() {
        return false;
    }
    importData(dataModel) {
        this.bindToDataModel(new DataGroup('$form', dataModel));
        this.syncDataAndFormModel(this.getDataNode());
        this._eventQueue.runPendingQueue();
    }
    exportData(attachmentSerializedMap = {}) {
        this._exportDataAttachmentMap = attachmentSerializedMap;
        const finalData = this.getDataNode()?.$value;
        this._exportDataAttachmentMap = {};
        return finalData;
    }
    setAdditionalSubmitMetadata(metadata) {
        this.additionalSubmitMetadata = { ...this.additionalSubmitMetadata, ...metadata };
    }
    get specVersion() {
        if (typeof this._jsonModel.adaptiveform === 'string') {
            try {
                return new Version(this._jsonModel.adaptiveform);
            }
            catch (e) {
                console.log(e);
                console.log('Falling back to default version' + currentVersion.toString());
                return currentVersion;
            }
        }
        else {
            return currentVersion;
        }
    }
    resolveQualifiedName(qualifiedName) {
        if (this.qualifiedName === qualifiedName) {
            return this;
        }
        let foundFormElement = null;
        this.visit(formElement => {
            if (formElement.qualifiedName === qualifiedName) {
                foundFormElement = formElement;
            }
        });
        return foundFormElement;
    }
    exportSubmitMetaData() {
        return this.withDependencyTrackingControl(true, () => {
            const captchaInfoObj = {};
            this.visit(field => {
                if (field.fieldType === 'captcha') {
                    captchaInfoObj[field.qualifiedName] = field.value;
                }
            });
            const additionalMeta = {};
            const draftId = this.properties['fd:draftId'] || '';
            if (draftId) {
                additionalMeta['fd:draftId'] = draftId;
            }
            const dorProps = this.properties['fd:dor'];
            if (dorProps && dorProps.dorType !== 'none') {
                const excludeFromDoRIfHidden = dorProps['fd:excludeFromDoRIfHidden'];
                let excludeFromDoR = [];
                excludeFromDoR = Object.values(this._fields)
                    .filter(field => field.enabled === false || (excludeFromDoRIfHidden && field.visible === false))
                    .map(field => transformFieldName(field.qualifiedName));
                if (excludeFromDoR && excludeFromDoR.length > 0) {
                    additionalMeta.excludeFromDoR = excludeFromDoR;
                }
            }
            if (Object.keys(additionalMeta).length > 0) {
                this.setAdditionalSubmitMetadata(additionalMeta);
            }
            const options = {
                lang: this.lang,
                captchaInfo: captchaInfoObj,
                ...this.additionalSubmitMetadata
            };
            return new SubmitMetaData(options);
        });
    }
    #getNavigableChildren(children) {
        return children.filter(child => child.visible === true);
    }
    #getFirstNavigableChild(container) {
        const navigableChildren = this.#getNavigableChildren(container.items);
        if (navigableChildren && navigableChildren.length > 0) {
            return navigableChildren[0];
        }
        return null;
    }
    #setActiveFirstDeepChild(currentField) {
        if (!currentField.isContainer) {
            currentField.parent.activeChild = currentField;
            return;
        }
        this.#clearCurrentFocus(currentField);
        const activeChild = currentField.activeChild || this.#getFirstNavigableChild(currentField);
        if (activeChild === null) {
            currentField.parent.activeChild = currentField;
            return;
        }
        this.#setActiveFirstDeepChild(activeChild);
    }
    #getNextItem(currIndex, navigableChidren) {
        if (currIndex < (navigableChidren.length - 1)) {
            return navigableChidren[currIndex + 1];
        }
        return null;
    }
    #getPreviousItem(currIndex, navigableChidren) {
        if (currIndex > 0) {
            return navigableChidren[currIndex - 1];
        }
        return null;
    }
    #clearCurrentFocus(field) {
        const parent = field.parent;
        if (parent != null && parent.activeChild != null) {
            parent.activeChild = null;
        }
    }
    setFocus(field, focusOption) {
        const dependencyTracking = this._ruleEngine.getDependencyTracking();
        this._ruleEngine.setDependencyTracking(false);
        try {
            if (!focusOption) {
                this.#clearCurrentFocus(field);
                this.#setActiveFirstDeepChild(field);
                return;
            }
            const parent = (field?.isContainer ? field : field.parent);
            const navigableChidren = this.#getNavigableChildren(parent.items);
            let activeChild = parent.activeChild;
            let currActiveChildIndex = activeChild !== null ? navigableChidren.indexOf(activeChild) : -1;
            if (parent.activeChild === null) {
                this.#setActiveFirstDeepChild(navigableChidren[0]);
                currActiveChildIndex = 0;
                return;
            }
            if (focusOption === FocusOption.NEXT_ITEM) {
                activeChild = this.#getNextItem(currActiveChildIndex, navigableChidren);
            }
            else if (focusOption === FocusOption.PREVIOUS_ITEM) {
                activeChild = this.#getPreviousItem(currActiveChildIndex, navigableChidren);
            }
            if (activeChild !== null) {
                this.#setActiveFirstDeepChild(activeChild);
            }
        }
        finally {
            this._ruleEngine.setDependencyTracking(dependencyTracking);
        }
    }
    getState(forRestore = false) {
        const self = this;
        const res = super.getState(false, forRestore);
        res.id = '$form';
        Object.defineProperty(res, 'data', {
            get: function () {
                return self.exportData();
            }
        });
        Object.defineProperty(res, 'attachments', {
            get: function () {
                return getAttachments(self);
            }
        });
        return res;
    }
    get type() {
        return 'object';
    }
    isTransparent() {
        return false;
    }
    get form() {
        return this;
    }
    get ruleEngine() {
        return this._ruleEngine;
    }
    getUniqueId(id) {
        if (id && !this._idSet?.has(id)) {
            this._idSet?.add(id);
            return id;
        }
        if (this._ids == null) {
            return '';
        }
        const newId = this._ids.next().value;
        this._idSet?.add(newId);
        return newId;
    }
    clearIdRegistry() {
        this._idSet?.clear();
    }
    fieldAdded(field) {
        if (field.fieldType === 'captcha' && !this._captcha) {
            this._captcha = field;
        }
        this._fields[field.id] = field;
        field.subscribe((action) => {
            if (this._invalidFields.indexOf(action.target.id) === -1) {
                this._invalidFields.push(action.target.id);
            }
        }, 'invalid');
        field.subscribe((action) => {
            const index = this._invalidFields.indexOf(action.target.id);
            if (index > -1) {
                this._invalidFields.splice(index, 1);
            }
        }, 'valid');
        field.subscribe((action) => {
            const field = action.target.getState();
            if (action.payload.changes.length > 0 && field) {
                const shallowClone = (obj) => {
                    if (obj && typeof obj === 'object') {
                        if (Array.isArray(obj)) {
                            return obj.map(shallowClone);
                        }
                        else {
                            return { ...obj };
                        }
                    }
                    return obj;
                };
                const changes = action.payload.changes.map(({ propertyName, currentValue, prevValue }) => {
                    return {
                        propertyName,
                        currentValue: shallowClone(currentValue),
                        prevValue: shallowClone(prevValue)
                    };
                });
                const fieldChangedAction = new FieldChanged(changes, field, action.payload.eventSource);
                this.notifyDependents(fieldChangedAction);
            }
        });
    }
    visit(callBack) {
        this.traverseChild(this, callBack);
    }
    traverseChild(container, callBack) {
        container.items.forEach((field) => {
            if (field.isContainer) {
                this.traverseChild(field, callBack);
            }
            callBack(field);
        });
    }
    validate() {
        const validationErrors = super.validate();
        this.dispatch(new ValidationComplete(validationErrors));
        return validationErrors;
    }
    isValid() {
        return this._invalidFields.length === 0;
    }
    dispatch(action) {
        if (action.type === 'submit') {
            super.queueEvent(action);
            this._eventQueue.runPendingQueue();
        }
        else {
            super.dispatch(action);
        }
    }
    submit(action, context) {
        const validate_form = action?.payload?.validate_form;
        if (validate_form === false || this.validate().length === 0) {
            const payload = action?.payload || {};
            const successEventName = payload?.success ? payload?.success : 'submitSuccess';
            const failureEventName = payload?.error ? payload?.error : 'submitError';
            const formAction = payload.action || this.action;
            const metadata = payload.metadata || {
                'submitMetadata': this.exportSubmitMetaData()
            };
            const contentType = payload?.save_as || payload?.submit_as;
            submit(context, successEventName, failureEventName, contentType, payload?.data, formAction, metadata);
        }
    }
    save(action, context) {
        const payload = action?.payload || {};
        payload.save_as = 'multipart/form-data';
        payload.metadata = {
            'draftMetadata': {
                'lang': this.lang,
                'fd:draftId': this.properties['fd:draftId'] || ''
            }
        };
        payload.success = 'custom:saveSuccess';
        payload.error = 'custom:saveError';
        this.submit(action, context);
        this.subscribe((action) => {
            this._saveSuccess(action);
        }, 'saveSuccess');
    }
    _saveSuccess(action) {
        const draftId = action?.payload?.body?.draftId || '';
        const properties = this.properties;
        if (draftId && properties) {
            properties['fd:draftId'] = draftId;
        }
    }
    reset() {
        super.reset();
        this._invalidFields = [];
    }
    getElement(id) {
        if (id == this.id) {
            return this;
        }
        return this._fields[id];
    }
    get qualifiedName() {
        return '$form';
    }
    getEventQueue() {
        return this._eventQueue;
    }
    get name() {
        return '$form';
    }
    get value() {
        return null;
    }
    get id() {
        return this._jsonModel.id || '$form';
    }
    get title() {
        return this._jsonModel.title || '';
    }
    get captcha() {
        return this._captcha;
    }
}
function stringToNumber(str, language) {
    if (str === null) {
        return 0;
    }
    const n = +str;
    if (!isNaN(n)) {
        return n;
    }
    if (language) {
        const date = parseDefaultDate(str, language, true);
        if (date !== str) {
            return datetimeToNumber(date);
        }
    }
    return 0;
}
function getStringToNumberFn(locale) {
    if (locale == null) {
        const localeOptions = new Intl.DateTimeFormat().resolvedOptions();
        locale = localeOptions.locale;
    }
    return (str) => stringToNumber(str, locale);
}
class RuleEngine {
    _context;
    _globalNames = [
        '$form',
        '$field',
        '$event'
    ];
    customFunctions;
    debugInfo = [];
    dependencyTracking = true;
    constructor() {
        this.customFunctions = FunctionRuntime.getFunctions();
    }
    compileRule(rule, locale) {
        const formula = new Formula(this.customFunctions, getStringToNumberFn(locale), this.debugInfo);
        return { formula, ast: formula.compile(rule, this._globalNames) };
    }
    execute(node, data, globals, useValueOf = false, eString) {
        const { formula, ast } = node;
        const oldContext = this._context;
        this._context = globals;
        let res = undefined;
        try {
            res = formula.run(ast, data, 'en-US', globals);
        }
        catch (err) {
            this._context?.form?.logger?.error(err);
        }
        if (this.debugInfo.length) {
            this._context?.form?.logger?.warn(`Form rule expression string: ${eString}`);
            while (this.debugInfo.length > 0) {
                this._context?.form?.logger?.warn(this.debugInfo.pop());
            }
        }
        let finalRes = res;
        if (useValueOf) {
            if (typeof res === 'object' && res !== null) {
                finalRes = Object.getPrototypeOf(res).valueOf.call(res);
            }
        }
        this._context = oldContext;
        return finalRes;
    }
    trackDependency(subscriber, propertyName) {
        if (this.dependencyTracking && this._context && this._context.field !== undefined && this._context.field !== subscriber) {
            subscriber._addDependent(this._context.field, propertyName);
        }
    }
    setDependencyTracking(track) {
        this.dependencyTracking = track;
    }
    getDependencyTracking() {
        return this.dependencyTracking;
    }
}
class Fieldset extends Container {
    constructor(params, _options) {
        super(params, _options);
        if (_options.mode !== 'restore') {
            this._applyDefaults();
            this.queueEvent(new Initialize());
            this.queueEvent(new ExecuteRule());
        }
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            visible: true,
            required: false,
            label: {
                visible: true,
                richText: false
            }
        };
    }
    _applyDefaults() {
        super._applyDefaultsInModel();
        if (this._jsonModel.dataRef && this._jsonModel.type === undefined) {
            this._jsonModel.type = 'object';
        }
    }
    get type() {
        const ret = super.type;
        if (ret === 'array' || ret === 'object') {
            return ret;
        }
        return undefined;
    }
    get items() {
        return super.items ? super.items : [];
    }
    get value() {
        return this.getDataNode()?.$value;
    }
    get fieldType() {
        return 'panel';
    }
}
class InstanceManager extends Fieldset {
    get maxOccur() {
        return this._jsonModel.maxItems;
    }
    set maxOccur(m) {
        this.maxItems = m;
    }
    get minOccur() {
        return this.minItems;
    }
    addInstance(action) {
        return this.addItem(action);
    }
    removeInstance(action) {
        return this.removeItem(action);
    }
}
__decorate([
    dependencyTracked()
], InstanceManager.prototype, "maxOccur", null);
__decorate([
    dependencyTracked()
], InstanceManager.prototype, "minOccur", null);
const validTypes = ['string', 'number', 'integer', 'boolean', 'file', 'string[]', 'number[]', 'integer[]', 'boolean[]', 'file[]', 'array', 'object'];
class Field extends Scriptable {
    _ruleNodeReference = [];
    _hasValueBeenSet = false;
    get hasValueBeenSet() {
        return this._hasValueBeenSet;
    }
    constructor(params, _options) {
        super(params, _options);
        if (_options.mode !== 'restore') {
            this._applyDefaults();
            this.queueEvent(new Initialize());
            if (this.form.changeEventBehaviour === 'deps') {
                this.queueEvent(new Change({ changes: [] }));
            }
            else {
                this.queueEvent(new ExecuteRule());
            }
        }
    }
    _initialize() {
        super._initialize();
        this.setupRuleNode();
    }
    ruleNodeReference() {
        if (this.type?.endsWith('[]')) {
            this._ruleNodeReference = [];
        }
        else {
            this._ruleNodeReference = this;
        }
        return this._ruleNodeReference;
    }
    _getDefaults() {
        return {
            readOnly: false,
            enabled: true,
            visible: true,
            label: {
                visible: true,
                richText: false
            },
            required: false,
            type: this._getFallbackType()
        };
    }
    _getFallbackType() {
        const type = this._jsonModel.type;
        let finalType = type;
        if (typeof type !== 'string' || validTypes.indexOf(type) === -1) {
            const _enum = this.enum;
            finalType = typeof (_enum?.[0]);
            if (finalType === 'undefined' && typeof this._jsonModel.default !== 'undefined') {
                if (this._jsonModel.default instanceof Array && this._jsonModel.default.length > 0) {
                    finalType = `${typeof (this._jsonModel.default[0])}[]`;
                }
                else {
                    finalType = typeof (this._jsonModel.default);
                }
            }
            if (finalType.indexOf('undefined') === 0) {
                const typeMappings = {
                    'text-input': 'string',
                    'multiline-input': 'string',
                    'number-input': 'number',
                    'date-input': 'string',
                    'date-time': 'string',
                    'email': 'string',
                    'plain-text': 'string',
                    'image': 'string',
                    'checkbox': 'boolean'
                };
                finalType = typeMappings[this.fieldType];
            }
        }
        return finalType;
    }
    _applyDefaults() {
        super._applyDefaultsInModel();
        this.coerceParam('required', 'boolean');
        this.coerceParam('readOnly', 'boolean');
        this.coerceParam('enabled', 'boolean');
        const type = this._jsonModel.type;
        if (typeof type !== 'string' || validTypes.indexOf(type) === -1) {
            this._jsonModel.type = this._getFallbackType();
        }
        if (['plain-text', 'image'].indexOf(this.fieldType) === -1) {
            this._jsonModel.value = undefined;
        }
        else if (this.fieldType === 'image') {
            this._jsonModel.value = this._jsonModel?.properties?.['fd:repoPath'] ?? this._jsonModel.value;
        }
        else {
            this._jsonModel.default = this._jsonModel.default || this._jsonModel.value;
        }
        const value = this._jsonModel.value;
        if (value === undefined) {
            const typedRes = Constraints.type(this.getInternalType() || 'string', this._jsonModel.default);
            this._jsonModel.value = typedRes.value;
        }
        if (this._jsonModel.type !== 'string') {
            this.unset('emptyValue');
        }
        if (this._jsonModel.fieldType === undefined) {
            this.form.logger.debug('fieldType property is mandatory. Please ensure all the fields have a fieldType');
            if (this._jsonModel.viewType) {
                if (this._jsonModel.viewType.startsWith('custom:')) {
                    this.form.logger.error('viewType property has been removed. For custom types, use :type property');
                }
                else {
                    this.form.logger.error('viewType property has been removed. Use fieldType property');
                }
                this._jsonModel.fieldType = this._jsonModel.viewType;
            }
            else {
                this._jsonModel.fieldType = defaultFieldTypes(this._jsonModel);
            }
        }
        if (this._jsonModel.enum === undefined) {
            const type = this._jsonModel.type;
            if (type === 'boolean') {
                this._jsonModel.enum = [true, false];
            }
        }
        else {
            if (typeof this._jsonModel.enumNames === 'undefined') {
                this._jsonModel.enumNames = this._jsonModel.enum.map(_ => _.toString());
            }
            while (this._jsonModel.enumNames.length < this._jsonModel.enum.length) {
                this._jsonModel.enumNames.push(this._jsonModel.enum[this._jsonModel.enumNames.length].toString());
            }
        }
        const props = ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum'];
        if (this._jsonModel.type !== 'string') {
            if (this._jsonModel.fieldType === 'file-input') {
                this.unset('pattern', 'minLength', 'maxLength');
            }
            else {
                this.unset('format', 'pattern', 'minLength', 'maxLength');
            }
        }
        else if (this._jsonModel.fieldType === 'date-input') {
            this._jsonModel.format = 'date';
        }
        this.coerceParam('minLength', 'number');
        this.coerceParam('maxLength', 'number');
        if (this._jsonModel.type !== 'number' && this._jsonModel.format !== 'date' && this._jsonModel.format !== 'date-time' && this._jsonModel.type !== 'integer') {
            this.unset('step', ...props);
        }
        props.forEach(c => {
            this.coerceParam(c, this._jsonModel.type === 'integer' ? 'number' : this._jsonModel.type);
        });
        if (typeof this._jsonModel.step !== 'number') {
            this.coerceParam('step', 'number');
        }
    }
    unset(...props) {
        props.forEach(p => this._jsonModel[p] = undefined);
    }
    coerceParam(param, type) {
        const val = this._jsonModel[param];
        if (typeof val !== 'undefined' && typeof val !== type) {
            this.form.logger.info(`${param} is not of type ${type}. Trying to coerce.`);
            try {
                this._jsonModel[param] = coerceType(val, type);
            }
            catch (e) {
                this.form.logger.warn(e);
                this.unset(param);
            }
        }
    }
    get editFormat() {
        return this.withCategory(this._jsonModel.editFormat);
    }
    get displayFormat() {
        return this.withCategory(this._jsonModel.displayFormat);
    }
    get displayValueExpression() {
        return this._jsonModel.displayValueExpression;
    }
    get placeholder() {
        return this._jsonModel.placeholder;
    }
    get readOnly() {
        if (this.parent.readOnly !== undefined) {
            return this.parent.readOnly === true ? true : this._jsonModel.readOnly;
        }
        else {
            return this._jsonModel.readOnly;
        }
    }
    set readOnly(e) {
        this._setProperty('readOnly', e);
    }
    get enabled() {
        const parentEnabled = this.parent?.enabled;
        if (parentEnabled !== undefined) {
            return parentEnabled ? this._jsonModel.enabled : false;
        }
        return this._jsonModel.enabled;
    }
    set enabled(e) {
        this._setProperty('enabled', e);
    }
    get valid() {
        return this._jsonModel?.validity?.valid;
    }
    set valid(e) {
        const validity = {
            valid: e,
            ...(e ? {} : { customConstraint: true })
        };
        this._setProperty('valid', e);
        this._setProperty('validity', validity);
    }
    get validity() {
        return this._jsonModel.validity;
    }
    get emptyValue() {
        if (this._jsonModel.emptyValue === 'null') {
            return null;
        }
        else if (this._jsonModel.emptyValue === '' && this.type === 'string') {
            return '';
        }
        else {
            return undefined;
        }
    }
    get enum() {
        return this._jsonModel.enum;
    }
    set enum(e) {
        this._setProperty('enum', e);
    }
    get enumNames() {
        return this._jsonModel.enumNames;
    }
    set enumNames(e) {
        this._setProperty('enumNames', e);
    }
    get required() {
        return this._jsonModel.required || false;
    }
    set required(r) {
        this._setProperty('required', r);
    }
    get maximum() {
        if (this.type === 'number' || this.format === 'date' || this.format === 'date-time' || this.type === 'integer') {
            return this._jsonModel.maximum;
        }
    }
    set maximum(m) {
        if (this.type === 'number' || this.format === 'date' || this.format === 'date-time' || this.type === 'integer') {
            this._setProperty('maximum', m);
        }
    }
    get minimum() {
        if (this.type === 'number' || this.format === 'date' || this.format === 'date-time' || this.type === 'integer') {
            return this._jsonModel.minimum;
        }
    }
    set minimum(m) {
        if (this.type === 'number' || this.format === 'date' || this.format === 'date-time' || this.type === 'integer') {
            this._setProperty('minimum', m);
        }
    }
    withCategory(df) {
        if (df) {
            const hasCategory = df?.match(/^(?:date|num)\|/);
            if (hasCategory === null) {
                if (this.format === 'date') {
                    df = `date|${df}`;
                }
                else if (this.type === 'number' || this.type === 'integer') {
                    df = `num|${df}`;
                }
                return df;
            }
        }
        return df;
    }
    get editValue() {
        const df = this.editFormat;
        if (df && this.isNotEmpty(this.value) && this.valid !== false) {
            try {
                return format(this.value, this.lang, df);
            }
            catch (e) {
                return this.value;
            }
        }
        else {
            return this.value;
        }
    }
    get displayValue() {
        if (this.displayValueExpression && typeof this.displayValueExpression === 'string' && this.displayValueExpression.length !== 0) {
            return this.executeExpression(this.displayValueExpression);
        }
        const df = this.displayFormat;
        if (df && this.isNotEmpty(this.value) &&
            this?.validity?.typeMismatch !== true &&
            ((this.format === 'date' || this.format === 'date-time') ? this?.validity?.formatMismatch !== true : true)) {
            try {
                return format(this.value, this.lang, df);
            }
            catch (e) {
                return this.value;
            }
        }
        else {
            return this.value;
        }
    }
    getDataNodeValue(typedValue) {
        return this.isEmpty() ? this.emptyValue : typedValue;
    }
    updateDataNodeAndTypedValue(val) {
        const dataNode = this.getDataNode();
        if (staticFields.indexOf(this.fieldType) > -1 && typeof dataNode !== 'undefined' && dataNode !== NullDataValue) {
            return;
        }
        const Constraints = this._getConstraintObject();
        const typeRes = Constraints.type(this.getInternalType() || 'string', val);
        const changes = this._setProperty('value', typeRes.value, false);
        if (changes.length > 0) {
            this._hasValueBeenSet = true;
            this._updateRuleNodeReference(typeRes.value);
            if (typeof dataNode !== 'undefined') {
                dataNode.setValue(this.getDataNodeValue(this._jsonModel.value), this._jsonModel.value, this);
            }
        }
        return changes;
    }
    get value() {
        if (this._jsonModel.value === undefined) {
            return null;
        }
        else {
            return this._jsonModel.value;
        }
    }
    set value(v) {
        const changes = this.updateDataNodeAndTypedValue(v);
        let uniqueRes = { valid: true };
        let constraint = 'type';
        if (changes?.length > 0) {
            let updates = {};
            const typeRes = Constraints.type(this.getInternalType() || 'string', v);
            if (this.parent.uniqueItems && this.parent.type === 'array') {
                uniqueRes = Constraints.uniqueItems(this.parent.uniqueItems, this.parent.getDataNode().$value);
                constraint = 'uniqueItems';
            }
            if (typeRes.valid && uniqueRes.valid) {
                updates = this.evaluateConstraints();
            }
            else {
                const valid = typeRes.valid && uniqueRes.valid;
                const changes = {
                    valid,
                    'errorMessage': typeRes.valid && uniqueRes.valid ? '' : this.getErrorMessage('type'),
                    ...(valid ? {} : {
                        'validationMessage': valid ? '' : this.getErrorMessage(constraint),
                        'validity': {
                            valid,
                            [constraintKeys[constraint]]: true
                        }
                    })
                };
                updates = this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], changes);
            }
            if (updates.valid) {
                this.triggerValidationEvent(updates);
            }
            const changeAction = new Change({ changes: changes.concat(Object.values(updates)), eventSource: this._eventSource });
            this.dispatch(changeAction);
        }
    }
    uiChange(action) {
        this._eventSource = EventSource.UI;
        if ('value' in action.payload) {
            this.value = action.payload.value;
        }
        else if ('checked' in action.payload) {
            this.checked = action.payload.checked;
        }
        this._eventSource = EventSource.CODE;
    }
    reset() {
        const changes = this.updateDataNodeAndTypedValue(this.default);
        if (!changes) {
            return;
        }
        const validationStateChanges = {
            'valid': undefined,
            'errorMessage': '',
            'validationMessage': '',
            'validity': {
                valid: undefined
            }
        };
        const updates = this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], validationStateChanges);
        const changeAction = new Change({ changes: changes.concat(Object.values(updates)) });
        this.dispatch(changeAction);
    }
    _updateRuleNodeReference(value) {
        if (this.type?.endsWith('[]')) {
            if (value != null) {
                value.forEach((val, index) => {
                    this._ruleNodeReference[index] = val;
                });
                while (value.length !== this._ruleNodeReference.length) {
                    this._ruleNodeReference.pop();
                }
            }
            else {
                while (this._ruleNodeReference.length !== 0) {
                    this._ruleNodeReference.pop();
                }
            }
        }
    }
    getInternalType() {
        return this.type;
    }
    valueOf() {
        const obj = this[target];
        const actualField = obj === undefined ? this : obj;
        actualField.ruleEngine.trackDependency(actualField, 'value');
        return actualField._jsonModel.value || null;
    }
    toString() {
        const obj = this[target];
        const actualField = obj === undefined ? this : obj;
        return actualField._jsonModel.value?.toString() || '';
    }
    getErrorMessage(constraint) {
        const afConstraintKey = constraint;
        const html5ConstraintType = constraintKeys[afConstraintKey];
        const constraintTypeMessages = getConstraintTypeMessages();
        return this._jsonModel.constraintMessages?.[afConstraintKey === 'exclusiveMaximum' ? 'maximum' :
            afConstraintKey === 'exclusiveMinimum' ? 'minimum' :
                afConstraintKey]
            || replaceTemplatePlaceholders(constraintTypeMessages[html5ConstraintType], [this._jsonModel[afConstraintKey]]);
    }
    get errorMessage() {
        return this._jsonModel.errorMessage;
    }
    set errorMessage(e) {
        this._setProperty('errorMessage', e);
        this._setProperty('validationMessage', e);
    }
    set constraintMessage(constraint) {
        if (Array.isArray(constraint)) {
            const updatedConstraintMessages = {
                ...this._jsonModel.constraintMessages
            };
            constraint.forEach(({ type, message }) => {
                updatedConstraintMessages[type] = message;
            });
            this._setProperty('constraintMessages', updatedConstraintMessages);
        }
        else {
            const updatedConstraintMessages = {
                ...this._jsonModel.constraintMessages,
                [constraint.type]: constraint.message
            };
            this._setProperty('constraintMessages', updatedConstraintMessages);
        }
    }
    _getConstraintObject() {
        return Constraints;
    }
    isArrayType() {
        return this.type ? this.type.indexOf('[]') > -1 : false;
    }
    checkEnum(value, constraints) {
        if (this._jsonModel.enforceEnum === true && value != null) {
            const fn = constraints.enum;
            if (value instanceof Array && this.isArrayType()) {
                return value.every(x => fn(this._jsonModel.enum || [], x).valid);
            }
            else {
                return fn(this._jsonModel.enum || [], value).valid;
            }
        }
        return true;
    }
    checkStep() {
        const value = this._jsonModel.value;
        const step = this._jsonModel.step;
        if (typeof step === 'number') {
            const prec = step.toString().split('.')?.[1]?.length || 0;
            const factor = Math.pow(10, prec);
            const fStep = step * factor;
            const fVal = value * factor;
            const iv = this._jsonModel.minimum || this._jsonModel.default || 0;
            const fIVal = iv * factor;
            const qt = (fVal - fIVal) / fStep;
            const valid = Math.abs(fVal - fIVal) % fStep < .001;
            let next, prev;
            if (!valid) {
                next = (Math.ceil(qt) * fStep + fIVal) / factor;
                prev = (next - fStep) / factor;
            }
            return {
                valid,
                next,
                prev
            };
        }
        return {
            valid: true
        };
    }
    checkValidationExpression() {
        const validationExp = this._jsonModel.validationExpression;
        if (typeof validationExp === 'string' && validationExp.length !== 0) {
            return this.executeExpression(validationExp);
        }
        return true;
    }
    getConstraints() {
        switch (this.type) {
            case 'string':
                switch (this.format) {
                    case 'date':
                        return ValidConstraints.date;
                    case 'date-time':
                        return ValidConstraints.datetime;
                    case 'email':
                        return ValidConstraints.email;
                    case 'binary':
                        return ValidConstraints.file;
                    case 'data-url':
                        return ValidConstraints.file;
                    default:
                        return ValidConstraints.string;
                }
            case 'file':
                return ValidConstraints.file;
            case 'number':
            case 'integer':
                return ValidConstraints.number;
        }
        if (this.isArrayType()) {
            return ValidConstraints.array;
        }
        return [];
    }
    get format() {
        if (typeof this._jsonModel.format === 'undefined') {
            if (this.type === 'string') {
                switch (this.fieldType) {
                    case 'date-input':
                        this._jsonModel.format = 'date';
                        break;
                    case 'date-time':
                        this._jsonModel.format = 'date-time';
                        break;
                }
            }
        }
        return this._jsonModel.format;
    }
    get enforceEnum() {
        return this._jsonModel.enforceEnum;
    }
    get tooltip() {
        return this._jsonModel.tooltip;
    }
    get maxLength() {
        return this._jsonModel.maxLength;
    }
    get minLength() {
        return this._jsonModel.minLength;
    }
    get pattern() {
        return this._jsonModel.pattern;
    }
    get step() {
        if (this.type === 'number' || this.format === 'date') {
            return this._jsonModel.step;
        }
    }
    get exclusiveMinimum() {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            return this._jsonModel.exclusiveMinimum;
        }
    }
    set exclusiveMinimum(eM) {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            this._jsonModel.exclusiveMinimum = eM;
        }
    }
    get exclusiveMaximum() {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            return this._jsonModel.exclusiveMaximum;
        }
    }
    set exclusiveMaximum(eM) {
        if (this.type === 'number' || this.format === 'date' || this.type === 'integer') {
            this._jsonModel.exclusiveMaximum = eM;
        }
    }
    get default() {
        return this._jsonModel.default;
    }
    isNotEmpty(value) {
        return value != null && value !== '';
    }
    evaluateConstraints() {
        let constraint = 'type';
        const elem = this._jsonModel;
        const value = this._jsonModel.value;
        const Constraints = this._getConstraintObject();
        const supportedConstraints = this.getConstraints();
        let valid = true;
        if (valid) {
            valid = Constraints.required(this.required, value).valid &&
                (this.isArrayType() && this.required ? value.length > 0 : true);
            constraint = 'required';
        }
        if (valid && this.isNotEmpty(value)) {
            const invalidConstraint = supportedConstraints.find(key => {
                if (key in elem && elem[key] !== undefined) {
                    const restriction = elem[key];
                    const fn = Constraints[key];
                    if (value instanceof Array && this.isArrayType()) {
                        if (ValidConstraints.array.indexOf(key) !== -1) {
                            return !fn(restriction, value).valid;
                        }
                        else {
                            return value.some(x => !(fn(restriction, x).valid));
                        }
                    }
                    else if (typeof fn === 'function') {
                        return !fn(restriction, value).valid;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            if (invalidConstraint != null) {
                valid = false;
                constraint = invalidConstraint;
            }
            else {
                valid = this.checkEnum(value, Constraints);
                constraint = 'enum';
                if (valid && this.type === 'number') {
                    valid = this.checkStep().valid;
                    constraint = 'step';
                }
                if (valid) {
                    valid = this.checkValidationExpression();
                    constraint = 'validationExpression';
                }
            }
        }
        if (!valid) {
            this.form.logger.info(`${constraint} constraint evaluation failed ${this._jsonModel[constraint]}. Received ${this._jsonModel.value}`);
        }
        const changes = {
            'valid': valid,
            'errorMessage': valid ? '' : this.getErrorMessage(constraint),
            ...({
                'validationMessage': valid ? '' : this.getErrorMessage(constraint),
                'validity': {
                    valid,
                    ...(valid ? {} : { [constraintKeys[constraint]]: true })
                }
            })
        };
        return this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], changes);
    }
    triggerValidationEvent(changes) {
        if (changes.validity) {
            this.#triggerValidationEvent();
        }
    }
    #triggerValidationEvent() {
        if (this.validity.valid) {
            this.dispatch(new Valid());
        }
        else {
            this.dispatch(new Invalid());
        }
    }
    validate() {
        if (this.visible === false) {
            return [];
        }
        if (this.valid === false && this.errorMessage && this?.validity?.customConstraint) {
            return [new ValidationError(this.id, [this._jsonModel.errorMessage])];
        }
        const changes = this.evaluateConstraints();
        this.#triggerValidationEvent();
        if (changes.validity) {
            this.notifyDependents(new Change({ changes: Object.values(changes) }));
        }
        return this.valid ? [] : [new ValidationError(this.id, [this._jsonModel.errorMessage])];
    }
    syncDataAndFormModel(dataNode) {
        if (dataNode !== undefined && dataNode !== NullDataValue && dataNode.$value !== this._jsonModel.value) {
            const changeAction = propertyChange('value', dataNode.$value, this._jsonModel.value);
            this._jsonModel.value = dataNode.$value;
            this.queueEvent(changeAction);
        }
    }
    defaultDataModel(name) {
        const value = staticFields.indexOf(this.fieldType) > -1 ? undefined : this.getDataNodeValue(this._jsonModel.value);
        return new DataValue(name, value, this.type || 'string');
    }
    getState(isRepeatableChild = false, forRestore = false) {
        return {
            ...super.getState(forRestore),
            editFormat: this.editFormat,
            displayFormat: this.displayFormat,
            editValue: this.editValue,
            displayValue: this.displayValue,
            enabled: this.enabled,
            readOnly: this.readOnly
        };
    }
    markAsInvalid(message, constraint = null) {
        const changes = {
            'valid': false,
            'errorMessage': message,
            'validationMessage': message,
            'validity': {
                valid: false,
                ...(constraint != null ? { [constraintKeys[constraint]]: true } : { customConstraint: true })
            }
        };
        const updates = this._applyUpdates(['valid', 'errorMessage', 'validationMessage', 'validity'], changes);
        const changeAction = new Change({ changes: [].concat(Object.values(updates)) });
        if (changeAction.payload.changes.length !== 0) {
            this.triggerValidationEvent(updates);
            this.dispatch(changeAction);
        }
    }
}
__decorate([
    dependencyTracked(),
    exclude('button', 'image', 'plain-text')
], Field.prototype, "readOnly", null);
__decorate([
    dependencyTracked(),
    exclude('image', 'plain-text')
], Field.prototype, "enabled", null);
__decorate([
    dependencyTracked()
], Field.prototype, "valid", null);
__decorate([
    dependencyTracked()
], Field.prototype, "validity", null);
__decorate([
    dependencyTracked()
], Field.prototype, "enum", null);
__decorate([
    dependencyTracked()
], Field.prototype, "enumNames", null);
__decorate([
    dependencyTracked()
], Field.prototype, "required", null);
__decorate([
    include('date-input', 'number-input')
], Field.prototype, "editValue", null);
__decorate([
    dependencyTracked()
], Field.prototype, "value", null);
__decorate([
    dependencyTracked()
], Field.prototype, "errorMessage", null);
__decorate([
    include('text-input', 'date-input', 'file-input', 'email', 'datetime-input')
], Field.prototype, "format", null);
__decorate([
    include('text-input')
], Field.prototype, "maxLength", null);
__decorate([
    include('text-input')
], Field.prototype, "minLength", null);
__decorate([
    include('text-input')
], Field.prototype, "pattern", null);
__decorate([
    dependencyTracked()
], Field.prototype, "exclusiveMinimum", null);
__decorate([
    dependencyTracked()
], Field.prototype, "exclusiveMaximum", null);
function addNameToDataURL(dataURL, name) {
    return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}
function processFiles(files) {
    return Promise.all([].map.call(files, processFile));
}
async function processFile(file) {
    const { name, size, type } = file;
    const fileObj = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
            resolve(new FileObject({
                data: addNameToDataURL(event.target.result, name),
                type,
                name,
                size
            }));
        };
        reader.readAsDataURL(file.data);
    });
    return fileObj;
}
class FileUpload extends Field {
    _getDefaults() {
        return {
            ...super._getDefaults(),
            accept: ['audio/*', 'video/*', 'image/*', 'text/*', 'application/pdf'],
            maxFileSize: '2MB'
        };
    }
    _getFallbackType() {
        return 'file';
    }
    get maxFileSize() {
        return getFileSizeInBytes(this._jsonModel.maxFileSize);
    }
    get accept() {
        return this._jsonModel.accept;
    }
    _applyUpdates(propNames, updates) {
        return propNames.reduce((acc, propertyName) => {
            const prevValue = this._jsonModel[propertyName];
            const currentValue = updates[propertyName];
            if (currentValue !== prevValue) {
                acc[propertyName] = {
                    propertyName,
                    currentValue,
                    prevValue
                };
                if (prevValue instanceof FileObject && typeof currentValue === 'object' && propertyName === 'value') {
                    this._jsonModel[propertyName] = new FileObject({ ...prevValue, ...{ 'data': currentValue.data } });
                }
                else {
                    this._jsonModel[propertyName] = currentValue;
                }
            }
            return acc;
        }, {});
    }
    getInternalType() {
        return this.type?.endsWith('[]') ? 'file[]' : 'file';
    }
    getDataNodeValue(typedValue) {
        let dataNodeValue = typedValue;
        if (dataNodeValue != null) {
            if (this.type === 'string') {
                dataNodeValue = dataNodeValue.data?.toString();
            }
            else if (this.type === 'string[]') {
                dataNodeValue = dataNodeValue instanceof Array ? dataNodeValue : [dataNodeValue];
                dataNodeValue = dataNodeValue.map((_) => _?.data?.toString());
            }
        }
        return dataNodeValue;
    }
    async serialize() {
        const val = this._jsonModel.value;
        if (val === undefined) {
            return null;
        }
        const filesInfo = await processFiles(val instanceof Array ? val : [val]);
        return filesInfo;
    }
    syncDataAndFormModel(dataNode) {
        if (dataNode !== undefined && dataNode !== NullDataValue) {
            const value = dataNode?.$value;
            if (value != null) {
                const res = Constraints.type(this.getInternalType(), value);
                if (!res.valid) {
                    this.form.logger.debug(`unable to bind ${this.name} to data`);
                }
                this.form.getEventQueue().queue(this, propertyChange('value', res.value, this._jsonModel.value));
                this._jsonModel.value = res.value;
            }
            else {
                this._jsonModel.value = null;
            }
        }
    }
}
const requiredConstraint = (offValue) => (constraint, value) => {
    const valid = Constraints.required(constraint, value).valid && (!constraint || value != offValue);
    return { valid, value };
};
class Checkbox extends Field {
    offValue() {
        const opts = this.enum;
        return opts.length > 1 ? opts[1] : null;
    }
    _getConstraintObject() {
        const baseConstraints = { ...super._getConstraintObject() };
        baseConstraints.required = requiredConstraint(this.offValue());
        return baseConstraints;
    }
    _applyDefaults() {
        if (typeof this._jsonModel.checked === 'boolean') {
            if (this._jsonModel.checked) {
                this._jsonModel.default = this._jsonModel.enum?.[0];
            }
            else {
                this._jsonModel.default = this._jsonModel.enum?.[1];
            }
        }
        super._applyDefaults();
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true
        };
    }
    get enum() {
        return this._jsonModel.enum || [];
    }
    updateDataNodeAndTypedValue(val) {
        const changes = super.updateDataNodeAndTypedValue(val);
        const valueChange = changes.find((c) => c.propertyName === 'value');
        if (valueChange) {
            const oldChecked = valueChange.prevValue === this._jsonModel.enum?.[0];
            const newChecked = valueChange.currentValue === this._jsonModel.enum?.[0];
            if (oldChecked !== newChecked) {
                changes.push({
                    propertyName: 'checked',
                    prevValue: oldChecked,
                    currentValue: newChecked
                });
            }
        }
        return changes;
    }
    set checked(check) {
        if (check) {
            this.value = this._jsonModel.enum?.[0];
        }
        else {
            this.value = this._jsonModel.enum?.[1];
        }
    }
    get checked() {
        return this.value === this._jsonModel.enum?.[0];
    }
    getState(isRepeatableChild = false, forRestore = false) {
        return {
            ...super.getState(isRepeatableChild, forRestore),
            checked: this.checked
        };
    }
}
__decorate([
    dependencyTracked()
], Checkbox.prototype, "checked", null);
class CheckboxGroup extends Field {
    constructor(params, _options) {
        super(params, _options);
    }
    _getFallbackType() {
        const fallbackType = super._getFallbackType();
        if (typeof fallbackType === 'string') {
            return `${fallbackType}[]`;
        }
        else {
            return 'string[]';
        }
    }
    _getDefaults() {
        return {
            ...super._getDefaults(),
            enforceEnum: true,
            enum: []
        };
    }
}
class DateField extends Field {
    locale;
    _dataFormat = 'yyyy-MM-dd';
    _applyDefaults() {
        super._applyDefaults();
        this.locale = new Intl.DateTimeFormat().resolvedOptions().locale;
        if (!this._jsonModel.editFormat) {
            this._jsonModel.editFormat = 'short';
        }
        if (!this._jsonModel.displayFormat) {
            this._jsonModel.displayFormat = this._jsonModel.editFormat;
        }
        if (!this._jsonModel.placeholder) {
            this._jsonModel.placeholder = parseDateSkeleton(this._jsonModel.editFormat, this.locale);
        }
    }
    #convertNumberToDate(value) {
        const coercedValue = numberToDatetime(value);
        if (!isNaN(coercedValue)) {
            return formatDate(coercedValue, this.locale, this._dataFormat);
        }
        return null;
    }
    get value() {
        return super.value;
    }
    set value(value) {
        if (typeof value === 'number') {
            const coercedValue = this.#convertNumberToDate(value);
            if (coercedValue) {
                super.value = coercedValue;
            }
        }
        else {
            if (this._jsonModel.editFormat !== 'short' && this._jsonModel.editFormat !== 'date|short') {
                const parsedDate = parseDate(value, this.locale, this._jsonModel.editFormat) || parseDate(value, this.locale, 'yyyy-MM-dd');
                if (parsedDate instanceof Date) {
                    super.value = formatDate(parsedDate, this.locale, this._dataFormat);
                }
                else {
                    super.value = value;
                }
            }
            else {
                super.value = value;
            }
        }
    }
    get minimum() {
        return super.minimum;
    }
    set minimum(value) {
        if (typeof value === 'number') {
            const coercedValue = this.#convertNumberToDate(value);
            if (coercedValue) {
                super.minimum = coercedValue;
            }
        }
        else if (typeof value === 'string') {
            super.minimum = value;
        }
    }
    get maximum() {
        return super.maximum;
    }
    set maximum(value) {
        if (typeof value === 'number') {
            const coercedValue = this.#convertNumberToDate(value);
            if (coercedValue) {
                super.maximum = coercedValue;
            }
        }
        else if (typeof value === 'string') {
            super.maximum = value;
        }
    }
}
class DateTimeField extends DateField {
    _dataFormat = 'yyyy-MM-ddTHH:mm';
    _applyDefaults() {
        super._applyDefaults();
    }
    get value() {
        return super.value;
    }
    set value(value) {
        super.value = value;
    }
}
class EmailInput extends Field {
    _getDefaults() {
        return {
            ...super._getDefaults(),
            format: 'email'
        };
    }
}
class Captcha extends Field {
    _captchaDisplayMode;
    _captchaProvider;
    _captchaSiteKey;
    constructor(params, _options) {
        super(params, _options);
        this._captchaDisplayMode = params.captchaDisplayMode;
        this._captchaProvider = params.captchaProvider;
        this._captchaSiteKey = params.captchaSiteKey;
    }
    getDataNode() {
        return undefined;
    }
    custom_setProperty(action) {
        this.applyUpdates(action.payload);
    }
    get captchaDisplayMode() {
        return this._captchaDisplayMode;
    }
    get captchaProvider() {
        return this._captchaProvider;
    }
    get captchaSiteKey() {
        return this._captchaSiteKey;
    }
}
class Button extends Field {
    click() {
        if (this._events?.click || !this._jsonModel.buttonType) {
            return;
        }
        if (this._jsonModel.buttonType === 'submit') {
            return this.form.dispatch(new Submit({ validate_form: true }));
        }
        if (this._jsonModel.buttonType === 'reset') {
            return this.form.dispatch(new Reset());
        }
    }
}
const alternateFieldTypeMapping = {
    'text': 'text-input',
    'number': 'number-input',
    'email': 'email',
    'file': 'file-input',
    'range': 'range',
    'textarea': 'multiline-input'
};
class FormFieldFactoryImpl {
    createField(child, _options) {
        let retVal;
        const options = {
            ..._options,
            fieldFactory: this
        };
        child.fieldType = child.fieldType ? (child.fieldType in alternateFieldTypeMapping ?
            alternateFieldTypeMapping[child.fieldType] : child.fieldType)
            : 'text-input';
        if (isRepeatable$1(child)) {
            const newChild = {
                ...child,
                ...('items' in child && { 'type': 'object' }),
                minOccur: undefined,
                maxOccur: undefined,
                repeatable: undefined,
                name: undefined
            };
            const newJson = {
                ...{
                    minItems: child.minOccur || 0,
                    maxItems: child.maxOccur || -1,
                    fieldType: child.fieldType,
                    type: 'array',
                    name: child.name,
                    dataRef: child.dataRef,
                    events: {
                        'custom:setProperty': '$event.payload'
                    }
                },
                ...{
                    'items': [newChild]
                }
            };
            retVal = new InstanceManager(newJson, options);
        }
        else if ('items' in child || child.fieldType === 'panel') {
            retVal = new Fieldset(child, options);
        }
        else {
            if (isFile(child) || child.fieldType === 'file-input') {
                retVal = new FileUpload(child, options);
            }
            else if (isCheckbox(child)) {
                retVal = new Checkbox(child, options);
            }
            else if (isCheckboxGroup(child)) {
                retVal = new CheckboxGroup(child, options);
            }
            else if (isEmailInput(child)) {
                retVal = new EmailInput(child, options);
            }
            else if (isDateField(child)) {
                retVal = new DateField(child, options);
            }
            else if (isDateTimeField(child)) {
                retVal = new DateTimeField(child, options);
            }
            else if (isCaptcha(child)) {
                retVal = new Captcha(child, options);
            }
            else if (isButton(child)) {
                retVal = new Button(child, options);
            }
            else {
                retVal = new Field(child, options);
            }
        }
        return retVal;
    }
}
const FormFieldFactory = new FormFieldFactoryImpl();
const createFormInstanceHelper = (formModel, logLevel, fModel) => {
    let f = fModel;
    if (f == null) {
        formModel = sitesModelToFormModel(formModel);
        f = new Form({ ...formModel }, FormFieldFactory, new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel);
    }
    const formData = formModel?.data;
    if (formData) {
        f.importData(formData);
    }
    return f;
};
const createFormInstance = (formModel, callback, logLevel = 'error', fModel = undefined) => {
    try {
        const f = createFormInstanceHelper(formModel, logLevel, fModel);
        if (typeof callback === 'function') {
            callback(f);
        }
        f.getEventQueue().runPendingQueue();
        return f;
    }
    catch (e) {
        console.error(`Unable to create an instance of the Form ${e}`);
        throw new Error(e);
    }
};
const createFormInstanceSync = async (formModel, callback, logLevel = 'error', fModel = undefined) => {
    try {
        const f = createFormInstanceHelper(formModel, logLevel, fModel);
        if (typeof callback === 'function') {
            callback(f);
        }
        f.getEventQueue().runPendingQueue();
        await f.waitForPromises();
        return f;
    }
    catch (e) {
        console.error(`Unable to create an instance of the Form ${e}`);
        throw new Error(e);
    }
};
createFormInstance.currentVersion = currentVersion;
const defaultOptions = {
    logLevel: 'error'
};
const restoreFormInstance = (formModel, data = null, { logLevel } = defaultOptions) => {
    try {
        const form = new Form({ ...formModel }, FormFieldFactory, new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel, 'restore');
        if (data) {
            form.bindToDataModel(new DataGroup('$form', data));
            form.syncDataAndFormModel(form.getDataNode());
        }
        form.getEventQueue().empty();
        return form;
    }
    catch (e) {
        console.error(`Unable to restore an instance of the Form ${e}`);
        throw new Error(e);
    }
};
const validateFormInstance = (formModel, data) => {
    try {
        const f = new Form({ ...formModel }, FormFieldFactory, new RuleEngine());
        if (data) {
            f.importData(data);
        }
        return f.validate().length === 0;
    }
    catch (e) {
        throw new Error(e);
    }
};
const validateFormData = (formModel, data) => {
    try {
        const f = new Form({ ...formModel }, FormFieldFactory, new RuleEngine());
        if (data) {
            f.importData(data);
        }
        const res = f.validate();
        return {
            messages: res,
            valid: res.length === 0
        };
    }
    catch (e) {
        throw new Error(e);
    }
};
const fetchForm = (url, headers = {}) => {
    const headerObj = new Headers();
    Object.entries(headers).forEach(([key, value]) => {
        headerObj.append(key, value);
    });
    return new Promise((resolve, reject) => {
        request$1(`${url}.model.json`, null, { headers }).then((response) => {
            if (response.status !== 200) {
                reject('Not Found');
            }
            else {
                let formObj = response.body;
                if ('model' in formObj) {
                    const { model } = formObj;
                    formObj = model;
                }
                resolve(jsonString(formObj));
            }
        }).catch((error) => {
            reject(`Network error: ${error.message || error}`);
        });
    });
};
const registerFunctions = (functions) => {
    FunctionRuntime.registerFunctions(functions);
};

export { createFormInstance, createFormInstanceSync, fetchForm, registerFunctions, restoreFormInstance, validateFormData, validateFormInstance };
