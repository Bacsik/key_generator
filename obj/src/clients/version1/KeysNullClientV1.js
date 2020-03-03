"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class KeysNullClientV1 {
    getKeys(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getKeyById(correlationId, keyId, callback) {
        callback(null, null);
    }
    nextKey(correlationId, key, number, callback) {
        callback(null, null);
    }
    createKey(correlationId, key, callback) {
        callback(null, null);
    }
    resetKey(correlationId, key, callback) {
        callback(null, null);
    }
    deleteKeyById(correlationId, keyId, callback) {
        callback(null, null);
    }
}
exports.KeysNullClientV1 = KeysNullClientV1;
//# sourceMappingURL=KeysNullClientV1.js.map