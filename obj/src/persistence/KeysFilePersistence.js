"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_data_node_1 = require("pip-services3-data-node");
const KeysMemoryPersistence_1 = require("./KeysMemoryPersistence");
class KeysFilePersistence extends KeysMemoryPersistence_1.KeysMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.KeysFilePersistence = KeysFilePersistence;
//# sourceMappingURL=KeysFilePersistence.js.map