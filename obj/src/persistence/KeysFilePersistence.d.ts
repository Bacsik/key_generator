import { JsonFilePersister } from 'pip-services3-data-node';
import { KeyV1 } from '../data/version1/KeyV1';
import { KeysMemoryPersistence } from './KeysMemoryPersistence';
import { ConfigParams } from 'pip-services3-commons-node';
export declare class KeysFilePersistence extends KeysMemoryPersistence {
    protected _persister: JsonFilePersister<KeyV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
