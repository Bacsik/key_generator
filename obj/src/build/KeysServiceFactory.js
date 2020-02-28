"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const KeysMemoryPersistence_1 = require("../persistence/KeysMemoryPersistence");
const KeysFilePersistence_1 = require("../persistence/KeysFilePersistence");
const KeysMongoDbPersistence_1 = require("../../src/persistence/KeysMongoDbPersistence");
const KeysController_1 = require("../../src/logic/KeysController");
const KeysHttpServiceV1_1 = require("../../src/services/version1/KeysHttpServiceV1");
class KeysServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(KeysServiceFactory.MemoryPersistenceDescriptor, KeysMemoryPersistence_1.KeysMemoryPersistence);
        this.registerAsType(KeysServiceFactory.FilePersistenceDescriptor, KeysFilePersistence_1.KeysFilePersistence);
        this.registerAsType(KeysServiceFactory.MongoDbPersistenceDescriptor, KeysMongoDbPersistence_1.KeysMongoDbPersistence);
        this.registerAsType(KeysServiceFactory.ControllerDescriptor, KeysController_1.KeysController);
        this.registerAsType(KeysServiceFactory.HttpServiceV1Descriptor, KeysHttpServiceV1_1.KeysHttpServiceV1);
    }
}
exports.KeysServiceFactory = KeysServiceFactory;
KeysServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('keys', 'persistence', 'memory', '*', '1.0');
KeysServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('keys', 'persistence', 'file', '*', '1.0');
KeysServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor('keys', 'persistence', 'mongodb', '*', '1.0');
KeysServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor('keys', 'controller', 'default', '*', '1.0');
KeysServiceFactory.HttpServiceV1Descriptor = new pip_services3_commons_node_1.Descriptor('keys', 'service', 'http', '*', '1.0');
//# sourceMappingURL=KeysServiceFactory.js.map