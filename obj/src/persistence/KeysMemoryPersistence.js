"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
const KeyV1_1 = require("../data/version1/KeyV1");
class KeysMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let key = filter.getAsNullableString('key');
        let last_value = filter.getAsNullableInteger('last_value');
        return (item) => {
            if (key != null && item.id != key)
                return false;
            if (last_value != null && item.last_value != last_value)
                return false;
            return true;
        };
    }
    createKey(correlationId, key, callback) {
        let key_model = new KeyV1_1.KeyV1;
        key_model.id = key;
        key_model.last_value = 0;
        super.create(null, key_model, (err, item) => {
            if (item != null)
                this._logger.trace(correlationId, "Create key by %s", key);
            else
                this._logger.trace(correlationId, "Cannot create key by %s", key);
            callback(err, item);
        });
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneById(correlationId, key, callback) {
        let item = _.find(this._items, (item) => item.id == key);
        if (item != null)
            this._logger.trace(correlationId, "Found key by %s", key);
        else
            this._logger.trace(correlationId, "Cannot find key by %s", key);
        callback(null, item);
    }
    nextKey(correlationId, key, number, callback) {
        let item = _.find(this._items, (item) => item.id == key);
        if (item != null) {
            this._logger.trace(correlationId, "Found key by %s", key);
            if (number < 0)
                number = 5;
        }
        else
            this._logger.trace(correlationId, "Cannot find key by %s", key);
        callback(null, item);
        item.last_value = item.last_value + number;
    }
    resetKey(correlationId, key, callback) {
        let item = _.find(this._items, (item) => item.id == key);
        if (item != null) {
            item.last_value = 0;
            this._logger.trace(correlationId, "Reset key by %s", key);
        }
        else
            this._logger.trace(correlationId, "Cannot reset key by %s", key);
        callback(null, item);
    }
}
exports.KeysMemoryPersistence = KeysMemoryPersistence;
//# sourceMappingURL=KeysMemoryPersistence.js.map