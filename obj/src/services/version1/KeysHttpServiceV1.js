"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class KeysHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/keys');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('keys', 'controller', '*', '*', '1.0'));
    }
}
exports.KeysHttpServiceV1 = KeysHttpServiceV1;
//# sourceMappingURL=KeysHttpServiceV1.js.map