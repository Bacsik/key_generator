"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const KeysServiceFactory_1 = require("../build/KeysServiceFactory");
class KeysProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super('keys', 'Keys microservice');
        this._factories.add(new KeysServiceFactory_1.KeysServiceFactory());
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory());
    }
}
exports.KeysProcess = KeysProcess;
//# sourceMappingURL=KeysProcess.js.map