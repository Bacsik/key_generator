import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { KeyV1 } from '../data/version1/KeyV1';
import { KeysPersistence } from './KeysPersistence';
export declare class KeysMemoryPersistence extends IdentifiableMemoryPersistence<KeyV1, string> implements KeysPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<KeyV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: KeyV1) => void): void;
    getOneByKey(correlationId: string, key: string, callback: (err: any, item: KeyV1) => void): void;
    getRangeByKey(correlationId: string, key: string, number: number, callback: (err: any, key: KeyV1) => void): void;
}