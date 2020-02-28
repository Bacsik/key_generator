"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const KeyV1Schema_1 = require("../data/version1/KeyV1Schema");
class KeysCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeGetKeysCommand());
        this.addCommand(this.makeGetKeyByIdCommand());
        this.addCommand(this.makeGetKeyByKeyCommand());
        this.addCommand(this.makeGetKeysRangeCommand());
        this.addCommand(this.makeCreateKeyCommand());
        this.addCommand(this.makeUpdateKeyCommand());
        this.addCommand(this.makeDeleteKeyByIdCommand());
    }
    makeGetKeysCommand() {
        return new pip_services3_commons_node_2.Command('get_keys', new pip_services3_commons_node_3.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_4.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_5.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_1.FilterParams.fromValue(args.get('filter'));
            let paging = pip_services3_commons_node_1.PagingParams.fromValue(args.get('paging'));
            this._controller.getKeys(correlationId, filter, paging, callback);
        });
    }
    makeGetKeyByIdCommand() {
        return new pip_services3_commons_node_2.Command('get_key_by_id', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('key_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let keyId = args.getAsString('key_id');
            this._controller.getKeyById(correlationId, keyId, callback);
        });
    }
    makeGetKeyByKeyCommand() {
        return new pip_services3_commons_node_2.Command('get_key_by_key', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('key', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let key = args.getAsString('key');
            this._controller.getKeyByKey(correlationId, key, callback);
        });
    }
    makeGetKeysRangeCommand() {
        return new pip_services3_commons_node_2.Command('get_keys_range', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('key', pip_services3_commons_node_6.TypeCode.String)
            .withOptionalProperty('number', pip_services3_commons_node_6.TypeCode.Integer), (correlationId, args, callback) => {
            let key = args.getAsString('key');
            let number = args.getAsIntegerWithDefault('number', 5);
            this._controller.getKeysRangeByKey(correlationId, key, number, callback);
        });
    }
    makeCreateKeyCommand() {
        return new pip_services3_commons_node_2.Command('create_key', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('key', new KeyV1Schema_1.KeyV1Schema()), (correlationId, args, callback) => {
            let key = args.getAsObject('key');
            this._controller.createKey(correlationId, key, callback);
        });
    }
    makeUpdateKeyCommand() {
        return new pip_services3_commons_node_2.Command('update_key', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('key', new KeyV1Schema_1.KeyV1Schema()), (correlationId, args, callback) => {
            let key = args.getAsObject('key');
            this._controller.updateKey(correlationId, key, callback);
        });
    }
    makeDeleteKeyByIdCommand() {
        return new pip_services3_commons_node_2.Command('delete_key_by_id', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('key_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let keyId = args.getAsString('key_id');
            this._controller.deleteKeyById(correlationId, keyId, callback);
        });
    }
}
exports.KeysCommandSet = KeysCommandSet;
//# sourceMappingURL=KeysCommandSet.js.map