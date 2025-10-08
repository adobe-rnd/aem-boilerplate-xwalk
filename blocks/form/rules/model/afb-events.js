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
var EventSource;
(function (EventSource) {
    EventSource["CODE"] = "code";
    EventSource["UI"] = "ui";
})(EventSource || (EventSource = {}));
class ActionImpl {
    _metadata;
    _type;
    _payload;
    _target;
    _currentTarget;
    constructor(payload, type, _metadata) {
        this._metadata = _metadata;
        this._payload = payload;
        this._type = type;
    }
    get type() {
        return this._type;
    }
    get payload() {
        return this._payload;
    }
    get metadata() {
        return this._metadata;
    }
    get target() {
        return this._target;
    }
    get currentTarget() {
        return this._currentTarget;
    }
    get isCustomEvent() {
        return false;
    }
    payloadToJson() {
        return this.payload;
    }
    toJson() {
        return {
            payload: this.payloadToJson(),
            type: this.type,
            isCustomEvent: this.isCustomEvent
        };
    }
    toString() {
        return JSON.stringify(this.toJson());
    }
}
class Change extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'change', { dispatch });
    }
    withAdditionalChange(change) {
        return new Change(this.payload.changes.concat(change.payload.changes), this.metadata);
    }
}
class UIChange extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'uiChange', { dispatch });
    }
}
class Invalid extends ActionImpl {
    constructor(payload = {}) {
        super(payload, 'invalid', {});
    }
}
class Valid extends ActionImpl {
    constructor(payload = {}) {
        super(payload, 'valid', {});
    }
}
class ExecuteRule extends ActionImpl {
    constructor(payload = {}, dispatch = false) {
        super(payload, 'executeRule', { dispatch });
    }
}
const propertyChange = (propertyName, currentValue, prevValue) => {
    return new Change({
        changes: [
            {
                propertyName,
                currentValue,
                prevValue
            }
        ]
    });
};
class Initialize extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'initialize', { dispatch });
    }
}
class FormLoad extends ActionImpl {
    constructor() {
        super({}, 'load', { dispatch: false });
    }
}
class Click extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'click', { dispatch });
    }
}
class Blur extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'blur', { dispatch });
    }
}
class ValidationComplete extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'validationComplete', { dispatch });
    }
}
class Focus extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'focus', { dispatch });
    }
}
class Submit extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'submit', { dispatch });
    }
}
class Save extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'save', { dispatch });
    }
}
class SubmitSuccess extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'submitSuccess', { dispatch });
    }
}
class SubmitFailure extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'submitFailure', { dispatch });
    }
}
class SubmitError extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'submitError', { dispatch });
    }
}
class Reset extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'reset', { dispatch });
    }
}
class FieldChanged extends ActionImpl {
    constructor(changes, field, eventSource = EventSource.CODE) {
        super({
            field,
            changes,
            eventSource
        }, 'fieldChanged');
    }
}
class CustomEvent extends ActionImpl {
    constructor(eventName, payload = {}, dispatch = false) {
        super(payload, eventName, { dispatch });
    }
    get isCustomEvent() {
        return true;
    }
}
class AddItem extends ActionImpl {
    constructor(payload) {
        super(payload, 'addItem');
    }
}
class RemoveItem extends ActionImpl {
    constructor(payload) {
        super(payload, 'removeItem');
    }
}
class AddInstance extends ActionImpl {
    constructor(payload) {
        super(payload, 'addInstance');
    }
}
class RemoveInstance extends ActionImpl {
    constructor(payload) {
        super(payload, 'removeInstance');
    }
}
class RequestSuccess extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'requestSuccess', { dispatch });
    }
}
class RequestFailure extends ActionImpl {
    constructor(payload, dispatch = false) {
        super(payload, 'requestFailure', { dispatch });
    }
}

export { AddInstance, AddItem, Blur, Change, Click, CustomEvent, ExecuteRule, FieldChanged, Focus, FormLoad, Initialize, Invalid, RemoveInstance, RemoveItem, RequestFailure, RequestSuccess, Reset, Save, Submit, SubmitError, SubmitFailure, SubmitSuccess, UIChange, Valid, ValidationComplete, propertyChange };
