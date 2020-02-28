"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class KeysHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/keys');
    }
    getKeys(correlationId, filter, paging, callback) {
        this.callCommand('get_keys', correlationId, { filter: filter, paging: paging }, callback);
    }
    getKeyById(correlationId, keyId, callback) {
        this.callCommand('get_key_by_id', correlationId, {
            key_id: keyId
        }, callback);
    }
    getKeyByKey(correlationId, keyKey, callback) {
        this.callCommand('get_key_by_key', correlationId, {
            key: keyKey
        }, callback);
    }
    getKeysRangeByKey(correlationId, keyKey, number, callback) {
        this.callCommand('get_keys_range', correlationId, {
            key: keyKey,
            number: number
        }, callback);
    }
    createKey(correlationId, key, callback) {
        this.callCommand('create_key', correlationId, {
            key: key
        }, callback);
    }
    updateKey(correlationId, key, callback) {
        this.callCommand('update_key', correlationId, {
            key: key
        }, callback);
    }
    deleteKeyById(correlationId, keyId, callback) {
        this.callCommand('delete_key_by_id', correlationId, {
            key_id: keyId
        }, callback);
    }
}
exports.KeysHttpClientV1 = KeysHttpClientV1;
//# sourceMappingURL=KeysHttpClientV1.js.map