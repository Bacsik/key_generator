import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { KeyV1 } from '../data/version1/KeyV1';
import { KeysPersistence } from './KeysPersistence';
export declare class KeysMongoDbPersistence extends IdentifiableMongoDbPersistence<KeyV1, string> implements KeysPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<KeyV1>) => void): void;
    getOneById(correlationId: string, key: string, callback: (err: any, item: KeyV1) => void): void;
    nextKey(correlationId: string, key: string, number: number, callback: (err: any, item: KeyV1) => void): void;
    createKey(correlationId: string, key: string, callback: (err: any, item: KeyV1) => void): void;
    resetKey(correlationId: string, key: string, callback: (err: any, key_model: KeyV1) => void): void;
}
