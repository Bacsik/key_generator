import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';
import { KeyV1 } from '../../data/version1/KeyV1';
import { IKeysClientV1 } from './IKeysClientV1';
import { IKeysController } from '../../logic/IKeysController';
export declare class KeysDirectClientV1 extends DirectClient<IKeysController> implements IKeysClientV1 {
    constructor();
    getKeys(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<KeyV1>) => void): void;
    getKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
    nextKey(correlationId: string, key: string, number: number, callback: (err: any, range: string) => void): void;
    createKey(correlationId: string, key: string, callback: (err: any, key: KeyV1) => void): void;
    resetKey(correlationId: string, key: string, callback: (err: any, key: KeyV1) => void): void;
    deleteKeyById(correlationId: string, keyId: string, callback: (err: any, key: KeyV1) => void): void;
}
