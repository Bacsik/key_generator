import { JsonFilePersister } from 'pip-services3-data-node';

import { KeyV1 } from '../data/version1/KeyV1';
import { KeysMemoryPersistence } from './KeysMemoryPersistence';
import { ConfigParams } from 'pip-services3-commons-node';

export class KeysFilePersistence extends KeysMemoryPersistence {
    protected _persister: JsonFilePersister<KeyV1>;

    constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<KeyV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams) {
        super.configure(config);
        this._persister.configure(config);
    }
    
}