"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
const KeysMongoDbSchema_1 = require("./KeysMongoDbSchema");
class KeysMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('keys', KeysMongoDbSchema_1.KeysMongoDbSchema());
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let key = filter.getAsNullableString('key');
        if (key != null)
            criteria.push({ key: key });
        let last_value = filter.getAsNullableString('last_value');
        if (last_value != null)
            criteria.push({ last_value: last_value });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneById(correlationId, id, callback) {
        let criteria = {
            _id: id
        };
        this._model.findOne(criteria, (err, item) => {
            item = this.convertFromPublic(item);
            if (item != null)
                this._logger.trace(correlationId, "Found key by %s", id);
            else
                this._logger.trace(correlationId, "Cannot find key by %s", id);
            callback(err, item);
        });
    }
    getOneByKey(correlationId, key, callback) {
        let criteria = {
            key: key
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
    getRangeByKey(correlationId, key, number, callback) {
        let criteria = {
            key: key
        };
        if (number < 0)
            number = 5;
        this._model.findOneAndUpdate(criteria, { $inc: { last_value: number } }, (err, item) => {
            item = this.convertFromPublic(item);
            callback(err, item);
        });
    }
}
exports.KeysMongoDbPersistence = KeysMongoDbPersistence;
//# sourceMappingURL=KeysMongoDbPersistence.js.map