"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
const KeyV1_1 = require("../data/version1/KeyV1");
const KeysMongoDbSchema_1 = require("./KeysMongoDbSchema");
class KeysMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('keys', KeysMongoDbSchema_1.KeysMongoDbSchema());
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let key = filter.getAsNullableString('key');
        if (key != null)
            criteria.push({ _id: key });
        let last_value = filter.getAsNullableString('last_value');
        if (last_value != null)
            criteria.push({ last_value: last_value });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneById(correlationId, key, callback) {
        let criteria = {
            _id: key
        };
        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);
            if (item != null)
                this._logger.trace(correlationId, "Found key by %s", key);
            else
                this._logger.trace(correlationId, "Cannot find key by %s", key);
            callback(err, item);
        });
    }
    nextKey(correlationId, key, number, callback) {
        let criteria = {
            _id: key
        };
        if (number < 0)
            number = 5;
        this._model.findOneAndUpdate(criteria, { $inc: { last_value: number } }, (err, item) => {
            item = this.convertFromPublic(item);
            if (item != null)
                this._logger.trace(correlationId, "Get keys for %s", key);
            else
                this._logger.trace(correlationId, "Cannot find key by %s", key);
            callback(err, item);
        });
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
    resetKey(correlationId, key, callback) {
        let criteria = {
            _id: key
        };
        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);
            if (item != null) {
                item.last_value = 0;
                this._logger.trace(correlationId, "Reset key by %s", key);
            }
            else
                this._logger.trace(correlationId, "Cannot reset key by %s", key);
            callback(err, item);
        });
    }
}
exports.KeysMongoDbPersistence = KeysMongoDbPersistence;
//# sourceMappingURL=KeysMongoDbPersistence.js.map