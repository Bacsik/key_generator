import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { KeyV1 } from '../../../src/data/version1/KeyV1';
import { IKeysClientV1 } from './IKeysClientV1';

export class KeysHttpClientV1 extends CommandableHttpClient implements IKeysClientV1 {
    public constructor() {
        super('v1/keys');
    }

    public getKeys(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<KeyV1>) => void): void {
        this.callCommand(
            'get_keys',
            correlationId,
            { filter: filter, paging: paging },
            callback
        );
    }

    public getKeyById(correlationId: string, keyId: string,
        callback: (err: any, key: KeyV1) => void): void {
        this.callCommand(
            'get_key_by_id',
            correlationId,
            {
                key_id: keyId
            },
            callback
        );
    }


    public nextKey(correlationId: string, keyKey: string, number:number,
        callback:(err:any,string) => void):void{
        this.callCommand(
            'get_keys_range',
            correlationId,
            {
                key: keyKey,
                number: number 
            },
            callback
        );
    }


    public createKey(correlationId: string, key: string,
        callback: (err: any, key: KeyV1) => void): void{
        this.callCommand(
            'create_key',
            correlationId,
            {
                key: key
            },
            callback
        );
    }   

    public resetKey(correlationId: string, key: string,
        callback: (err: any, key: KeyV1) => void): void{
        this.callCommand(
            'reset_key',
            correlationId,
            {
                key: key
            },
            callback
        );
    }   
    
    public deleteKeyById(correlationId: string, keyId: string,
        callback: (err: any, key: KeyV1) => void): void{
        this.callCommand(
            'delete_key_by_id',
            correlationId,
            {
                key_id: keyId
            },
            callback
        );
    }
}