import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';
import { Descriptor } from 'pip-services3-commons-node';

import { KeyV1 } from '../../data/version1/KeyV1';
import { IKeysClientV1 } from './IKeysClientV1';
import { IKeysController } from '../../logic/IKeysController';

export class KeysDirectClientV1 extends DirectClient<IKeysController> implements IKeysClientV1 {
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('keys', 'controller', '*', '*', '1.0'));
    }

    public getKeys(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<KeyV1>) => void): void {
        let timing = this.instrument(correlationId, 'keys.get_keys');
        this._controller.getKeys(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getKeyById(correlationId: string, keyId: string,
        callback: (err: any, key: KeyV1) => void): void {
            let timing = this.instrument(correlationId, 'keys.get_key_by_id');
            this._controller.getKeyById(correlationId, keyId, (err, key) => {
                timing.endTiming();
                callback(err, key);
            });
    }


    public getKeyByKey(correlationId: string, keyKey: string,
        callback: (err: any, key: KeyV1) => void): void {
            let timing = this.instrument(correlationId, 'keys.get_key_by_key');
            this._controller.getKeyByKey(correlationId, keyKey, (err, key) => {
                timing.endTiming();
                callback(err, key);
            });
    }

    public getKeysRangeByKey(correlationId: string, key: string, number:number,
        callback: (err: any, range: number[]) => void): void {
            let timing = this.instrument(correlationId, 'keys.get_keys_range');
            this._controller.getKeysRangeByKey(correlationId, key, number, (err, range) => {
                timing.endTiming();
                callback(err, range);
            });
    }


    public createKey(correlationId: string, key: KeyV1,
        callback: (err: any, key: KeyV1) => void): void {
            let timing = this.instrument(correlationId, 'keys.create_key');
            this._controller.createKey(correlationId, key, (err, key) => {
                timing.endTiming();
                callback(err, key);
            });
    }   

    public updateKey(correlationId: string, key: KeyV1,
        callback: (err: any, key: KeyV1) => void): void {
            let timing = this.instrument(correlationId, 'keys.update_key');
            this._controller.updateKey(correlationId, key, (err, key) => {
                timing.endTiming();
                callback(err, key);
            });
    }   
    
    public deleteKeyById(correlationId: string, keyId: string,
        callback: (err: any, key: KeyV1) => void): void {
            let timing = this.instrument(correlationId, 'keys.delete_key_by_id');
            this._controller.deleteKeyById(correlationId, keyId, (err, key) => {
                timing.endTiming();
                callback(err, key);
            }); 
    }

}