"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const KeysCommandSet_1 = require("./KeysCommandSet");
class KeysController {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services3_commons_node_1.Descriptor('keys', 'persistence', '*', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new KeysCommandSet_1.KeysCommandSet(this);
        }
        return this._commandSet;
    }
    getKeys(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getKeyById(correlationId, keyId, callback) {
        this._persistence.getOneById(correlationId, keyId, callback);
    }
    nextKey(correlationId, keyKey, number, callback) {
        let last_value;
        let range;
        if (number < 0 || number == null)
            number = 5;
        async.series([
            (callback) => {
                this._persistence.nextKey(correlationId, keyKey, number, (err, key) => {
                    last_value = key ? key.last_value : null;
                    callback(err);
                });
            },
            (callback) => {
                range = Array(number).fill(0).map((e, i) => i + last_value + 1);
                callback();
            }
        ], (err) => { callback(err, range); });
    }
    createKey(correlationId, key, callback) {
        this._persistence.createKey(correlationId, key, callback);
    }
    resetKey(correlationId, key, callback) {
        this._persistence.resetKey(correlationId, key, callback);
    }
    deleteKeyById(correlationId, keyId, callback) {
        this._persistence.deleteById(correlationId, keyId, callback);
    }
}
exports.KeysController = KeysController;
//# sourceMappingURL=KeysController.js.map