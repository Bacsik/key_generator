import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { KeysMemoryPersistence } from '../persistence/KeysMemoryPersistence';
import { KeysFilePersistence } from '../persistence/KeysFilePersistence';
import { KeysMongoDbPersistence } from '../../src/persistence/KeysMongoDbPersistence';
import { KeysController } from '../../src/logic/KeysController';
import { KeysHttpServiceV1 } from '../../src/services/version1/KeysHttpServiceV1';

export class KeysServiceFactory extends Factory{
    public static MemoryPersistenceDescriptor = new Descriptor('keys', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('keys', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('keys', 'persistence', 'mongodb', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('keys', 'controller', 'default', '*', '1.0');
    public static HttpServiceV1Descriptor = new Descriptor('keys', 'service', 'http', '*', '1.0');
    
    constructor(){
        super();

        this.registerAsType(KeysServiceFactory.MemoryPersistenceDescriptor, KeysMemoryPersistence);
        this.registerAsType(KeysServiceFactory.FilePersistenceDescriptor, KeysFilePersistence);
        this.registerAsType(KeysServiceFactory.MongoDbPersistenceDescriptor, KeysMongoDbPersistence);
        this.registerAsType(KeysServiceFactory.ControllerDescriptor, KeysController);
        this.registerAsType(KeysServiceFactory.HttpServiceV1Descriptor, KeysHttpServiceV1);
    }
}