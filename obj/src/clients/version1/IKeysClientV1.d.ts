import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { KeyV1 } from '../../../src/data/version1/KeyV1';
export interface IKeysClientV1 {
    getKeys(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<KeyV1>) => void): void;
    getKeyById(correlationId: string, keyId: string, callback: (err: any, page: KeyV1) => void): void;
    nextKey(correlationId: string, key: string, number: number, callback: (err: any, string: any) => void): void;
    createKey(correlationId: string, key: string, callback: (err: any, key: KeyV1) => void): void;
    resetKey(correlationId: string, key: string, callback: (err: any, key: KeyV1) => void): void;
    deleteKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
}
