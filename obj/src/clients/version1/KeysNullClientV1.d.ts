import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { KeyV1 } from '../../../src/data/version1/KeyV1';
import { IKeysClientV1 } from './IKeysClientV1';
export declare class KeysNullClientV1 implements IKeysClientV1 {
    getKeys(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<KeyV1>) => void): void;
    getKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
    getKeyByKey(correlationId: string, keyKey: string, callback: (err: any, page: KeyV1) => void): void;
    getKeysRangeByKey(correlationId: string, key: string, number: number, callback: (err: any, range: number[]) => void): void;
    createKey(correlationId: string, key: KeyV1, callback: (err: any, key: KeyV1) => void): void;
    updateKey(correlationId: string, key: KeyV1, callback: (err: any, key: KeyV1) => void): void;
    deleteKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
}
