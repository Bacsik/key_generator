"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class KeysDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('keys', 'controller', '*', '*', '1.0'));
    }
    getKeys(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'keys.get_keys');
        this._controller.getKeys(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getKeyById(correlationId, keyId, callback) {
        let timing = this.instrument(correlationId, 'keys.get_key_by_id');
        this._controller.getKeyById(correlationId, keyId, (err, key) => {
            timing.endTiming();
            callback(err, key);
        });
    }
    nextKey(correlationId, key, number, callback) {
        let timing = this.instrument(correlationId, 'keys.get_keys_range');
        this._controller.nextKey(correlationId, key, number, (err, range) => {
            timing.endTiming();
            callback(err, range);
        });
    }
    createKey(correlationId, key, callback) {
        let timing = this.instrument(correlationId, 'keys.create_key');
        this._controller.createKey(correlationId, key, (err, key) => {
            timing.endTiming();
            callback(err, key);
        });
    }
    resetKey(correlationId, key, callback) {
        let timing = this.instrument(correlationId, 'keys.update_key');
        this._controller.resetKey(correlationId, key, (err, key) => {
            timing.endTiming();
            callback(err, key);
        });
    }
    deleteKeyById(correlationId, keyId, callback) {
        let timing = this.instrument(correlationId, 'keys.delete_key_by_id');
        this._controller.deleteKeyById(correlationId, keyId, (err, key) => {
            timing.endTiming();
            callback(err, key);
        });
    }
}
exports.KeysDirectClientV1 = KeysDirectClientV1;
//# sourceMappingURL=KeysDirectClientV1.js.map