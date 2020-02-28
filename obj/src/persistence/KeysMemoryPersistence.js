"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class KeysMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let key = filter.getAsNullableString('key');
        let last_value = filter.getAsNullableInteger('last_value');
        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (key != null && item.key != key)
                return false;
            if (last_value != null && item.last_value != last_value)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneById(correlationId, id, callback) {
        let item = _.find(this._items, (item) => item.id == id);
        if (item != null)
            this._logger.trace(correlationId, "Found key by %s", id);
        else
            this._logger.trace(correlationId, "Cannot find key by %s", id);
        callback(null, item);
    }
    getOneByKey(correlationId, key, callback) {
        let item = _.find(this._items, (item) => item.key == key);
        if (item != null)
            this._logger.trace(correlationId, "Found key by %s", key);
        else
            this._logger.trace(correlationId, "Cannot find key by %s", key);
        callback(null, item);
    }
    getRangeByKey(correlationId, key, number, callback) {
        let item = _.find(this._items, (item) => item.key == key);
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
}
exports.KeysMemoryPersistence = KeysMemoryPersistence;
//# sourceMappingURL=KeysMemoryPersistence.js.map